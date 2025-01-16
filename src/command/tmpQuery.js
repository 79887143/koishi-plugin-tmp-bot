const dayjs = require('dayjs')
const guildBind = require('../database/guildBind')
const truckersMpApi = require('../api/truckersMpApi')
const truckyAppApi = require('../api/truckyAppApi')
const baiduTranslate = require('../util/baiduTranslate')

/**
 * 用户组
 */
const userGroup = {
  'Player': '玩家',
  'Retired Legend': '退役',
  'Game Developer': '游戏开发者',
  'Retired Team Member': '退休团队成员',
  'Add-On Team': '附加组件团队',
  'Game Moderator': '游戏管理员'
}

/**
 * 查询玩家信息
 */
module.exports = async (ctx, cfg, session, tmpId) => {
  if (tmpId && isNaN(tmpId)) {
    return `请输入正确的玩家编号`
  }

  // 如果没有传入tmpId，尝试从数据库查询绑定信息
  if (!tmpId) {
    let guildBindData = await guildBind.get(ctx.database, session.platform, session.userId)
    if (!guildBindData) {
      return `请输入正确的玩家编号`
    }
    tmpId = guildBindData.tmp_id
  }

  // 查询玩家信息
  let playerInfo = await truckersMpApi.player(ctx.http, tmpId)
  if (playerInfo.error) {
    return '查询玩家信息失败，请重试'
  }

  // 查询线上信息
  let playerMapInfo = await truckyAppApi.online(ctx.http, tmpId)

  // 拼接消息模板
  let message = `<img src="${playerInfo.data.avatar}"/>`
  message += '\n🆔TMP编号: ' + playerInfo.data.id
  message += '\n😀玩家名称: ' + playerInfo.data.name
  message += '\n🎮SteamID: ' + playerInfo.data.steamID64
  let registerDate = dayjs(playerInfo.data.joinDate + 'Z')
  message += '\n📑注册日期: ' + registerDate.format('YYYY年MM月DD日') + ` (${dayjs().diff(registerDate, 'day')}天)`
  message += '\n💼所属分组: ' + (userGroup[playerInfo.data.groupName] || playerInfo.data.groupName)
  if (playerInfo.data.vtc && playerInfo.data.vtc.inVTC) {
    message += '\n🚚所属车队: ' + playerInfo.data.vtc.name
    // 补充车队信息
    try {
      let vtcMemberResult = await truckersMpApi.vtcMember(ctx.http, playerInfo.data.vtc.id, playerInfo.data.vtc.memberID)
      console.log(vtcMemberResult)
      if (!vtcMemberResult.error) {
        message += '\n🚚车队角色: ' + vtcMemberResult.data.role
      }
    } catch (e) {}
  }
  message += '\n🚫是否封禁: ' + (playerInfo.data.banned ? '是' : '否')
  if (playerInfo.data.banned) {
    message += '\n🚫封禁截止: '
    if (!playerInfo.data.displayBans) {
      message += '隐藏'
    } else {
      let banData = await truckersMpApi.bans(ctx.http, tmpId)
      if (!banData.error) {
        let ban = banData.data[0]
        if (!ban.expiration) {
          message += '永久'
        } else {
          message += dayjs(ban.expiration + 'Z').format('YYYY年MM月DD日 HH:mm')
        }
        message += "\n🚫封禁原因: " + await baiduTranslate(ctx, cfg, ban.reason, false)
      } else {
        message += '查询失败'
      }
    }
  }
  message += '\n🚫封禁次数: ' + playerInfo.data.bansCount || 0
  if (playerMapInfo && !playerMapInfo.error) {
    message += '\n📶在线状态: ' + (playerMapInfo.data.online ? `在线🟢 (${playerMapInfo.data.serverDetails.name})` : '离线⚫')
    if (playerMapInfo.data.online) {
      message += '\n🌍线上位置: '
      message += await baiduTranslate(ctx, cfg, playerMapInfo.data.location.poi.country)
      message += ' - '
      message += await baiduTranslate(ctx, cfg, playerMapInfo.data.location.poi.realName)
    }
  }
  let patreon = playerInfo.data.patreon
  if (patreon && patreon.active) {
    message += '\n🎁赞助用户'
    if (!patreon.hidden) {
      message += ` (\$${Math.floor(patreon.currentPledge / 100)})`
    }
  }
  return message
}
