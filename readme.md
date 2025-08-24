# koishi-plugin-tmp-bot

[![npm](https://img.shields.io/npm/v/koishi-plugin-tmp-bot?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-tmp-bot)

欧洲卡车模拟2 TMP查询机器人

### 指令说明
| 指令名称                   | 指令介绍                                                                                                                                        | 使用示例                   |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| tmpbind                | 绑定 TMPID，绑定后使用其他指令时可省略输入                                                                                                                    | tmpbind 123            |
| tmpquery               | 查询TMP玩家信息                                                                                                                                   | tmpquery 123           |
| tmpposition            | 查询玩家位置信息                                                                                                                                    | tmpposition 123        |
| tmptraffic             | 查询服务器热门地点路况信息，仅支持使用服务器简称查询，具体支持查询的服务器和服务器简称信息如下</br>Simulation 1 (简称: s1)</br>Simulation 2 (简称: s2)</br>ProMods (简称: p)</br>Arcade  (简称: a) | tmptraffic s1          |
| tmpserverats           | 查询美卡服务器信息列表                                                                                                                                 | tmpserverats           |
| tmpserverets           | 查询欧卡服务器信息列表                                                                                                                                 | tmpserverets           |
| tmpversion             | 查询版本信息                                                                                                                                      | tmpversion             |
| tmpdlcmap              | 地图DLC列表                                                                                                                                     | tmpdlcmap              |
| tmpmileageranking      | 总里程排行榜，数据从 2025年8月23日20:00 开始统计，绑定ID后可查看自己的排名                                                                                               | tmpmileageranking      |
| tmptodaymileageranking | 今日里程排行榜，每日0点重置数据，绑定ID后可查看自己的排名                                                                                                              | tmptodaymileageranking |

### TMP数据接口文档
https://apifox.com/apidoc/shared/38508a88-5ff4-4b29-b724-41f9d3d3336a

### 已部署的机器人
如不会部署，可直接使用此机器人 => QQ:3523283907
