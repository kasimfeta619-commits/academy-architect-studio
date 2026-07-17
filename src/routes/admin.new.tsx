import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { friendlyWriteError } from "@/lib/projects";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { uploadProjectFile } from "@/lib/upload";

export const Route = createFileRoute("/admin/new")({
  head: () => ({ meta: [{ title: "New project — Admin" }, { name: "robots", content: "noindex" }] }),
  component: NewProject,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || `project-${Date.now()}`;
}

const inputCls = "w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-foreground";
const labelCls = "eyebrow block mb-2";

function NewProject() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/auth" });
  }, [loading, user, router]);

  const [form, setForm] = useState({
    title: "", title_bg: "", description: "", description_bg: "",
    project_type: "single_house" as "single_house" | "complex" | "public_building",
    area: "", floors: "", bedrooms: "", bathrooms: "", garages: "",
    material: "", style: "", price: "", video_url: "",
    featured: false, published: true,
  });
  const [cover, setCover] = useState<File | null>(null);
  const [gallery, setGallery] = useState<FileList | null>(null);
  const [plans, setPlans] = useState<FileList | null>(null);
  const [viz, setViz] = useState<FileList | null>(null);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upd = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true); setError(null); setStatus(null);
    try {
      setStatus(t("admin.uploading"));
      const coverUrl = cover ? await uploadProjectFile(cover, "covers") : null;
      const galleryUrls = gallery ? await Promise.all(Array.from(gallery).map((f) => uploadProjectFile(f, "gallery"))) : [];
      const planUrls = plans ? await Promise.all(Array.from(plans).map((f) => uploadProjectFile(f, "plans"))) : [];
      const vizUrls = viz ? await Promise.all(Array.from(viz).map((f) => uploadProjectFile(f, "viz"))) : [];

      const num = (s: string) => (s.trim() === "" ? null : Number(s));

      const { error } = await supabase.from("projects").insert({
        slug: slugify(form.title),
        title: form.title,
        title_bg: form.title_bg || null,
        description: form.description || null,
        description_bg: form.description_bg || null,
        project_type: form.project_type,
        cover_image: coverUrl,
        gallery: galleryUrls,
        floor_plans: planUrls,
        visualizations: vizUrls,
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
        author_id: user.id,
      });
      if (error) throw error;
      setStatus(t("admin.saved"));
      router.navigate({ to: "/admin" });
    } catch (err) {
      setError(friendlyWriteError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading || !user) return <div className="container-editorial py-24 text-sm text-muted-foreground">…</div>;

  return (
    <div className="container-editorial py-16 max-w-4xl">
      <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">← Admin</Link>
      <h1 className="mt-4 font-display text-4xl">{t("admin.new")}</h1>

      <form onSubmit={submit} className="mt-10 space-y-10">
        {/* Titles */}
        <section className="grid gap-4 md:grid-cols-2">
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

        {/* Specs */}
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

        {/* Media */}
        <section>
          <div className="eyebrow mb-4">Media</div>
          <div className="grid gap-4 md:grid-cols-2">
            <FileField label="Cover image" onChange={(fs) => setCover(fs?.[0] ?? null)} />
            <FileField label={t("project.gallery")} multiple onChange={(fs) => setGallery(fs)} />
            <FileField label={t("project.plans")} multiple onChange={(fs) => setPlans(fs)} />
            <FileField label={t("project.viz")} multiple onChange={(fs) => setViz(fs)} />
          </div>
          <div className="mt-4">
            <label className={labelCls}>Video URL (YouTube or MP4)</label>
            <input className={inputCls} value={form.video_url} onChange={(e) => upd("video_url", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
          </div>
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

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60"
        >
          {busy ? t("admin.uploading") : t("admin.save")}
        </button>
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
      <input type="file" accept="image/*" multiple={multiple} onChange={(e) => onChange(e.target.files)} className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-foreground file:text-background hover:file:bg-accent" />
    </div>
  );
}
