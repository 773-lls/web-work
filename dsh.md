# 会话总结：为 DeepSeek Harness 开发小型插件

- **时间**：2026-11-17 18:02 — 22:31（Asia/Shanghai）
- **工作目录**：`C:\Users\覃青山\Documents\deepseek-harness\default-workspace`
- **DSH 配置目录**：`C:\Users\覃青山\.dsh`，profile：`C:\Users\覃青山\.dsh\profiles\desktop`
- **最终交付**：插件 `dsh-opener` 1.1.0（启动开场动画 + 声音开关），已安装并生效

---

## 一、总体经过

用户的初始诉求是「做一个能正常使用的小插件」，并让我先提问再动手。整个会话分三段：

| 阶段 | 目标 | 结果 |
| --- | --- | --- |
| 1 | `dsh-aurora`：进入动画 + 动态背景 | 做出 1.0.0（SVG 圆环入场 + 极光/星海/流光），用户不满意 |
| 2 | `dsh-aurora` 1.1.0：3D 火柴点纸入场 + 本地上传视频做背景 | 重写到一半，用户要求回滚 |
| 3 | `dsh-opener`：给指定视频去水印，做成启动开场动画 | 已完成并安装，另加声音开关 |

---

## 二、阶段 1：需求澄清与 dsh-aurora

### 提问与回答

用选择题方式问了三个问题，用户回答：

- **插件类型**（自定义）："我想要一个进入 deepseek harness 时会有一个进入动画，并且进入之后，背景可以有动态画面的插件"
- **具体想法**：还没定，听推荐
- **数据/存储**：两者都要
- **完成度**：要好看，交互细致，接近成品

据此定为：DSH Web 客户端插件，入场动画 + 常驻动态背景 + 玻璃质感控制面板 + 本地与主机双持久化。

### 技术结论（对后续仍有价值）

- DSH 插件是 **npm 包 + `cordis.patch.yml`**：
  ```yaml
  - insert:
      - id: aurora
        name: 'dsh-aurora'
  ```
- `package.json` 里由 `dsh.bundle.patch` 指向补丁文件，`dsh.client` 声明浏览器半边（`platform: web`、`immediately: true`）。
- **宿主半边**：`export const name` / `export const inject = ['webServer']`，在 `ctx.effect()` 里 `ctx.webServer.register({ kind: 'prefix', path, handler })`。
- **浏览器半边**：整份文件包在 `window.__ModuleLoader__.load({ id, factory })` 里，是普通 CJS，`require` 只能取壳层模块表里的东西（react 等）。
- **背景透出技巧**：先在 `<html>` 上读取 `--dsw-alias-bg-layer-1/2/3` 的真实值，再在 `body` 上用 `color-mix(in srgb, <原值> 84%, transparent)` 覆写；同一元素上自引用会被浏览器判为循环而丢弃。
- 桌面端每次启动端口都会变，**localStorage 会因 origin 变化失效**，持久化要落到 `$DSH_HOME/*.json`。

### 为什么被推翻

第一版是纯代码绘制的 SVG 圆环入场 + canvas 极光背景，用户认为方向不对，直接提出新需求（3D 效果 + 用视频做背景），随后又放弃并要求恢复到开发前。

---

## 三、阶段 2：回滚

用户指令："请给我恢复到开发插件之前的状态"。

执行内容：

1. `plugin_manager remove_bundle` 移除 `dsh-aurora`，profile 的 `dsh.profile.bundles` 与 `dependencies` 中的条目一并清除；
2. `node_modules\dsh-aurora` 是 Junction，pnpm 未自动清理，手动删除；
3. 删除工作区残留（`.tmp`、`tools\cdp.mjs`、空的 `shots\`）；
4. 验证：`GET /dsh-aurora/state` 返回 **404**，`list_bundles` 共 28 项无残留。

**遗留**：安装依赖时 pnpm 顺带把 `billion-context` 从 0.1.213 升到了 `^0.1.215`；浏览器里按端口隔离的 `dsh-aurora:*` 存储键无副作用。

---

## 四、阶段 3：视频去水印

### 素材

`C:\Users\覃青山\Downloads\VID_20261117_220649.mp4`：1280×720、60fps、7.46 秒、1.94 MB、H.264 Main + AAC 128k。

### 环境约束

- PATH 里没有 ffmpeg，DSH 也没捆绑；沙箱内**无法联网下载**（pypi / 百度 / gyan.dev 全部连接失败）。
- 找到本机可用 ffmpeg：`C:\Users\覃青山\AppData\Local\kzip_sogou\ffmpeg.exe`（4.4.5，含 libx264；**无 png 编码器**，抽帧要用 jpeg/bmp；`delogo` 没有 `band` 参数）。
- 该版本有 `delogo` / `removelogo` / `boxblur` / `overlay` / `maskedmerge`。

### 水印定位（Pillow 阈值扫描 2.0s 帧）

- 图标 + 「快手极速版」：y 24–75，x 27–277（图标 27–72，其后五个字分别 82–118 / 124–158 / 163–198 / 203–238 / 243–277）
- 「作者：次元剧场」：y 87–106，x 24–167
- 水印在约 5.7 秒后随画面变亮虚化而基本不可见

### 方案对比

| 方案 | 结果 |
| --- | --- |
| `removelogo` + 掩膜 | 云状脏块，比原水印更显眼 ❌ |
| `maskedmerge`（delogo 净板 + 字形掩膜） | 大框插值取到暗边，留下深色字形鬼影 ❌ |
| **三个紧凑 `delogo` 框** | 干净，选中 ✅ |

教训：**delogo 的填充色来自框的边框**，框越大越容易把暗部或高光带进来。

### 最终命令

```text
ffmpeg -i <源视频> -vf "delogo=x=20:y=18:w=58:h=64:enable='lt(t,5.7)',\
delogo=x=76:y=18:w=208:h=64:enable='lt(t,5.7)',\
delogo=x=18:y=80:w=156:h=32:enable='lt(t,5.7)'" \
-c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
-c:a aac -b:a 128k -movflags +faststart <输出>
```

产物 **2,494,141 字节**，抽帧复核 0.5 / 2.0 / 4.0 / 4.6 / 5.0 秒：两行文字与快手图标均已消失，只剩 0.5s 左上角白墙上有一小块偏暗涂抹（可接受）。

未处理：右上角「侠」印章、底部 “ROMANTIC TIME”，它们是原片内容。

---

## 五、插件 dsh-opener

### 结构

```text
dsh-opener/
├── package.json          # dsh.bundle.patch + dsh.client（platform: web）
├── cordis.patch.yml      # insert: id opener → dsh-opener
├── icon.svg
├── README.md
├── lib/
│   ├── index.js          # 宿主：/dsh-opener 前缀路由，流式发视频，支持 Range
│   └── client.js         # 浏览器：全屏舞台、播放、声音开关、跳过、卸载
├── media/intro.mp4       # 去水印后的开场视频
└── tests/
    ├── route.test.mjs    # 路由 9 项用例
    └── client.test.mjs   # DOM 模拟 6 组用例
