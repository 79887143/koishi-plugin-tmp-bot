import { Context, Schema } from 'koishi'
const model = require('./database/model')
const tmpQuery = require('./command/tmpQuery')
const tmpServer = require('./command/tmpServer')
const tmpBind = require('./command/tmpBind')
const tmpTraffic = require('./command/tmpTraffic/tmpTraffic')
const tmpPosition = require('./command/tmpPosition')

export const name = 'tmp-bot'
export const inject = {
  required: ['database'],
  optional: ['puppeteer']
}

export interface Config {
  baiduTranslateEnable: boolean
  baiduTranslateAppId: string
  baiduTranslateKey: string
  baiduTranslateCacheEnable: boolean
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    baiduTranslateEnable: Schema.boolean().default(false).description('启用百度翻译'),
    baiduTranslateAppId: Schema.string().description('百度翻译APP ID'),
    baiduTranslateKey: Schema.string().description('百度翻译秘钥'),
    baiduTranslateCacheEnable: Schema.boolean().default(false).description('启用百度翻译缓存')
  }).description('基本配置'),
  Schema.object({
    tmpTrafficType: Schema.union([
      Schema.const(1).description('文字'),
      Schema.const(2).description('热力图')
    ]).default(1).description('路况信息展示方式'),
  }).description('指令配置'),
])

export function apply(ctx: Context, cfg: Config) {
  // 初始化数据表
  model(ctx)

  // 注册指令
  ctx.command('tmpquery <tmpId>').action(async ({ session }, tmpId) => await tmpQuery(ctx, cfg, session, tmpId))
  ctx.command('tmpserverats').action(async () => await tmpServer(ctx, cfg, 'ATS'))
  ctx.command('tmpserverets').action(async () => await tmpServer(ctx, cfg, 'ETS2'))
  ctx.command('tmpbind <tmpId>').action(async ({ session }, tmpId) => await tmpBind(ctx, cfg, session, tmpId))
  ctx.command('tmptraffic <serverName>').action(async ({ session }, serverName) => await tmpTraffic(ctx, cfg, serverName))
  ctx.command('tmpposition <tmpId>').action(async ({ session }, tmpId) => await tmpPosition(ctx, cfg, session, tmpId))
}
