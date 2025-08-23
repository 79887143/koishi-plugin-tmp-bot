const dayjs = require('dayjs')
const guildBind = require('../../database/guildBind')
const truckyAppApi = require('../../api/truckyAppApi')
const evmOpenApi = require('../../api/evmOpenApi')
const baiduTranslate = require('../../util/baiduTranslate')

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
  let playerInfo = await evmOpenApi.playerInfo(ctx.http, tmpId)
  if (playerInfo.error && playerInfo.code === 10001) {
    return '玩家不存在'
  } else if (playerInfo.error) {
    return '查询玩家信息失败，请重试'
  }

  // 查询线上信息
  let playerMapInfo = await truckyAppApi.online(ctx.http, tmpId)

  // 拼接消息模板
  let message = ''
  if (cfg.queryShowAvatarEnable) {
    message += `<img src="${playerInfo.data.avatarUrl}"/>\n`
  }
  message += '🆔TMP编号: ' + playerInfo.data.tmpId
  message += '\n😀玩家名称: ' + playerInfo.data.name
  message += '\n🎮SteamID: ' + playerInfo.data.steamId
  let registerDate = dayjs(playerInfo.data.registerTime)
  message += '\n📑注册日期: ' + registerDate.format('YYYY年MM月DD日') + ` (${dayjs().diff(registerDate, 'day')}天)`
  message += '\n💼所属分组: ' + (userGroup[playerInfo.data.groupName] || playerInfo.data.groupName)
  if (playerInfo.data.isJoinVtc) {
    message += '\n🚚所属车队: ' + playerInfo.data.vtcName
    message += '\n🚚车队角色: ' + playerInfo.data.vtcRole
  }
  message += '\n🚫是否封禁: ' + (playerInfo.data.isBan ? '是' : '否')
  if (playerInfo.data.isBan) {
    message += '\n🚫封禁截止: '
    if (playerInfo.data.banHide) {
      message += '隐藏'
    } else {
      if (!playerInfo.data.banUntil) {
        message += '永久'
      } else {
        message += dayjs(playerInfo.data.banUntil).format('YYYY年MM月DD日 HH:mm')
      }
      message += "\n🚫封禁原因: " + (playerInfo.data.banReasonZh || playerInfo.data.banReason)
    }
  }
  message += '\n🚫封禁次数: ' + (playerInfo.data.banCount || 0)
  if (playerInfo.data.todayMileage) {
    let todayMileage = playerInfo.data.todayMileage
    let mileageUnit = '米'
    if (todayMileage > 1000) {
      todayMileage = (todayMileage / 1000).toFixed(1)
      mileageUnit = '公里'
    }
    message += '\n🚩今日里程: ' + todayMileage + mileageUnit
  }
  if (playerMapInfo && !playerMapInfo.error) {
    message += '\n📶在线状态: ' + (playerMapInfo.data.online ? `在线🟢 (${playerMapInfo.data.serverDetails.name})` : '离线⚫')
    if (playerMapInfo.data.online) {
      message += '\n🌍线上位置: '
      message += await baiduTranslate(ctx, cfg, playerMapInfo.data.location.poi.country)
      message += ' - '
      message += await baiduTranslate(ctx, cfg, playerMapInfo.data.location.poi.realName)
    }
  }
  if (playerInfo.data.isSponsor) {
    message += '\n🎁赞助用户'
    if (!playerInfo.data.sponsorHide) {
      message += `: \$${Math.floor(playerInfo.data.sponsorAmount / 100)}`
    }
  }
  if (playerInfo.data.sponsorCumulativeAmount) {
    message += '\n🎁累计赞助: $' + Math.floor(playerInfo.data.sponsorCumulativeAmount / 100)
  }
  return message
}
