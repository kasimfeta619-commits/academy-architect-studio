import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Sign in — Academy Architect Studio" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    setTimeout(() => router.navigate({ to: "/admin" }), 0);
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      router.navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-foreground";

  return (
    <div className="container-editorial py-20 max-w-md">
      <div className="eyebrow">{mode === "signin" ? t("auth.signin") : t("auth.signup")}</div>
      <h1 className="mt-3 font-display text-4xl">{t("auth.title")}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{t("auth.subtitle")}</p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label className="eyebrow block mb-2">{t("auth.email")}</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="eyebrow block mb-2">{t("auth.password")}</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60"
        >
          {loading ? "…" : mode === "signin" ? t("auth.signin") : t("auth.signup")}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        {mode === "signin" ? t("auth.toggleTo.signup") : t("auth.toggleTo.signin")}
      </button>

      <div className="mt-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">← Home</Link>
      </div>
    </div>
  );
}
