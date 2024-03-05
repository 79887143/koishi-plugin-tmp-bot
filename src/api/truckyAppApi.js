const BASE_API_V2 = 'https://api.truckyapp.com/v2'
const BASE_API_V3 = 'https://api.truckyapp.com/v3'

module.exports = {
  /**
   * 坐标信息解析
   */
  locationResolution: async (http, x, y) => {
    return await http.get(`${BASE_API_V2}/map/ets2/resolve?x=${x}&y=${y}`)
  },
  online: async (http, tmpId) => {
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
  }
}