```

### 宿主半边

- 路径 `/dsh-opener/intro.mp4`，由 `new URL('../media/intro.mp4', import.meta.url)` 定位，不碰用户文件系统。
- 支持 `Range`（`bytes=a-b` / 开区间 / 后缀）、`HEAD`、`ETag` 304、`416`、`405 + allow`。
- 用 `createReadStream({start, end}).pipe(res)` 流式输出，`content-type: video/mp4`、`accept-ranges: bytes`。

### 浏览器半边

- 全屏舞台 `z-index: 2147483000`，视频 `object-fit: cover`，播完或跳过后淡出 620ms 再移除节点。
- **只播一次**：`sessionStorage` 标记，刷新不重播、新窗口重播。
- **跳过**：点击 / `Esc` / 空格 / 回车。
- **声音开关**：右下角胶囊按钮，文案在「关闭声音 / 开启声音」间切换，`M` 键同样有效，选择存 `localStorage`（默认有声）。
- **自动播放降级**：带声音播放被拒时自动改静音并保留「开启声音」按钮，且不覆盖用户偏好。
- **兜底**：解码失败、路由缺失、4.5 秒未开始播放都会直接收起；系统「减少动效」时整段跳过。
- 调试句柄：`__dshOpener.play()` / `.skip()` / `.sound(true|false)` / `.playing`。

### 安装

```text
plugin_manager install_bundle
target: link:C:/Users/覃青山/Documents/deepseek-harness/default-workspace/dsh-opener
```

结果：`{"stage":"enable","bundle":"dsh-opener","version":"1.0.0","application":"applied"}`（后来代码升到 1.1.0，链接安装，改文件即生效，无需重装）。

验证：

- `plugin_manager list_plugins` 出现 `include:opener`，`fiberPhase: "active"`；
- `HEAD /dsh-opener/intro.mp4` → 200，2,494,141 字节，`video/mp4`，`accept-ranges: bytes`；
- `Range: bytes=0-1023` → 206，`content-range: bytes 0-1023/2494141`。

---

## 六、踩过的坑（避免重复）

| 坑 | 结论 |
| --- | --- |
| 想用 headless Edge + CDP 截图验证 | 沙箱下 Edge 子进程直接崩（mojo `0x5`、crashpad `OpenProcess` 拒绝访问），放弃；视觉验证只能靠用户刷新 |
| `GET /plugins/<包名>/client.js` | 不是客户端资源路径，连已装好的 dream-skin 也 404，别再试 |
| `Invoke-WebRequest` 访问外网 | 沙箱内全部失败，不要试图下载工具 |
| 直接 `Invoke-WebRequest http://127.0.0.1:<port>/` | 返回 401（页面请求自带凭据），但插件自己的路由正常 |
| PowerShell `Get-Content` + `Set-Content -Encoding utf8` 改文件 | 把中文写成了乱码并加了 BOM，`node --check` 直接报 `ERR_INVALID_PACKAGE_CONFIG`。**改 UTF-8 源码请用编辑工具或 Python**，别用 PowerShell 的读写管道 |
| `vm` 沙箱测试里 `assert.deepEqual(mod.inject, [])` | 跨 realm 数组原型不同，用 `.length` 断言 |
| 测试 shim 的 `getElementById` 只查创建列表 | 要按「是否仍挂在 body/head 上」判断，否则卸载断言永远失败 |

---

## 七、当前状态

- 插件 `dsh-opener` 1.1.0 已安装，宿主半边 active，视频路由正常；客户端半边需刷新页面加载（建议 `Ctrl+Shift+R`）。
- 工作区是干净的：只剩 `dsh-opener/` 一个目录，中间产物（抽帧、掩膜、测试视频）已全部清理。
- 测试：`tests/route.test.mjs` 9 项、`tests/client.test.mjs` 6 组，全部通过；两个 JS 文件 `node --check` 通过，均为 UTF-8 无 BOM。

### 待确认 / 可继续

1. 视觉与音效在真实界面中的最终观感（需用户刷新确认）。
2. 是否要剪掉片头的静态字幕、或去掉右上「侠」印章与底部英文。
3. 是否改成「每次刷新都播」「默认静音」等行为。
4. profile 里记录的版本号仍是 1.0.0（功能不受影响，重装一次即可对齐）。
