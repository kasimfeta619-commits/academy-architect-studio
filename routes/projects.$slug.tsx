import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { duplicateProject, friendlyWriteError } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Academy Architect Studio` },
      { property: "og:title", content: params.slug },
    ],
  }),
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const { t, lang } = useI18n();
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"gallery" | "plans" | "viz">("gallery");
  const [dupError, setDupError] = useState<string | null>(null);
  const [dupBusy, setDupBusy] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) return <div className="container-editorial py-24 text-sm text-muted-foreground">Loading…</div>;
  if (!project) return null;

  const title = lang === "bg" ? project.title_bg ?? project.title : project.title;
  const description = lang === "bg" ? project.description_bg ?? project.description : project.description;

  const tabs = [
    { id: "gallery" as const, label: t("project.gallery"), items: project.gallery },
    { id: "plans" as const, label: t("project.plans"), items: project.floor_plans },
    { id: "viz" as const, label: t("project.viz"), items: project.visualizations },
  ].filter((tab) => tab.items && tab.items.length > 0);

  const active = tabs.find((x) => x.id === tab) ?? tabs[0];

  return (
    <div className="container-editorial py-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link to="/catalog" className="text-sm text-muted-foreground hover:text-foreground">
          {t("project.back")}
        </Link>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <button
              disabled={dupBusy}
              onClick={async () => {
                setDupError(null);
                setDupBusy(true);
                try {
                  const newId = await duplicateProject(project.id, user?.id);
                  qc.invalidateQueries({ queryKey: ["admin-projects"] });
                  router.navigate({ to: "/admin/edit/$id", params: { id: newId } });
                } catch (err) {
                  setDupError(friendlyWriteError(err));
                } finally {
                  setDupBusy(false);
                }
              }}
              className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:border-foreground transition-colors disabled:opacity-60"
            >
              {dupBusy ? "…" : "⧉ Create similar"}
            </button>
            <Link
              to="/admin/edit/$id"
              params={{ id: project.id }}
              className="inline-flex items-center rounded-full border border-accent text-accent-foreground bg-accent/20 px-4 py-1.5 text-xs font-medium hover:bg-accent/40 transition-colors"
            >
              ✎ Edit this project
            </Link>
          </div>
        )}
      </div>
      {dupError && <div className="mt-3 text-xs text-destructive">{dupError}</div>}

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* Media column */}
        <div>
          {project.cover_image && (
            <div className="aspect-[4/3] overflow-hidden bg-muted border border-border">
              <img src={project.cover_image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          {tabs.length > 0 && (
            <div className="mt-8">
              <div className="flex gap-6 border-b border-border">
                {tabs.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setTab(x.id)}
                    className={`pb-3 text-sm ${
                      active?.id === x.id
                        ? "text-foreground border-b-2 border-accent -mb-px"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {x.label} <span className="text-xs">({x.items.length})</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {active?.items.map((url, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden bg-muted border border-border/60">
                    <img src={url} alt={`${title} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.video_url && (
            <div className="mt-10">
              <div className="eyebrow mb-3">{t("project.video")}</div>
              <div className="aspect-video border border-border overflow-hidden">
                {project.video_url.includes("youtube") || project.video_url.includes("youtu.be") ? (
                  <iframe
                    src={project.video_url.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={project.video_url} controls className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Spec column */}
        <aside className="lg:sticky lg:top-24">
          <div className="eyebrow">{project.style ?? "Project"}</div>
          <h1 className="mt-2 font-display text-4xl md:text-5xl leading-tight">{title}</h1>
          {description && <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>}

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 text-sm border-t border-border pt-8">
            <Spec label={t("project.area")} value={project.area ? `${project.area} m²` : "—"} />
            <Spec label={t("project.floors")} value={project.floors ?? "—"} />
            <Spec label={t("project.bedrooms")} value={project.bedrooms ?? "—"} />
            <Spec label={t("project.bathrooms")} value={project.bathrooms ?? "—"} />
            <Spec label={t("project.garages")} value={project.garages ?? "—"} />
            <Spec label={t("project.material")} value={project.material ?? "—"} />
            <Spec label={t("project.style")} value={project.style ?? "—"} />
            <Spec label={t("project.price")} value={project.price ? `€${Number(project.price).toLocaleString()}` : "—"} />
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 font-display text-lg">{value}</dd>
    </div>
  );
}
