const truckersMpApi = require('../api/TruckersMpApi')
const truckyAppApi = require('../api/truckyAppApi')
const baiduTranslate = require('../util/baiduTranslate')

/**
 * 用户组
 */
const userGroup = {
  'Player': '玩家',
  'Retired Legend': '退役',
  'Game Developer': '游戏开发者'
}

/**
 * 查询玩家信息
 */
module.exports = async (ctx, cfg, tmpId) => {
  // 查询玩家信息
  let playerInfo = await truckersMpApi.player(ctx.http, tmpId)
  if (playerInfo.error) {
    return '查询玩家信息失败，请重试'
  }

  // 查询线上信息
  let playerMapInfo = await truckyAppApi.online(ctx.http, tmpId)
  if (playerMapInfo.error) {
    return '查询玩家信息失败，请重试'
  }

  // 拼接消息模板 正常4763167 永久5396563 暂时封号5118166
  let message = `<img src="${playerInfo.data.avatar}"/>`
  message += '\n😀玩家名称: ' + playerInfo.data.name
  message += '\n📑注册日期: ' + playerInfo.data.joinDate.substring(0, 10)
  message += '\n💼所属分组: ' + (userGroup[playerInfo.data.groupName] || playerInfo.data.groupName) // 🪪💼📂🚹
  if (playerInfo.data.vtc && playerInfo.data.vtc.inVTC) {
    message += '\n🚚所属车队: ' + playerInfo.data.vtc.name
  }
  message += '\n🚫是否封禁: ' + (playerInfo.data.banned ? '是' : '否')
  if (playerInfo.data.banned) {
    message += '\n🚫封禁截止: '
    if (!playerInfo.data.displayBans) {
      message += '隐藏'
    } else if (!playerInfo.data.bannedUntil) {
      message += '永久'
    } else {
      // TODO 处理时间格式
      message += playerInfo.data.bannedUntil
    }
  }
  message += '\n🚫封禁次数: ' + playerInfo.data.bansCount || 0
  message += '\n🛜在线状态: ' + (playerMapInfo.data.online ? `在线🟢 (${playerMapInfo.data.serverDetails.name})` : '离线⚫')
  if (playerMapInfo.data.online) {
    message += '\n🌍线上位置: '
    message += await baiduTranslate(ctx.http, cfg, playerMapInfo.data.location.poi.country)
    message += ' - '
    message += await baiduTranslate(ctx.http, cfg, playerMapInfo.data.location.poi.realName)
  }
  console.info(playerMapInfo.data)
  return message
}
