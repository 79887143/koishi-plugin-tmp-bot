const BASE_API = 'https://api.truckyapp.com/v2'

module.exports = {
  /**
   * 坐标信息解析
   */
  locationResolution: async (http, x, y) => {
    return await http.get(`${BASE_API}/map/ets2/resolve?x=${x}&y=${y}`)
  }
}
