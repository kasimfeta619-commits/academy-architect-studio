import { Link, useRouter } from "@tanstack/react-router";
import { Logo, Wordmark } from "./logo";
import { useI18n, type Lang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();

  const linkCls = "text-sm text-foreground/70 hover:text-foreground transition-colors";
  const activeCls = { className: "text-sm text-foreground font-medium" };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-editorial flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <Wordmark className="hidden sm:inline" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls} activeProps={activeCls} activeOptions={{ exact: true }}>
            {t("nav.home")}
          </Link>
          <Link to="/catalog" className={linkCls} activeProps={activeCls}>
            {t("nav.catalog")}
          </Link>
          <Link to="/about" className={linkCls} activeProps={activeCls}>
            {t("nav.about")}
          </Link>
          <Link to="/planner" className={linkCls} activeProps={activeCls}>
            {t("nav.planner")}
          </Link>
          <Link to="/contact" className={linkCls} activeProps={activeCls}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border/70 p-0.5 text-[0.7rem] font-medium">
            {(["en", "bg"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors ${
                  lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-sm text-foreground/80 hover:text-foreground">
                  {t("nav.admin")}
                </Link>
              )}
              <button
                onClick={async () => {
                  await signOut();
                  router.navigate({ to: "/" });
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t("nav.signout")}
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium tracking-wide hover:bg-accent transition-colors"
            >
              {t("nav.signin")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
