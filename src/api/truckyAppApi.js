const BASE_API_V3 = 'https://api.truckyapp.com/v3'

module.exports = {
  /**
   * 查询线上信息
   */
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
