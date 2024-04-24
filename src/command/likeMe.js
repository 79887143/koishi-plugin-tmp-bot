module.exports = async (session) => {
  if (session.bot.platform !== 'onebot') {
    return '当前适配器不支持该功能'
  }

  // 构建 OneBot 点赞消息并发送
  let likeMeData = {
    action: 'send_like',
    params: {
      user_id: session.event.user.id,
      times: 10
    }
  }
  session.bot.adapter.socket.send(JSON.stringify(likeMeData))
  return '成功'
}
