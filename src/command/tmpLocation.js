const truckyAppApi = require('../api/truckyAppApi')

/**
 * 查询玩家位置信息
 */
module.exports = async (ctx, cfg) => {
  let result = await truckyAppApi.locationResolution(ctx.http, 0, 0)
  return 'ok'
}
