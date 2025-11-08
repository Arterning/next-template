"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn.email({
        email,
        password,
      });

      toast.success("登录成功！");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "登录失败，请检查您的凭证");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signUp.email({
        email,
        password,
        name,
      });

      toast.success("注册成功！");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "注册失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error: any) {
      toast.error(`${provider} 登录失败`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">欢迎使用 SaaS Template</CardTitle>
          <CardDescription>登录或创建账户以继续</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">邮箱</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">密码</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "登录中..." : "登录"}
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">或继续使用</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignIn("google")}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google 登录
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignIn("github")}
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub 登录
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">姓名</Label>
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    placeholder="张三"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">邮箱</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    placeholder="至少 6 位字符"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "注册中..." : "创建账户"}
                </Button>
              </form>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">或继续使用</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignIn("google")}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google 注册
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignIn("github")}
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub 注册
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-4 hover:text-primary">
              返回首页
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
