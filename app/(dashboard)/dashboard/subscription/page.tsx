"use client";

import { useState } from "react";
import { useUser } from "@/lib/hooks/use-user";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { toast } from "sonner";

const pricingPlans = [
  {
    id: "free",
    name: "免费版",
    description: "适合个人用户和小型项目",
    price: "¥0",
    period: "永久免费",
    icon: Zap,
    features: [
      "最多 3 个项目",
      "基础功能访问",
      "社区支持",
      "1 GB 存储空间",
      "邮件支持",
    ],
    limitations: [
      "无法访问高级功能",
      "有限的 API 调用",
    ],
    cta: "当前计划",
    popular: false,
  },
  {
    id: "pro",
    name: "专业版",
    description: "适合专业人士和成长中的团队",
    price: "¥99",
    period: "每月",
    icon: Crown,
    features: [
      "无限项目",
      "所有高级功能",
      "优先支持",
      "50 GB 存储空间",
      "高级分析",
      "自定义域名",
      "API 访问",
    ],
    cta: "升级到专业版",
    popular: true,
  },
  {
    id: "enterprise",
    name: "企业版",
    description: "适合大型组织和企业",
    price: "定制",
    period: "联系我们",
    icon: Rocket,
    features: [
      "专业版所有功能",
      "专属客户经理",
      "SLA 保证",
      "无限存储",
      "高级安全功能",
      "SSO 单点登录",
      "定制开发",
      "培训与入职",
    ],
    cta: "联系销售",
    popular: false,
  },
];

export default function SubscriptionPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setIsLoading(planId);

    try {
      if (planId === "free") {
        toast.info("您已经在使用免费版");
        return;
      }

      if (planId === "enterprise") {
        toast.info("请联系我们的销售团队了解企业版详情");
        return;
      }

      // TODO: Integrate with Stripe
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("正在跳转到支付页面...");
    } catch (error: any) {
      toast.error("订阅失败: " + error.message);
    } finally {
      setIsLoading(null);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      // TODO: Implement cancel subscription
      toast.success("订阅已取消");
    } catch (error: any) {
      toast.error("取消失败: " + error.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">订阅计划</h1>
        <p className="text-muted-foreground mt-2">
          选择最适合您需求的计划
        </p>
      </div>

      {user?.subscriptionStatus && user?.subscriptionPlan !== "free" && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>当前订阅</CardTitle>
            <CardDescription>管理您的订阅</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">计划</span>
              <Badge>{user.subscriptionPlan?.toUpperCase()}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">状态</span>
              <Badge variant={user.subscriptionStatus === "active" ? "default" : "secondary"}>
                {user.subscriptionStatus}
              </Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={handleCancelSubscription} className="w-full">
              取消订阅
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan =
            (user?.subscriptionPlan || "free") === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                  <Badge className="bg-primary">最受欢迎</Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  {isCurrentPlan && (
                    <Badge variant="outline">当前计划</Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.period}
                  </p>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations && (
                  <div className="space-y-2 pt-2 border-t">
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="h-5 w-5 shrink-0 mt-0.5 flex items-center justify-center">
                          <div className="h-1 w-3 bg-muted-foreground rounded" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan || isLoading === plan.id}
                >
                  {isLoading === plan.id
                    ? "处理中..."
                    : isCurrentPlan
                    ? plan.cta
                    : plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>常见问题</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="font-medium">我可以随时取消订阅吗？</p>
            <p className="text-sm text-muted-foreground">
              是的，您可以随时取消订阅。取消后将在当前付费周期结束时生效。
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">我可以升级或降级计划吗？</p>
            <p className="text-sm text-muted-foreground">
              可以。您可以随时更改订阅计划，费用将按比例调整。
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">支持哪些支付方式？</p>
            <p className="text-sm text-muted-foreground">
              我们支持信用卡、借记卡以及其他主流支付方式。
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">有退款政策吗？</p>
            <p className="text-sm text-muted-foreground">
              如果您在购买后 14 天内不满意，可以申请全额退款。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
