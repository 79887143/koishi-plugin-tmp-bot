# koishi-plugin-tmp-bot

[![npm](https://img.shields.io/npm/v/koishi-plugin-tmp-bot?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-tmp-bot)
[![license](https://img.shields.io/npm/l/koishi-plugin-tmp-bot?style=flat-square)](https://opensource.org/licenses/MIT)

一款基于 [Koishi](https://koishi.chat/) 框架的 TruckersMP 查询插件，用于查询欧洲卡车模拟 2（ETS2）TMP 玩家信息、服务器状态、路况、里程排行等数据。

## 安装

在 Koishi 插件市场中搜索 `tmp-bot` 并安装

### 前置依赖

- **必需**：`database` 服务（Koishi 内置）
- **可选**：`puppeteer` 服务（用于生成图片，如热力图、服务器列表图片等）

## 配置项

### 基本配置

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `baiduTranslateEnable` | boolean | `false` | 启用百度翻译 |
| `baiduTranslateAppId` | string | - | 百度翻译 APP ID |
| `baiduTranslateKey` | string | - | 百度翻译密钥 |
| `baiduTranslateCacheEnable` | boolean | `false` | 启用百度翻译缓存 |

### 指令配置

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `queryShowAvatarEnable` | boolean | `false` | 查询指令展示头像（部分玩家头像可能导致封号） |
| `tmpTrafficType` | number | `1` | 路况信息展示方式（`1` = 文字，`2` = 热力图） |
| `tmpServerType` | number | `1` | 服务器信息展示方式（`1` = 文字，`2` = 图片） |

## 指令列表

### 玩家相关

| 指令 | 说明 | 示例 |
| --- | --- | --- |
| `tmpbind <tmpId>` | 绑定 TMP ID，绑定后其他指令可省略输入 ID | `tmpbind 123` |
| `tmpquery [tmpId]` | 查询 TMP 玩家信息 | `tmpquery 123` |
| `tmpposition [tmpId]` | 查询玩家实时位置信息 | `tmpposition 123` |

### 服务器与路况

| 指令 | 说明 | 示例 |
| --- | --- | --- |
| `tmpserverets` | 查询欧卡服务器信息列表 | `tmpserverets` |
| `tmpserverats` | 查询美卡服务器信息列表 | `tmpserverats` |
| `tmptraffic <server>` | 查询服务器热门地点路况 | `tmptraffic s1` |

> **`tmptraffic` 支持的服务器简称：**
>
> | 简称 | 服务器 |
> | --- | --- |
> | `s1` | Simulation 1 |
> | `s2` | Simulation 2 |
> | `p` | ProMods |
> | `a` | Arcade |

### 排行与足迹

| 指令 | 说明 | 示例 |
| --- | --- | --- |
| `tmpmileageranking` | 总里程排行榜（数据从 2025-08-23 开始统计，绑定 ID 后可查看自己的排名） | `tmpmileageranking` |
| `tmptodaymileageranking` | 今日里程排行榜（每日 0 点重置，绑定 ID 后可查看自己的排名） | `tmptodaymileageranking` |
| `tmpfootprints [tmpId]` | 今日足迹，查询除 P 服外的所有服务器足迹 | `tmpfootprints 123` |
| `tmpfootprintp [tmpId]` | 今日足迹，查询 ProMods 和 ProMods Arcade 服务器足迹 | `tmpfootprintp 123` |

### 其他

| 指令 | 说明 | 示例 |
| --- | --- | --- |
| `tmpversion` | 查询 TMP 版本信息 | `tmpversion` |
| `tmpdlcmap` | 查询地图 DLC 列表 | `tmpdlcmap` |

## 相关链接

- [TMP 数据接口文档](https://apifox.com/apidoc/shared-38508a88-5ff4-4b29-b724-41f9d3d3336a)
- [GitHub 仓库](https://github.com/79887143/koishi-plugin-tmp-bot)
- [npm 包](https://www.npmjs.com/package/koishi-plugin-tmp-bot)

## 联系方式

如不会自行部署，可直接使用已部署的机器人：**QQ 3523283907**

## 许可证

[MIT](https://opensource.org/licenses/MIT)
