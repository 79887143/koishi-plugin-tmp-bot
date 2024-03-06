/**
 * 数据表声明
 */
const modelArray = {
  tmp_guild_bind: {
    // 主键
    id: {
      type: 'unsigned',
      length: 10,
      nullable: false
    },
    // 所属平台
    platform: {
      type: 'string',
      length: 50,
      nullable: false
    },
    // 群组编号
    guild_id: {
      type: 'string',
      length: 50,
      nullable: false
    },
    // 用户编号
    user_id: {
      type: 'string',
      length: 50,
      nullable: false
    },
    // 用户昵称
    user_name: {
      type: 'string',
      length: 50,
      nullable: false
    },
    // TMP ID
    tmp_id: {
      type: 'unsigned',
      length: 50,
      nullable: false
    }
  }
}

/**
 * 初始化数据库
 */
module.exports = (ctx) => {
  for (let modelName in modelArray) {
    ctx.model.extend(modelName, modelArray[modelName], { autoInc: true })
  }
}
