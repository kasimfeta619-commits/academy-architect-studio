import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { friendlyWriteError } from "@/lib/projects";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { uploadProjectFile } from "@/lib/upload";

export const Route = createFileRoute("/admin/edit/$id")({
  head: () => ({ meta: [{ title: "Edit project — Admin" }, { name: "robots", content: "noindex" }] }),
  component: EditProject,
});

const inputCls =
  "w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-foreground";
const labelCls = "eyebrow block mb-2";

function EditProject() {
  const { t } = useI18n();
  const { id } = Route.useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user)) router.navigate({ to: "/auth" });
  }, [loading, user, router]);

  const { data: project, isLoading } = useQuery({
    queryKey: ["admin-project", id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    slug: "", title: "", title_bg: "", description: "", description_bg: "",
    project_type: "single_house" as "single_house" | "complex" | "public_building",
    area: "", floors: "", bedrooms: "", bathrooms: "", garages: "",
    material: "", style: "", price: "", video_url: "",
    featured: false, published: true,
  });
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [plans, setPlans] = useState<string[]>([]);
  const [viz, setViz] = useState<string[]>([]);

  const [newCover, setNewCover] = useState<File | null>(null);
  const [newGallery, setNewGallery] = useState<FileList | null>(null);
  const [newPlans, setNewPlans] = useState<FileList | null>(null);
  const [newViz, setNewViz] = useState<FileList | null>(null);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    setForm({
      slug: project.slug ?? "",
      title: project.title ?? "",
      title_bg: project.title_bg ?? "",
      description: project.description ?? "",
      description_bg: project.description_bg ?? "",
      project_type: (project.project_type ?? "single_house") as "single_house" | "complex" | "public_building",
      area: project.area?.toString() ?? "",
      floors: project.floors?.toString() ?? "",
      bedrooms: project.bedrooms?.toString() ?? "",
      bathrooms: project.bathrooms?.toString() ?? "",
      garages: project.garages?.toString() ?? "",
      material: project.material ?? "",
      style: project.style ?? "",
      price: project.price?.toString() ?? "",
      video_url: project.video_url ?? "",
      featured: !!project.featured,
      published: !!project.published,
    });
    setCoverUrl(project.cover_image ?? null);
    setGallery(project.gallery ?? []);
    setPlans(project.floor_plans ?? []);
    setViz(project.visualizations ?? []);
  }, [project]);

  const upd = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null); setStatus(null);
    try {
      setStatus(t("admin.uploading"));
      const finalCover = newCover ? await uploadProjectFile(newCover, "covers") : coverUrl;
      const addGallery = newGallery
        ? await Promise.all(Array.from(newGallery).map((f) => uploadProjectFile(f, "gallery")))
        : [];
      const addPlans = newPlans
        ? await Promise.all(Array.from(newPlans).map((f) => uploadProjectFile(f, "plans")))
        : [];
      const addViz = newViz
        ? await Promise.all(Array.from(newViz).map((f) => uploadProjectFile(f, "viz")))
        : [];

      const num = (s: string) => (s.trim() === "" ? null : Number(s));

      const { error } = await supabase
        .from("projects")
        .update({
          slug: form.slug,
          title: form.title,
          title_bg: form.title_bg || null,
          description: form.description || null,
          description_bg: form.description_bg || null,
          project_type: form.project_type,
          cover_image: finalCover,
          gallery: [...gallery, ...addGallery],
          floor_plans: [...plans, ...addPlans],
          visualizations: [...viz, ...addViz],
          video_url: form.video_url || null,
          area: num(form.area),
          floors: num(form.floors),
          bedrooms: num(form.bedrooms),
          bathrooms: num(form.bathrooms),
          garages: num(form.garages),
          material: form.material || null,
          style: form.style || null,
          price: num(form.price),
          featured: form.featured,
          published: form.published,
        })
        .eq("id", id);
      if (error) throw error;
      setStatus(t("admin.saved"));
      router.navigate({ to: "/admin" });
    } catch (err) {
      setError(friendlyWriteError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading || !user || isLoading)
    return <div className="container-editorial py-24 text-sm text-muted-foreground">…</div>;

  if (!project)
    return (
      <div className="container-editorial py-24">
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">← Admin</Link>
        <h1 className="mt-4 font-display text-3xl">Project not found</h1>
      </div>
    );

  return (
    <div className="container-editorial py-16 max-w-4xl">
      <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">← Admin</Link>
      <h1 className="mt-4 font-display text-4xl">{t("admin.edit")}: {project.title}</h1>

      <form onSubmit={submit} className="mt-10 space-y-10">
        <section className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls}>Slug *</label>
            <input required className={inputCls} value={form.slug} onChange={(e) => upd("slug", e.target.value)} />
          </div>
          <div />
          <div>
            <label className={labelCls}>Title (EN) *</label>
            <input required className={inputCls} value={form.title} onChange={(e) => upd("title", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Заглавие (BG)</label>
            <input className={inputCls} value={form.title_bg} onChange={(e) => upd("title_bg", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Description (EN)</label>
            <textarea rows={4} className={inputCls} value={form.description} onChange={(e) => upd("description", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Описание (BG)</label>
            <textarea rows={4} className={inputCls} value={form.description_bg} onChange={(e) => upd("description_bg", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>{t("project.type")} *</label>
            <select
              className={inputCls}
              value={form.project_type}
              onChange={(e) => upd("project_type", e.target.value as typeof form.project_type)}
            >
              <option value="single_house">{t("type.single_house")}</option>
              <option value="complex">{t("type.complex")}</option>
              <option value="public_building">{t("type.public_building")}</option>
            </select>
          </div>
        </section>

        <section>
          <div className="eyebrow mb-4">Specifications</div>
          <div className="grid gap-4 md:grid-cols-4">
            <Field label={t("project.area") + " (m²)"} value={form.area} onChange={(v) => upd("area", v)} />
            <Field label={t("project.floors")} value={form.floors} onChange={(v) => upd("floors", v)} />
            <Field label={t("project.bedrooms")} value={form.bedrooms} onChange={(v) => upd("bedrooms", v)} />
            <Field label={t("project.bathrooms")} value={form.bathrooms} onChange={(v) => upd("bathrooms", v)} />
            <Field label={t("project.garages")} value={form.garages} onChange={(v) => upd("garages", v)} />
            <Field label={t("project.material")} value={form.material} onChange={(v) => upd("material", v)} />
            <Field label={t("project.style")} value={form.style} onChange={(v) => upd("style", v)} />
            <Field label={t("project.price") + " (€)"} value={form.price} onChange={(v) => upd("price", v)} />
          </div>
        </section>

        <section>
          <div className="eyebrow mb-4">Cover image</div>
          {coverUrl && (
            <div className="mb-3 flex items-center gap-4">
              <img src={coverUrl} alt="" className="w-40 aspect-[4/3] object-cover border border-border" />
              <button type="button" onClick={() => setCoverUrl(null)} className="text-xs text-destructive underline">
                Remove cover
              </button>
            </div>
          )}
          <FileField label="Replace cover" onChange={(fs) => setNewCover(fs?.[0] ?? null)} />
        </section>

        <MediaGroup
          title={t("project.gallery")}
          items={gallery}
          onRemove={(i) => setGallery(gallery.filter((_, idx) => idx !== i))}
          onAdd={setNewGallery}
        />
        <MediaGroup
          title={t("project.plans")}
          items={plans}
          onRemove={(i) => setPlans(plans.filter((_, idx) => idx !== i))}
          onAdd={setNewPlans}
        />
        <MediaGroup
          title={t("project.viz")}
          items={viz}
          onRemove={(i) => setViz(viz.filter((_, idx) => idx !== i))}
          onAdd={setNewViz}
        />

        <section>
          <label className={labelCls}>Video URL</label>
          <input className={inputCls} value={form.video_url} onChange={(e) => upd("video_url", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
        </section>

        <section className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => upd("published", e.target.checked)} />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => upd("featured", e.target.checked)} />
            Featured
          </label>
        </section>

        {error && <div className="text-sm text-destructive">{error}</div>}
        {status && <div className="text-sm text-muted-foreground">{status}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60"
          >
            {busy ? t("admin.uploading") : t("admin.save")}
          </button>
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-foreground transition-colors"
          >
            View public page
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function FileField({ label, multiple, onChange }: { label: string; multiple?: boolean; onChange: (fs: FileList | null) => void }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => onChange(e.target.files)}
        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-foreground file:text-background hover:file:bg-accent"
      />
    </div>
  );
}

function MediaGroup({
  title, items, onRemove, onAdd,
}: {
  title: string;
  items: string[];
  onRemove: (i: number) => void;
  onAdd: (fs: FileList | null) => void;
}) {
  return (
    <section>
      <div className="eyebrow mb-4">{title}</div>
      {items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {items.map((url, i) => (
            <div key={url + i} className="relative group border border-border">
              <img src={url} alt="" className="w-full aspect-[4/3] object-cover" />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 bg-background/90 text-destructive text-xs px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <FileField label="Add more" multiple onChange={onAdd} />
    </section>
  );
}
