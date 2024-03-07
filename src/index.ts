import { Context, Schema } from 'koishi'
const model = require('./database/model')
const tmpQuery = require('./command/tmpQuery')
const tmpServer = require('./command/tmpServer')
const tmpBind = require('./command/tmpBind')
const tmpTraffic = require('./command/tmpTraffic')

export const name = 'tmp-bot'
export const inject = ['database']

export interface Config {
  baiduTranslateEnable: boolean
  baiduTranslateAppId: string
  baiduTranslateKey: string
  baiduTranslateCacheEnable: boolean
}

export const Config: Schema<Config> = Schema.object({
  baiduTranslateEnable: Schema.boolean().default(false).description('启用百度翻译'),
  baiduTranslateAppId: Schema.string().description('百度翻译APP ID'),
  baiduTranslateKey: Schema.string().description('百度翻译秘钥'),
  baiduTranslateCacheEnable: Schema.boolean().default(false).description('启用百度翻译缓存')
})

export function apply(ctx: Context, cfg: Config) {
  // 初始化数据表
  model(ctx)

  // 注册指令
  ctx.command('tmpquery <tmpId>').action(async ({ session }, tmpId) => await tmpQuery(ctx, cfg, session, tmpId))
  ctx.command('tmpserver').action(async () => await tmpServer(ctx, cfg))
  ctx.command('tmpbind <tmpId>').action(async ({ session }, tmpId) => await tmpBind(ctx, cfg, session, tmpId))
  ctx.command('tmptraffic <serverName>').action(async ({ session }, serverName) => await tmpTraffic(ctx, cfg, serverName))
}
