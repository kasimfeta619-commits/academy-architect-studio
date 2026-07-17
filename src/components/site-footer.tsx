import { Logo, Wordmark } from "./logo";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-editorial py-12 grid gap-8 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <Wordmark />
            <div className="eyebrow mt-1">{t("brand.tagline")}</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="eyebrow mb-2">Studio</div>
          <p>Sofia · Plovdiv · Varna</p>
          <p>hello@academyarchitectstudios.com</p>
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          <div className="eyebrow mb-2">© {new Date().getFullYear()}</div>
          <p>Academy Architect Studio — {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
