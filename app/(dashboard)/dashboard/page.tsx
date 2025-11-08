"use client";

import { useUser } from "@/lib/hooks/use-user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Users, TrendingUp, Activity } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();

  const stats = [
    {
      title: "订阅状态",
      value: user?.subscriptionStatus || "free",
      description: user?.subscriptionPlan || "免费计划",
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "账户类型",
      value: user?.role === "admin" ? "管理员" : "用户",
      description: "当前角色",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "使用情况",
      value: "正常",
      description: "系统运行正常",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "增长",
      value: "+12%",
      description: "相比上月",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">欢迎回来, {user?.name}!</h1>
        <p className="text-muted-foreground mt-2">
          这是您的仪表板概览，查看您的账户信息和使用情况。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>账户信息</CardTitle>
            <CardDescription>您的基本账户详情</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">邮箱</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">姓名</span>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">角色</span>
              <Badge variant={user?.role === "admin" ? "default" : "secondary"}>
                {user?.role === "admin" ? "管理员" : "用户"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">邮箱验证</span>
              <Badge variant={user?.emailVerified ? "default" : "secondary"}>
                {user?.emailVerified ? "已验证" : "未验证"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>订阅详情</CardTitle>
            <CardDescription>您的当前订阅计划</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">计划</span>
              <Badge variant="outline">
                {user?.subscriptionPlan?.toUpperCase() || "FREE"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">状态</span>
              <Badge variant={user?.subscriptionStatus === "active" ? "default" : "secondary"}>
                {user?.subscriptionStatus || "未订阅"}
              </Badge>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                {user?.subscriptionPlan === "free" || !user?.subscriptionPlan
                  ? "升级到付费计划以解锁更多功能"
                  : "感谢您的订阅！"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>快速开始</CardTitle>
          <CardDescription>了解如何充分利用您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </div>
              <div>
                <p className="text-sm font-medium">完善您的个人资料</p>
                <p className="text-xs text-muted-foreground">在设置中添加更多信息</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                2
              </div>
              <div>
                <p className="text-sm font-medium">探索订阅计划</p>
                <p className="text-xs text-muted-foreground">查看我们的定价选项</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                3
              </div>
              <div>
                <p className="text-sm font-medium">开始使用功能</p>
                <p className="text-xs text-muted-foreground">查看文档了解更多</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
