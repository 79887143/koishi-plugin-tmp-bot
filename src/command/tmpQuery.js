const truckersMpApi = require('../api/TruckersMpApi')

/**
 * 用户组
 */
const userGroup = {
  'Player': '玩家',
  'Retired Legend': '退役'
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

  // 拼接消息模板
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
    if (!playerInfo.data.bannedUntil) {
      message += '永久'
    } else {
      message += playerInfo.data.bannedUntil
    }
  }
  message += '\n🚫封禁次数: ' + playerInfo.data.bansCount || 0
  return message
}
