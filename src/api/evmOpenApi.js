const BASE_API = 'https://open-api.vtcm.link'

module.exports = {
  /**
   * 查询服务器列表
   */
  async serverList (http) {
    let result = null
    try {
      result = await http.get(`${BASE_API}/server/list`)
    } catch {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: result.code !== 200
    }
    if (!data.error) {
      data.data = result.data
    }

    return data
  },
  /**
   * 查询在线玩家
   */
  async mapPlayerList(http, serverId, ax, ay, bx, by) {
    let result = null
    try {
      result = await http.get(`${BASE_API}/map/playerList?aAxisX=${ax}&aAxisY=${ay}&bAxisX=${bx}&bAxisY=${by}&serverId=${serverId}`)
    } catch {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: result.code !== 200
    }
    if (!data.error) {
      data.data = result.data
    }
    return data
  },
  /**
   * 查询玩家信息
   */
  async playerInfo (http, tmpId) {
    let result = null
    try {
      result = await http.get(`${BASE_API}/player/info?tmpId=${tmpId}`)
    } catch {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: result.code !== 200
    }
    if (!data.error) {
      data.data = result.data
    }
    return data
  },
  /**
   * DLC列表
   */
  async dlcList (http, type) {
    let result = null
    try {
      result = await http.get(`${BASE_API}/dlc/list?type=${type}`)
    } catch(e) {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: result.code !== 200
    }
    if (!data.error) {
      data.data = result.data
    }
    return data
  }
}
