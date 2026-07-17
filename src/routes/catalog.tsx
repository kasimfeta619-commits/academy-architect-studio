import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Academy Architect Studio" },
      { name: "description", content: "Browse house projects filtered by area, floors and style." },
      { property: "og:title", content: "Catalog — Academy Architect Studio" },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { t, lang } = useI18n();
  const [floors, setFloors] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("");
  const [minArea, setMinArea] = useState<string>("");
  const [maxArea, setMaxArea] = useState<string>("");

  const { data: projects } = useQuery({
    queryKey: ["catalog-projects"],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const styles = useMemo(() => {
    const set = new Set<string>();
    projects?.forEach((p) => p.style && set.add(p.style));
    return [...set];
  }, [projects]);

  const filtered = useMemo(() => {
    return (projects ?? []).filter((p) => {
      if (floors && p.floors !== Number(floors)) return false;
      if (bedrooms && (p.bedrooms ?? 0) < Number(bedrooms)) return false;
      if (style && p.style !== style) return false;
      if (projectType && p.project_type !== projectType) return false;
      if (minArea && (p.area ?? 0) < Number(minArea)) return false;
      if (maxArea && (p.area ?? 0) > Number(maxArea)) return false;
      return true;
    });
  }, [projects, floors, bedrooms, style, projectType, minArea, maxArea]);

  const reset = () => {
    setFloors(""); setBedrooms(""); setStyle(""); setProjectType(""); setMinArea(""); setMaxArea("");
  };

  const selectCls =
    "w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-foreground";

  return (
    <div className="container-editorial py-16">
      <div className="max-w-2xl">
        <div className="eyebrow">{t("nav.catalog")}</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{t("catalog.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("catalog.subtitle")}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-6 border-y border-border py-6">
        <div>
          <label className="eyebrow block mb-2">{t("filter.type")}</label>
          <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className={selectCls}>
            <option value="">{t("filter.any")}</option>
            <option value="single_house">{t("type.single_house")}</option>
            <option value="complex">{t("type.complex")}</option>
            <option value="public_building">{t("type.public_building")}</option>
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-2">{t("filter.area")}</label>
          <div className="flex gap-2">
            <input placeholder="min" value={minArea} onChange={(e) => setMinArea(e.target.value)} className={selectCls} inputMode="numeric" />
            <input placeholder="max" value={maxArea} onChange={(e) => setMaxArea(e.target.value)} className={selectCls} inputMode="numeric" />
          </div>
        </div>
        <div>
          <label className="eyebrow block mb-2">{t("filter.floors")}</label>
          <select value={floors} onChange={(e) => setFloors(e.target.value)} className={selectCls}>
            <option value="">{t("filter.any")}</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-2">{t("filter.bedrooms")}</label>
          <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectCls}>
            <option value="">{t("filter.any")}</option>
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
        <div>
          <label className="eyebrow block mb-2">{t("filter.style")}</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className={selectCls}>
            <option value="">{t("filter.any")}</option>
            {styles.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={reset} className="w-full border border-border rounded-sm px-3 py-2 text-sm hover:bg-secondary transition-colors">
            {t("filter.reset")}
          </button>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {t("catalog.count")}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-sm border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
          {t("catalog.empty")}
        </div>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden bg-muted border border-border/60">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-xs text-muted-foreground">No image</div>
                )}
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl leading-tight">
                  {lang === "bg" ? p.title_bg ?? p.title : p.title}
                </h3>
                {p.price && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">€{Number(p.price).toLocaleString()}</span>
                )}
              </div>
              <dl className="mt-2 grid grid-cols-4 gap-2 text-[0.7rem] text-muted-foreground">
                {p.area && <div><dt className="eyebrow">m²</dt><dd className="mt-0.5 text-foreground">{p.area}</dd></div>}
                {p.floors && <div><dt className="eyebrow">{lang === "bg" ? "етажи" : "floors"}</dt><dd className="mt-0.5 text-foreground">{p.floors}</dd></div>}
                {p.bedrooms != null && <div><dt className="eyebrow">{lang === "bg" ? "спални" : "beds"}</dt><dd className="mt-0.5 text-foreground">{p.bedrooms}</dd></div>}
                {p.bathrooms != null && <div><dt className="eyebrow">{lang === "bg" ? "бани" : "baths"}</dt><dd className="mt-0.5 text-foreground">{p.bathrooms}</dd></div>}
              </dl>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
