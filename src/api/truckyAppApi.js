const BASE_API_V3 = 'https://api.truckyapp.com/v3'
const BASE_API_V2 = 'https://api.truckyapp.com/v2'

module.exports = {
  /**
   * 查询线上信息
   */
  async online (http, tmpId) {
    let result = null
    try {
      result = await http.get(`${BASE_API_V3}/map/online?playerID=${tmpId}`)
    } catch {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: !result || !result.response || result.response.error
    }
    if (!data.error) {
      data.data = result.response
    }
    return data
  },
  /**
   * 查询热门交通数据
   */
  async trafficTop (http, serverName) {
    let result = null
    try {
      result = await http.get(`${BASE_API_V2}/traffic/top?game=ets2&server=${serverName}`)
    } catch {
      return {
        error: true
      }
    }

    // 拼接返回数据
    let data = {
      error: !result || !result.response || result.response.length <= 0
    }
    if (!data.error) {
      data.data = result.response
    }
    return data
  }
}
