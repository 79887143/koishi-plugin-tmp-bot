const { segment } = require('koishi')
import { resolve } from 'path'
const guildBind = require('../database/guildBind')
const truckyAppApi = require('../api/truckyAppApi')
const truckersMpApi = require('../api/TruckersMpApi')
const baiduTranslate = require('../util/baiduTranslate')

/**
 * 定位
 */
module.exports = async (ctx, cfg, session, tmpId) => {
  if (ctx.puppeteer) {
    if (tmpId && isNaN(tmpId)) {
      return `请输入正确的玩家编号`
    }

    // 如果没有传入tmpId，尝试从数据库查询绑定信息
    if (!tmpId) {
      let guildBindData = await guildBind.get(ctx.database, session.platform, session.guildId, session.userId)
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
    if (playerMapInfo.error) {
      return '查询玩家信息失败，请重试'
    }
    if (!playerMapInfo.data.online) {
      return '玩家离线'
    }

    let data = {
      avatar: playerInfo.data.smallAvatar,
      username: playerInfo.data.name,
      serverName: playerMapInfo.data.serverDetails.name,
      country: await baiduTranslate(ctx, cfg, playerMapInfo.data.location.poi.country),
      realName: await baiduTranslate(ctx, cfg, playerMapInfo.data.location.poi.realName),
      x: playerMapInfo.data.x,
      y: playerMapInfo.data.y
    }

    let page
    try {
      page = await ctx.puppeteer.page()
      await page.setViewport({ width: 1000, height: 1000 })
      await page.goto(`file:///${resolve(__dirname, '../resource/position.html')}`)
      await page.evaluate(`setData(${JSON.stringify(data)})`)
      await page.waitForNetworkIdle()
      const element = await page.$("#container");
      return (
        segment.image(await element.screenshot({
          encoding: "binary"
        }), "image/jpg")
      )
    } catch (e) {
      console.info(e)
      return '渲染异常，请重试'
    } finally {
      if (page) {
        page.close()
      }
    }

  } else {
    return '未启用 puppeteer 服务'
  }
}
