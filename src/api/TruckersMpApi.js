const BASE_API = 'https://api.truckersmp.com/v2'

module.exports = {
  /**
   * 查询玩家信息
   */
  player: async (http, tmpId) => {
    let result = null
    try {
      result = await http.get(`${BASE_API}/player/${tmpId}`)
    } catch {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: result.error
    }
    if (!data.error) {
      data.data = result.response
    }

    return data
  }
}
