import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { duplicateProject, friendlyWriteError } from "@/lib/projects";
import { ProjectFormModal } from "@/components/project-form-modal";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Academy Architect Studio" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const [actionError, setActionError] = useState<string | null>(null);
  const [modal, setModal] = useState<null | { kind: "create" } | { kind: "edit"; id: string }>(null);

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/auth" });
  }, [loading, user, router]);

  const { data: projects } = useQuery({
    queryKey: ["admin-projects"],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin-projects"] });
    qc.invalidateQueries({ queryKey: ["catalog-projects"] });
    qc.invalidateQueries({ queryKey: ["featured-projects"] });
  };

  if (loading || !user) return <div className="container-editorial py-24 text-sm text-muted-foreground">…</div>;


  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setActionError(null);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { setActionError(friendlyWriteError(error)); return; }
    refresh();
  };

  const duplicate = async (id: string) => {
    setActionError(null);
    try {
      const newId = await duplicateProject(id, user.id);
      refresh();
      setModal({ kind: "edit", id: newId });
    } catch (err) {
      setActionError(friendlyWriteError(err));
    }
  };

  return (
    <div className="container-editorial py-16">
      <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
        <div>
          <div className="eyebrow">Admin</div>
          <h1 className="mt-2 font-display text-4xl">{t("admin.title")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/whoami" className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm hover:border-foreground">
            Who am I?
          </Link>
          <button
            onClick={() => setModal({ kind: "create" })}
            className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            + {t("admin.new")}
          </button>
        </div>
      </div>

      {actionError && (
        <div className="mb-6 text-sm text-destructive border border-destructive/40 bg-destructive/5 p-3 rounded-sm">
          {actionError}
        </div>
      )}

      <div className="border border-border rounded-sm divide-y divide-border">
        {(projects ?? []).map((p) => (
          <div key={p.id} className="p-4 flex items-center gap-4">
            <div className="w-20 aspect-[4/3] bg-muted overflow-hidden shrink-0">
              {p.cover_image && <img src={p.cover_image} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-lg truncate">{p.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                /{p.slug} · {p.area ? `${p.area} m²` : "—"} · {p.published ? "published" : "draft"}
              </div>
            </div>
            <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-xs underline underline-offset-4">
              view
            </Link>
            <button onClick={() => setModal({ kind: "edit", id: p.id })} className="text-xs underline underline-offset-4">
              {t("admin.edit")}
            </button>
            <button onClick={() => duplicate(p.id)} className="text-xs underline underline-offset-4">
              duplicate
            </button>
            <button onClick={() => remove(p.id)} className="text-xs text-destructive underline underline-offset-4">
              {t("admin.delete")}
            </button>
          </div>
        ))}
        {projects && projects.length === 0 && (
          <div className="p-16 text-center text-sm text-muted-foreground">No projects yet.</div>
        )}
      </div>

      {modal && (
        <ProjectFormModal
          mode={modal}
          open
          onClose={() => setModal(null)}
          onSaved={refresh}
        />
      )}
    </div>
  );
}
