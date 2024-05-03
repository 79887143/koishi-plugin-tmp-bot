# koishi-plugin-tmp-bot

[![npm](https://img.shields.io/npm/v/koishi-plugin-tmp-bot?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-tmp-bot)

# 欧洲卡车模拟2 TMP查询机器人

---
## 指令说明
### tmpbind \<TMP ID\>
绑定 TMPID，绑定后使用其他指令时可省略输入 TMPID

使用示例：

tmpbind 123

### tmpquery \<TMP ID\>
查询TMP玩家信息

使用示例：

tmpquery 123

tmpquery

### tmpposition \<TMP ID\>
查询玩家位置信息

使用示例：

tmpposition 123

tmpposition

### tmptraffic \<服务器简称\>
查询服务器热门地点路况信息，仅支持使用服务器简称查询，具体支持查询的服务器和服务器简称信息如下
s1, s2, p, a

|服务器名称|简称|
|---|---|
|Simulation 1|s1|
|Simulation 2|s2|
|ProMods|p|
|Arcade|a|

使用示例：

tmptraffic s1

tmptraffic p

### tmpserverats
查询美卡服务信息列表

使用示例：

tmpserverats

### tmpserverets
查询欧卡服务器信息列表

使用示例：

tmpserverats

### likeme
QQ名片点赞10次，只能在群内使用
> 该指令仅支持 **OneBot** 适配方式，并且使用**正向WS**连接

使用示例：

likeme
