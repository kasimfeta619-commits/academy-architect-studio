import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const { data: featured } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("id, slug, title, title_bg, cover_image, area, floors, style")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(6);
      return data ?? [];
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="container-editorial pt-16 pb-24 md:pt-24 md:pb-32 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-accent transition-colors"
              >
                {t("hero.cta")} →
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-foreground/40 transition-colors"
              >
                {t("hero.secondary")}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full rounded-sm bg-gradient-to-br from-secondary via-muted to-background overflow-hidden border border-border/60 relative">
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full text-foreground/80" fill="none" stroke="currentColor" strokeWidth="0.6">
                <path d="M50 400 L200 100 L350 400 Z" />
                <path d="M110 400 L110 260 L200 180 L290 260 L290 400" />
                <path d="M150 400 L150 320 L250 320 L250 400" />
                <path d="M180 320 L180 260 M220 320 L220 260" />
                <line x1="30" y1="400" x2="370" y2="400" strokeDasharray="2 4" />
                <line x1="30" y1="440" x2="370" y2="440" strokeDasharray="2 4" opacity="0.4" />
                <text x="30" y="475" fontFamily="Manrope" fontSize="9" fill="currentColor" stroke="none" opacity="0.5">
                  PROJECT №001 — RESIDENTIAL / SCALE 1:100
                </text>
              </svg>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border border-border px-4 py-3 text-xs">
              <div className="eyebrow">Latest</div>
              <div className="mt-1 font-medium">Timber & stone series</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section className="container-editorial py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow">{lang === "bg" ? "Избрани" : "Selected"}</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              {lang === "bg" ? "Скорошни проекти" : "Recent projects"}
            </h2>
          </div>
          <Link to="/catalog" className="text-sm underline underline-offset-4 hover:text-accent">
            {t("nav.catalog")} →
          </Link>
        </div>

        {featured && featured.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Link
                key={p.id}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted border border-border/60">
                  {p.cover_image ? (
                    <img
                      src={p.cover_image}
                      alt={lang === "bg" ? p.title_bg ?? p.title : p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-display text-xl">
                    {lang === "bg" ? p.title_bg ?? p.title : p.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {p.area ? `${p.area} m²` : ""}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {[p.floors ? `${p.floors} ${lang === "bg" ? "етажа" : "floors"}` : null, p.style]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-sm border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            {lang === "bg"
              ? "Все още няма публикувани проекти. Влезте като администратор, за да добавите първия."
              : "No projects yet. Sign in as admin to add your first one."}
          </div>
        )}
      </section>

      {/* Manifesto */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="container-editorial py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            {lang === "bg"
              ? "Всеки план разказва как ще се живее в него."
              : "Every plan is a hypothesis about how a life will be lived."}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {lang === "bg"
              ? "Работим с малки семейства, инвеститори и общини. Всеки проект в каталога идва с чертежи по етажи, 3D визуализации, спецификация на материали и разчет на квадратура."
              : "We work with small families, developers and municipalities. Every project in the catalog ships with floor drawings, 3D visualizations, a material specification and a full area breakdown."}
          </p>
        </div>
      </section>
    </div>
  );
}
