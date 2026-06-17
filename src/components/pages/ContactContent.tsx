'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PricingHeader } from "@/components/PricingHeader";
import { PricingFooter } from "@/components/PricingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", company: "", desc: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://app.datascaler.ai/api/presentation/rese", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("已收到您的请求，我们将尽快联系您。");
        setForm({ name: "", email: "", company: "", desc: "" });
      } else {
        alert("提交失败，请稍后重试。");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("网络错误，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PricingHeader />

      <section className="relative px-6 pt-32 pb-20">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-ring/15 blur-[160px]" />
        </div>

        <div className="relative mx-auto max-w-6xl grid gap-16 lg:grid-cols-2 items-start">
          {/* Left: Text */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
              与情报专家对话
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
              无论是深度竞品穿透，还是全球市场信号捕捉，我们的专家团队随时为您提供支持。
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">战略合作</p>
                  <p className="text-sm text-muted-foreground"><p className="text-sm text-muted-foreground">support@datascaler.ai</p></p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">大客户与 API 集成</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-8"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <Label htmlFor="name" className="text-sm text-muted-foreground mb-1.5 block">姓名</Label>
                <Input
                  id="name"
                  placeholder="您的姓名"
                  required
                  className="bg-background/50"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm text-muted-foreground mb-1.5 block">公司邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="bg-background/50"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="brand" className="text-sm text-muted-foreground mb-1.5 block">核心关注品牌</Label>
                <Input
                  id="brand"
                  placeholder="例如：Anker, DJI, SHEIN..."
                  className="bg-background/50"
                  value={form.company}
                  required
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/85 gap-2">
                <Send className="h-4 w-4" />
                {loading ? "提交中..." : "预约演示"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <PricingFooter />
    </div>
  );
}
