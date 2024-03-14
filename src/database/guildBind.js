module.exports = {
  /**
   * 获取绑定信息
   * @param db 数据源
   * @param platform 平台
   * @param userId 用户编号
   */
  async get (db, platform, userId) {
    const guildBindList = await db.get('tmp_guild_bind', {
      platform,
      user_id: userId
    })

    if (guildBindList && guildBindList.length > 0) {
      return guildBindList[0]
    }

    return null
  },
  /**
   * 新增或更新绑定信息
   * @param db 数据源
   * @param platform 平台
   * @param userId 用户编号
   * @param userName 用户昵称
   * @param tmpId TMP ID
   */
  saveOrUpdate (db, platform, userId, userName, tmpId) {
    this.get(db, platform, userId).then((data) => {
      if (data) {
        db.set('tmp_guild_bind', data.id, {
          tmp_id: tmpId,
          user_name: userName
        })
      } else {
        db.create('tmp_guild_bind', {
          platform: platform,
          user_id: userId,
          user_name: userName,
          tmp_id: tmpId
        })
      }
    })
  }
}
