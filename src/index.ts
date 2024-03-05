import { Context, Schema } from 'koishi'
const tmpLocation = require('./command/tmpLocation')

export const name = 'tmp-bot'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // 注册指令
  ctx.command('tmplocation').action(tmpLocation)
}
