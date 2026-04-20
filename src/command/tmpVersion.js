const evmOpenApi = require('../api/evmOpenApi')

module.exports = async (ctx) => {
  // 查询版本信息
  let result = await evmOpenApi.tmpVersion(ctx.http)
  if (result.error) {
    return '查询数据失败，请稍后再试'
  }

  // 构建消息返回
  let message = '   🎮 TMP 插件版本\n'
  message += `◈ 联机插件: ${result.data.tmpVersion}\n`;
  message += `◈ 兼容版本: ${result.data.supportGameVersion}\n`;
  message += `◈ 官方版本: ${result.data.officialGameVersion}\n`;
  if (result.data.supportGameVersion === result.data.officialGameVersion) {
    message += `      兼容游戏 ✅`
  } else {
    message += `      兼容游戏 ❌`
  }
  return message
}
