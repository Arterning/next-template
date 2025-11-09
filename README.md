# Next.js SaaS Template

一个功能完整的 SaaS 应用模板，基于 Next.js 16、TypeScript 和现代化技术栈构建。

## 🚀 功能特性

- ✅ **用户认证**
  - 邮箱密码登录
  - Google OAuth
  - GitHub OAuth
  - 基于 Better Auth

- ✅ **数据库**
  - PostgreSQL
  - Drizzle ORM
  - 类型安全的数据库操作

- ✅ **支付集成**
  - Stripe 支付
  - 订阅管理
  - Webhook 处理

- ✅ **用户界面**
  - shadcn/ui 组件库
  - Tailwind CSS
  - 响应式设计
  - 暗色模式支持

- ✅ **功能页面**
  - 用户仪表板
  - 账户设置
  - 订阅管理
  - 管理后台
  - 营销落地页

## 📦 技术栈

- **框架**: Next.js 16
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui
- **认证**: Better Auth
- **数据库**: PostgreSQL + Drizzle ORM
- **支付**: Stripe
- **图标**: Lucide React

## 🛠️ 快速开始

### 1. 克隆项目

\`\`\`bash
git clone <your-repo-url>
cd next-template
\`\`\`

### 2. 安装依赖

\`\`\`bash
pnpm install
\`\`\`

### 3. 配置环境变量

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/saas_db

# Auth
BETTER_AUTH_SECRET=your-secret-key-here-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth - GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SaaS Template

```


复制 `.env.example` 到 `.env.local` 并填写必要的配置：

\`\`\`bash
cp .env.example .env.local
\`\`\`

必需的环境变量：

\`\`\`env
# 数据库
DATABASE_URL=postgresql://username:password@localhost:5432/saas_db

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

# OAuth (可选)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-secret
\`\`\`

### 4. 设置数据库

确保 PostgreSQL 已安装并运行，然后创建数据库：

\`\`\`bash
createdb saas_db
\`\`\`

推送数据库 schema：

\`\`\`bash
pnpm db:push
\`\`\`

### 5. 启动开发服务器

\`\`\`bash
pnpm dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📝 可用脚本

\`\`\`bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 运行 ESLint
pnpm db:generate  # 生成数据库迁移
pnpm db:migrate   # 运行数据库迁移
pnpm db:push      # 推送 schema 到数据库
pnpm db:studio    # 打开 Drizzle Studio
\`\`\`

## 🔐 配置 OAuth

### Google OAuth

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据
5. 添加授权重定向 URI: `http://localhost:3000/api/auth/callback/google`
6. 将 Client ID 和 Secret 添加到 `.env.local`

### GitHub OAuth

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 创建新的 OAuth App
3. 设置授权回调 URL: `http://localhost:3000/api/auth/callback/github`
4. 将 Client ID 和 Secret 添加到 `.env.local`

## 💳 配置 Stripe

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. 获取测试模式的 API 密钥
3. 配置 Webhook:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - 监听事件:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
4. 将密钥添加到 `.env.local`

## 📁 项目结构

\`\`\`
├── app/
│   ├── (auth)/           # 认证相关页面
│   │   └── login/
│   ├── (dashboard)/      # 用户仪表板
│   │   ├── dashboard/
│   │   └── admin/
│   ├── api/              # API 路由
│   │   ├── auth/
│   │   └── stripe/
│   ├── layout.tsx
│   └── page.tsx          # 首页
├── components/
│   ├── ui/               # shadcn/ui 组件
│   ├── dashboard-nav.tsx
│   └── providers.tsx
├── lib/
│   ├── db/               # 数据库配置
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── hooks/            # React Hooks
│   ├── auth.ts           # Better Auth 配置
│   ├── auth-client.ts    # 客户端认证
│   └── stripe.ts         # Stripe 配置
├── middleware.ts         # 路由保护
└── drizzle.config.ts     # Drizzle 配置
\`\`\`

## 🎨 自定义

### 修改主题

在 `app/globals.css` 中自定义颜色：

\`\`\`css
@layer base {
  :root {
    --primary: /* your color */;
    --secondary: /* your color */;
    /* ... */
  }
}
\`\`\`

### 添加新页面

在 `app/` 目录下创建新的路由文件夹和 `page.tsx` 文件。

### 修改数据库 Schema

1. 编辑 `lib/db/schema.ts`
2. 运行 `pnpm db:push` 同步到数据库

## 🚢 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

### 其他平台

确保配置以下内容：
- Node.js 版本: 18+
- 构建命令: `pnpm build`
- 启动命令: `pnpm start`
- 环境变量: 按照 `.env.example` 配置

## 📚 文档

### 核心功能

- **认证**: 使用 Better Auth 提供安全的用户认证
- **订阅**: 通过 Stripe 处理订阅和支付
- **权限**: 基于角色的访问控制（用户/管理员）
- **数据库**: Drizzle ORM 提供类型安全的数据库操作

### API 路由

- `/api/auth/*` - 认证相关 API
- `/api/stripe/checkout` - 创建 Stripe 结账会话
- `/api/stripe/webhook` - Stripe Webhook 处理

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Better Auth](https://better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Stripe](https://stripe.com/)

## 📮 联系

如有问题或建议，请提交 Issue。

---

**快速开始构建您的 SaaS 应用吧！** 🚀
