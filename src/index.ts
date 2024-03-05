import { Context, Schema } from 'koishi'
const tmpQuery = require('./command/tmpQuery')

export const name = 'tmp-bot'

export interface Config {
  baiduTranslateEnable: boolean
  baiduTranslateAppId: string
  baiduTranslateKey: string
}

export const Config: Schema<Config> = Schema.object({
  baiduTranslateEnable: Schema.boolean().default(false).description('启用百度翻译'),
  baiduTranslateAppId: Schema.string().description('百度翻译APP ID'),
  baiduTranslateKey: Schema.string().description('百度翻译秘钥')
})

export function apply(ctx: Context, cfg: Config) {
  // 注册指令
  ctx.command('tmpquery <tmpId>').action(async (_, tmpId) => await tmpQuery(ctx, cfg, tmpId))
}
