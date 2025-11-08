"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, CreditCard, TrendingUp, DollarSign } from "lucide-react";

export default function AdminPage() {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: "总用户数",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "活跃订阅",
      value: "1,234",
      change: "+8.2%",
      icon: CreditCard,
      color: "text-green-600",
    },
    {
      title: "月收入",
      value: "¥122,430",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "增长率",
      value: "+23.1%",
      change: "+4.7%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: "张三",
      email: "zhangsan@example.com",
      role: "user",
      subscription: "pro",
      status: "active",
    },
    {
      id: "2",
      name: "李四",
      email: "lisi@example.com",
      role: "user",
      subscription: "free",
      status: "active",
    },
    {
      id: "3",
      name: "王五",
      email: "wangwu@example.com",
      role: "admin",
      subscription: "enterprise",
      status: "active",
    },
    {
      id: "4",
      name: "赵六",
      email: "zhaoliu@example.com",
      role: "user",
      subscription: "pro",
      status: "inactive",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">管理后台</h1>
        <p className="text-muted-foreground mt-2">
          监控和管理您的 SaaS 应用
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
              <p className="text-xs text-green-600 mt-1">
                {stat.change} 相比上月
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近注册用户</CardTitle>
            <CardDescription>查看最新加入的用户</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>订阅</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? "管理员" : "用户"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.subscription.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                      >
                        {user.status === "active" ? "活跃" : "未活跃"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>订阅分布</CardTitle>
            <CardDescription>各计划订阅用户分布</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm">免费版</span>
                </div>
                <span className="text-sm font-medium">1,309 (51.5%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[51.5%] bg-blue-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm">专业版</span>
                </div>
                <span className="text-sm font-medium">982 (38.6%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[38.6%] bg-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-sm">企业版</span>
                </div>
                <span className="text-sm font-medium">252 (9.9%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[9.9%] bg-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>收入趋势</CardTitle>
          <CardDescription>过去 6 个月的收入趋势</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            图表组件占位 - 可集成 recharts 或其他图表库
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
