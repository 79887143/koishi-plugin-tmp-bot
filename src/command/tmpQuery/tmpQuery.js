const tmpQueryText = require("./tmpQueryText");

module.exports = async (ctx, cfg, session, tmpId) => {
  switch (cfg.tmpTrafficType) {
    case 1:
      return await tmpQueryText(ctx, cfg, session, tmpId)
    default:
      return '指令配置错误'
  }
}
