import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, TrendingUp, Users, Code, Rocket } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "快速部署",
      description: "几分钟内即可启动并运行您的 SaaS 应用",
    },
    {
      icon: Shield,
      title: "安全可靠",
      description: "内置认证和授权，保护用户数据安全",
    },
    {
      icon: TrendingUp,
      title: "易于扩展",
      description: "随着业务增长轻松扩展您的应用",
    },
    {
      icon: Users,
      title: "用户管理",
      description: "完整的用户管理和权限控制系统",
    },
    {
      icon: Code,
      title: "现代技术栈",
      description: "基于 Next.js、TypeScript 和最新工具",
    },
    {
      icon: Rocket,
      title: "生产就绪",
      description: "包含支付、订阅等完整功能",
    },
  ];

  const pricingPlans = [
    {
      name: "免费版",
      price: "¥0",
      description: "适合个人用户",
      features: ["最多 3 个项目", "基础功能", "社区支持", "1 GB 存储"],
    },
    {
      name: "专业版",
      price: "¥99",
      description: "适合专业人士",
      features: [
        "无限项目",
        "所有功能",
        "优先支持",
        "50 GB 存储",
        "高级分析",
      ],
      popular: true,
    },
    {
      name: "企业版",
      price: "定制",
      description: "适合大型团队",
      features: [
        "专业版所有功能",
        "专属支持",
        "无限存储",
        "SLA 保证",
        "定制开发",
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center space-x-2">
            <Rocket className="h-6 w-6" />
            <span className="font-bold text-xl">SaaS Template</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="#features">
              <Button variant="ghost">功能</Button>
            </Link>
            <Link href="#pricing">
              <Button variant="ghost">定价</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">登录</Button>
            </Link>
            <Link href="/login">
              <Button>开始使用</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32 px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              快速构建您的 SaaS 应用
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              完整的 Next.js SaaS 模板，包含认证、支付、订阅管理等所有功能。
              让您专注于核心业务，而不是基础设施。
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  <Rocket className="h-4 w-4" />
                  立即开始
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24 bg-muted/50 px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              强大的功能
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              包含构建现代 SaaS 应用所需的一切
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="container py-24 px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              现代化技术栈
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              基于业界最佳实践和流行工具构建
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Next.js 16",
              "TypeScript",
              "Tailwind CSS",
              "shadcn/ui",
              "Better Auth",
              "Drizzle ORM",
              "PostgreSQL",
              "Stripe",
            ].map((tech) => (
              <Card key={tech}>
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold">{tech}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container py-24 bg-muted/50 px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              简单透明的定价
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              选择最适合您的计划
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={plan.popular ? "border-primary shadow-lg" : ""}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      最受欢迎
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "定制" && (
                      <span className="text-muted-foreground">/月</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/login" className="block">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.price === "定制" ? "联系我们" : "开始使用"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24 px-4 md:px-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">准备开始了吗？</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                立即创建账户，开始构建您的 SaaS 应用
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Rocket className="h-4 w-4" />
                  免费开始
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6" />
                <span className="font-bold text-xl">SaaS Template</span>
              </div>
              <p className="text-sm text-muted-foreground">
                快速构建现代 SaaS 应用的完整解决方案
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">产品</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features">功能</Link>
                </li>
                <li>
                  <Link href="#pricing">定价</Link>
                </li>
                <li>
                  <Link href="#">文档</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">公司</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">关于</Link>
                </li>
                <li>
                  <Link href="#">博客</Link>
                </li>
                <li>
                  <Link href="#">联系我们</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">法律</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#">隐私政策</Link>
                </li>
                <li>
                  <Link href="#">服务条款</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 SaaS Template. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
