const md5 = require('js-md5')
const TRANSLATE_API = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

module.exports = async (http, cfg, content) => {
  // 没有开启百度翻译功能，直接返回文本
  if (!cfg.baiduTranslateEnable) {
    return content
  }

  // 创建请求秘钥
  let randomInt = Math.floor(Math.random() * 10000)
  let sign = md5(cfg.baiduTranslateAppId + content + randomInt + cfg.baiduTranslateKey)

  // 调用请求
  let result = await http.get(`${TRANSLATE_API}?q=${encodeURI(content)}&from=auto&to=zh&appid=${cfg.baiduTranslateAppId}&salt=${randomInt}&sign=${sign}`);

  // 如果翻译失败，直接返回内容
  if (result.error_code) {
    return content
  }

  return result.trans_result[0].dst
}
