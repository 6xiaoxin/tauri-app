# Tauri Enterprise Scaffold

一套严格类型、模块化、带完整质量门禁的 Tauri 2 + Vue 3 企业级桌面客户端基座。

## 技术栈

- Tauri 2、Vue 3、TypeScript、Vite
- Pinia、pinia-plugin-persistedstate、Vue Router
- Tailwind CSS 4、Naive UI、Sass
- Axios
- Naive UI 组件与反馈 API 自动按需引入
- ESLint、Prettier、Stylelint、commitlint、Husky、lint-staged

## 环境要求

- Node.js >= 22.12
- pnpm >= 11
- Rust stable 与对应平台的 [Tauri prerequisites](https://tauri.app/start/prerequisites/)

## 开始使用

```shell
pnpm install
pnpm tauri dev
```

## 软件更新

应用启动时会静默检查 GitHub Releases，也可以在“关于”页面手动检查。发现新版本后，
应用会显示系统原生确认框，下载并校验签名，然后安装更新并提示重启。

发布新版本：

1. 同步更新 `package.json`、`src-tauri/Cargo.toml` 和 `src-tauri/tauri.conf.json` 中的版本号。
2. 提交版本变更。
3. 创建并推送同版本标签，例如 `git tag v0.2.0 && git push origin v0.2.0`。
4. GitHub Actions 会构建 Windows 安装包、生成签名更新清单并发布 GitHub Release。

更新签名私钥和密码保存在 GitHub Actions Secrets 中。本机备份位于
`C:\Users\jiyux\.tauri\tauri-app.key`，密码使用当前 Windows 用户的 DPAPI 加密后保存在
`C:\Users\jiyux\.tauri\tauri-app.key-password.xml`。请妥善备份，丢失后现有客户端将无法验证
后续更新。

首次克隆后，`pnpm install` 会通过 `prepare` 自动安装 Husky Git hooks。

## 质量命令

```shell
pnpm fix       # 格式化并自动修复脚本与样式问题，随后执行类型检查
pnpm quality   # 零警告执行全部前端与 Rust 质量检查
pnpm build     # 通过全部质量门禁后构建前端
```

提交信息遵循 Conventional Commits，例如：

```text
feat(router): add settings route
fix(api): handle request timeout
```

## 目录结构

```text
src/
├─ api/          # HTTP 客户端与业务请求
├─ assets/       # 静态资源和全局样式
├─ config/       # 应用配置
├─ constants/    # 全局常量
├─ layouts/      # 页面布局
├─ router/       # 路由定义与守卫
├─ stores/       # Pinia 状态模块
├─ types/        # 全局声明与共享接口
├─ utils/        # 无副作用工具函数
└─ views/        # 路由页面
```

新增领域模块时，应优先在对应目录下按业务域拆分，跨域共享类型统一放入 `src/types`。
