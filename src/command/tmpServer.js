const truckersMpApi = require('../api/TruckersMpApi')

module.exports = async (ctx, cfg) => {
  // 查询服务器信息
  let serverData = await truckersMpApi.servers(ctx.http)
  if (serverData.error) {
    return '查询服务器失败，请稍后重试'
  }

  // 过滤非欧卡2服务器
  let etsServerList = serverData.data.filter(server => server.game === 'ETS2')

  // 构建消息
  let message = ''
  for (let server of etsServerList) {
    // 如果前面有内容，换行
    if (message) {
      message += '\n\n'
    }

    message += '服务器: ' + ( server.online ? '🟢' : '⚫' ) + server.name
    message += `\n玩家人数: ${server.players}/${server.maxplayers}`
    if (server.queue) {
      message += ` (队列: ${server.queue})`
    }
    // 服务器特性
    let characteristicList = []
    if (!server.afkenabled) {
      characteristicList.push('⏱挂机')
    }
    if (server.collisions) {
      characteristicList.push('💥碰撞')
    }
    if (characteristicList && characteristicList.length > 0) {
      message += '\n服务器特性: ' + characteristicList.join(' ')
    }
  }
  return message
}
