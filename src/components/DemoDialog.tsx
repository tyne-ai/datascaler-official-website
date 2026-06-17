'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: "zh" | "en";
}

const translations = {
  zh: {
    title: "预约产品演示",
    description: "填写以下信息，我们将尽快与您联系",
    nameLabel: "姓名 *",
    namePlaceholder: "您的姓名",
    companyLabel: "公司名称 *",
    companyPlaceholder: "您的公司",
    emailLabel: "电子邮箱 *",
    emailPlaceholder: "name@company.com",
    phoneLabel: "电话 *",
    phonePlaceholder: "+86 138-0000-0000",
    cancel: "取消",
    submit: "提交",
    submitting: "提交中...",
    successTitle: "提交成功！",
    successDescription: "我们的团队会尽快与您联系，安排产品演示。",
    close: "关闭",
    errors: {
      name: "请输入姓名",
      company: "请输入公司名称",
      email: "请输入有效的电子邮箱",
      phone: "请输入有效电话号码",
      submitFailed: "提交失败，请稍后重试。",
      networkError: "网络错误，请稍后重试。",
    },
  },
  en: {
    title: "Request a demo",
    description: "Share your details and we'll get back to you shortly.",
    nameLabel: "Name *",
    namePlaceholder: "Your name",
    companyLabel: "Company *",
    companyPlaceholder: "Your company",
    emailLabel: "Email *",
    emailPlaceholder: "name@company.com",
    phoneLabel: "Phone *",
    phonePlaceholder: "+1 (555) 000‑0000",
    cancel: "Cancel",
    submit: "Submit",
    submitting: "Submitting...",
    successTitle: "Request received!",
    successDescription: "Our team will reach out shortly to schedule your demo.",
    close: "Close",
    errors: {
      name: "Please enter your name",
      company: "Please enter your company",
      email: "Please enter a valid email",
      phone: "Please enter a valid phone number",
      submitFailed: "Submission failed. Please try again later.",
      networkError: "Network error. Please try again later.",
    },
  },
};

export function DemoDialog({ open, onOpenChange, lang = "zh" }: DemoDialogProps) {
  const t = translations[lang];
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.errors.name;
    if (!form.company.trim()) e.company = t.errors.company;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = t.errors.email;
    }
    if (!form.phone.trim() || !/^[\d\-+() ]{7,20}$/.test(form.phone.trim())) {
      e.phone = t.errors.phone;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch("https://app.datascaler.ai/api/presentation/rese", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(t.errors.submitFailed);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert(t.errors.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", company: "", email: "", phone: "" });
      setErrors({});
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl border border-border/50 bg-card p-8 shadow-2xl shadow-ring/10"
      >
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center text-2xl">🎉</div>
            <h3 className="font-display text-xl font-bold text-foreground">{t.successTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.successDescription}</p>
            <Button onClick={handleClose} variant="outline" className="mt-4 border-border/50 text-foreground">{t.close}</Button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-xl font-bold text-foreground">{t.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t.nameLabel}</label>
                <Input
                  placeholder={t.namePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground/40"
                  disabled={loading}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t.companyLabel}</label>
                <Input
                  placeholder={t.companyPlaceholder}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1 border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground/40"
                  disabled={loading}
                />
                {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t.emailLabel}</label>
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground/40"
                  disabled={loading}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t.phoneLabel}</label>
                <Input
                  placeholder={t.phonePlaceholder}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground/40"
                  disabled={loading}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={handleClose} disabled={loading} className="flex-1 border-border/50 text-foreground">{t.cancel}</Button>
              <Button onClick={handleSubmit} disabled={loading} className="flex-1 glow-primary bg-primary font-semibold text-primary-foreground hover:bg-primary/80">
                {loading ? t.submitting : (
                  <>
                    <Rocket className="mr-2 h-4 w-4" />
                    {t.submit}
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
