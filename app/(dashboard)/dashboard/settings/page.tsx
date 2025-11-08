"use client";

import { useState } from "react";
import { useUser } from "@/lib/hooks/use-user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      // TODO: Implement profile update API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("个人资料更新成功");
    } catch (error: any) {
      toast.error("更新失败: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("新密码与确认密码不匹配");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement password change API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("密码修改成功");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error("密码修改失败: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">设置</h1>
        <p className="text-muted-foreground mt-2">管理您的账户设置和偏好</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="security">安全</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
              <CardDescription>更新您的个人信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Button variant="outline" size="sm">
                    更换头像
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF 或 PNG. 最大 1MB.
                  </p>
                </div>
              </div>

              <Separator />

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={user?.name || ""}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      邮箱地址无法更改
                    </p>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "保存中..." : "保存更改"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>账户信息</CardTitle>
              <CardDescription>查看您的账户详情</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">用户 ID</span>
                <span className="font-mono">{user?.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">角色</span>
                <span>{user?.role === "admin" ? "管理员" : "用户"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">邮箱验证状态</span>
                <span>{user?.emailVerified ? "已验证" : "未验证"}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>修改密码</CardTitle>
              <CardDescription>确保您的账户安全</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">当前密码</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "更新中..." : "更新密码"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>已连接账户</CardTitle>
              <CardDescription>管理您的社交媒体连接</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    G
                  </div>
                  <div>
                    <p className="text-sm font-medium">Google</p>
                    <p className="text-xs text-muted-foreground">未连接</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  连接
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    GH
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-muted-foreground">未连接</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  连接
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">危险区域</CardTitle>
              <CardDescription>不可逆的操作，请谨慎</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" size="sm">
                删除账户
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                删除账户后，所有数据将被永久删除且无法恢复
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>邮件通知</CardTitle>
              <CardDescription>配置您希望接收的邮件类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">产品更新</p>
                  <p className="text-xs text-muted-foreground">
                    接收有关新功能和产品更新的邮件
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  关闭
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">营销邮件</p>
                  <p className="text-xs text-muted-foreground">
                    接收促销活动和优惠信息
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  关闭
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">安全通知</p>
                  <p className="text-xs text-muted-foreground">
                    接收有关账户安全的重要通知
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  开启（必需）
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
