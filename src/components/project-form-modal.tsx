import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadProjectFile } from "@/lib/upload";
import { friendlyWriteError } from "@/lib/projects";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

type Mode = { kind: "create" } | { kind: "edit"; id: string };

type FormState = {
  slug: string;
  title: string;
  title_bg: string;
  description: string;
  description_bg: string;
  project_type: "single_house" | "complex" | "public_building";
  area: string;
  floors: string;
  bedrooms: string;
  bathrooms: string;
  garages: string;
  material: string;
  style: string;
  price: string;
  video_url: string;
  featured: boolean;
  published: boolean;
};

const empty: FormState = {
  slug: "", title: "", title_bg: "", description: "", description_bg: "",
  project_type: "single_house", area: "", floors: "", bedrooms: "", bathrooms: "",
  garages: "", material: "", style: "", price: "", video_url: "",
  featured: false, published: true,
};

function slugify(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || `project-${Date.now()}`;
}

const inputCls = "w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-foreground";
const labelCls = "eyebrow block mb-2";

export function ProjectFormModal({
  mode, open, onClose, onSaved,
}: {
  mode: Mode;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [form, setForm] = useState<FormState>(empty);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [existingPlans, setExistingPlans] = useState<string[]>([]);
  const [existingViz, setExistingViz] = useState<string[]>([]);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [planFiles, setPlanFiles] = useState<FileList | null>(null);
  const [vizFiles, setVizFiles] = useState<FileList | null>(null);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingRecord, setLoadingRecord] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null); setStatus(null);
    setCoverFile(null); setGalleryFiles(null); setPlanFiles(null); setVizFiles(null);
    if (mode.kind === "create") {
      setForm(empty);
      setExistingCover(null); setExistingGallery([]); setExistingPlans([]); setExistingViz([]);
      return;
    }
    setLoadingRecord(true);
    (async () => {
      const { data } = await supabase.from("projects").select("*").eq("id", mode.id).maybeSingle();
      if (data) {
        setForm({
          slug: data.slug ?? "",
          title: data.title ?? "",
          title_bg: data.title_bg ?? "",
          description: data.description ?? "",
          description_bg: data.description_bg ?? "",
          project_type: (data.project_type ?? "single_house") as FormState["project_type"],
          area: data.area?.toString() ?? "",
          floors: data.floors?.toString() ?? "",
          bedrooms: data.bedrooms?.toString() ?? "",
          bathrooms: data.bathrooms?.toString() ?? "",
          garages: data.garages?.toString() ?? "",
          material: data.material ?? "",
          style: data.style ?? "",
          price: data.price?.toString() ?? "",
          video_url: data.video_url ?? "",
          featured: !!data.featured,
          published: !!data.published,
        });
        setExistingCover(data.cover_image ?? null);
        setExistingGallery(data.gallery ?? []);
        setExistingPlans(data.floor_plans ?? []);
        setExistingViz(data.visualizations ?? []);
      }
      setLoadingRecord(false);
    })();
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { setError("Not signed in"); return; }
    if (!form.title.trim()) { setError("Title is required"); return; }
    setBusy(true); setError(null); setStatus("Uploading files…");
    try {
      const num = (s: string) => (s.trim() === "" ? null : Number(s));

      const newCover = coverFile ? await uploadProjectFile(coverFile, "covers") : null;
      const addGallery = galleryFiles
        ? await Promise.all(Array.from(galleryFiles).map((f) => uploadProjectFile(f, "gallery"))) : [];
      const addPlans = planFiles
        ? await Promise.all(Array.from(planFiles).map((f) => uploadProjectFile(f, "plans"))) : [];
      const addViz = vizFiles
        ? await Promise.all(Array.from(vizFiles).map((f) => uploadProjectFile(f, "viz"))) : [];

      setStatus("Saving to database…");

      const payload = {
        title: form.title,
        title_bg: form.title_bg || null,
        description: form.description || null,
        description_bg: form.description_bg || null,
        project_type: form.project_type,
        cover_image: newCover ?? existingCover,
        gallery: [...existingGallery, ...addGallery],
        floor_plans: [...existingPlans, ...addPlans],
        visualizations: [...existingViz, ...addViz],
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
      };

      if (mode.kind === "create") {
        const slug = form.slug.trim() || slugify(form.title);
        const { error: insErr } = await supabase.from("projects").insert({
          ...payload, slug, author_id: user.id,
        });
        if (insErr) throw insErr;
      } else {
        const { error: updErr } = await supabase.from("projects").update({
          ...payload, slug: form.slug.trim() || slugify(form.title),
        }).eq("id", mode.id);
        if (updErr) throw updErr;
      }

      setStatus("Saved.");
      onSaved();
      onClose();
    } catch (err) {
      setError(friendlyWriteError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-background border border-border rounded-md w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">
            {mode.kind === "create" ? t("admin.new") : t("admin.edit")}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none" aria-label="Close">×</button>
        </div>

        {loadingRecord ? (
          <div className="p-12 text-sm text-muted-foreground">Loading…</div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-8">
            <Section title="Basics">
              <Row>
                <Field label="Title (EN) *" value={form.title} onChange={(v) => upd("title", v)} required />
                <Field label="Заглавие (BG)" value={form.title_bg} onChange={(v) => upd("title_bg", v)} />
              </Row>
              <Row>
                <div>
                  <label className={labelCls}>{t("project.type")} *</label>
                  <select className={inputCls} value={form.project_type}
                    onChange={(e) => upd("project_type", e.target.value as FormState["project_type"])}>
                    <option value="single_house">{t("type.single_house")}</option>
                    <option value="complex">{t("type.complex")}</option>
                    <option value="public_building">{t("type.public_building")}</option>
                  </select>
                </div>
                <Field label="Slug (URL)" value={form.slug} onChange={(v) => upd("slug", v)}
                  placeholder="auto-generated from title" />
              </Row>
              <div>
                <label className={labelCls}>Description (EN)</label>
                <textarea rows={3} className={inputCls} value={form.description} onChange={(e) => upd("description", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Описание (BG)</label>
                <textarea rows={3} className={inputCls} value={form.description_bg} onChange={(e) => upd("description_bg", e.target.value)} />
              </div>
            </Section>

            <Section title="Specifications">
              <div className="grid gap-4 md:grid-cols-4">
                <Field label="Area (m²)" value={form.area} onChange={(v) => upd("area", v)} />
                <Field label="Floors" value={form.floors} onChange={(v) => upd("floors", v)} />
                <Field label="Bedrooms" value={form.bedrooms} onChange={(v) => upd("bedrooms", v)} />
                <Field label="Bathrooms" value={form.bathrooms} onChange={(v) => upd("bathrooms", v)} />
                <Field label="Garages" value={form.garages} onChange={(v) => upd("garages", v)} />
                <Field label="Material" value={form.material} onChange={(v) => upd("material", v)} />
                <Field label="Style" value={form.style} onChange={(v) => upd("style", v)} />
                <Field label="Price (€)" value={form.price} onChange={(v) => upd("price", v)} />
              </div>
            </Section>

            <Section title="Cover image">
              {existingCover && (
                <div className="mb-3 flex items-center gap-4">
                  <img src={existingCover} alt="" className="w-32 aspect-[4/3] object-cover border border-border" />
                  <button type="button" onClick={() => setExistingCover(null)} className="text-xs text-destructive underline">Remove</button>
                </div>
              )}
              <FileInput label="Upload cover image" onChange={(fs) => setCoverFile(fs?.[0] ?? null)} />
              {coverFile && <div className="mt-2 text-xs text-muted-foreground">Selected: {coverFile.name}</div>}
            </Section>

            <MediaSection title={t("project.gallery")} items={existingGallery}
              onRemove={(i) => setExistingGallery(existingGallery.filter((_, idx) => idx !== i))}
              onAdd={setGalleryFiles} pendingCount={galleryFiles?.length ?? 0} />
            <MediaSection title={t("project.plans")} items={existingPlans}
              onRemove={(i) => setExistingPlans(existingPlans.filter((_, idx) => idx !== i))}
              onAdd={setPlanFiles} pendingCount={planFiles?.length ?? 0} />
            <MediaSection title={t("project.viz")} items={existingViz}
              onRemove={(i) => setExistingViz(existingViz.filter((_, idx) => idx !== i))}
              onAdd={setVizFiles} pendingCount={vizFiles?.length ?? 0} />

            <Section title="Extras">
              <Field label="Video URL" value={form.video_url} onChange={(v) => upd("video_url", v)}
                placeholder="https://youtube.com/watch?v=..." />
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.published} onChange={(e) => upd("published", e.target.checked)} />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.featured} onChange={(e) => upd("featured", e.target.checked)} />
                  Featured
                </label>
              </div>
            </Section>

            {error && <div className="text-sm text-destructive border border-destructive/40 bg-destructive/5 p-3 rounded-sm">{error}</div>}
            {status && !error && <div className="text-sm text-muted-foreground">{status}</div>}

            <div className="sticky bottom-0 -mx-6 -mb-6 px-6 py-4 bg-background border-t border-border flex justify-end gap-3">
              <button type="button" onClick={onClose}
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={busy}
                className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60">
                {busy ? "Saving…" : mode.kind === "create" ? "Create project" : "Save changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <div className="eyebrow mb-3">{title}</div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}
function Field({ label, value, onChange, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input className={inputCls} value={value} required={required} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function FileInput({ label, multiple, onChange }: {
  label: string; multiple?: boolean; onChange: (fs: FileList | null) => void;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input type="file" accept="image/*" multiple={multiple} onChange={(e) => onChange(e.target.files)}
        className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-foreground file:text-background hover:file:bg-accent" />
    </div>
  );
}
function MediaSection({ title, items, onRemove, onAdd, pendingCount }: {
  title: string; items: string[]; onRemove: (i: number) => void;
  onAdd: (fs: FileList | null) => void; pendingCount: number;
}) {
  return (
    <Section title={title}>
      {items.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {items.map((url, i) => (
            <div key={url + i} className="relative group border border-border">
              <img src={url} alt="" className="w-full aspect-square object-cover" />
              <button type="button" onClick={() => onRemove(i)}
                className="absolute top-1 right-1 bg-background/95 text-destructive text-[10px] px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <FileInput label={items.length ? "Add more" : "Upload files"} multiple onChange={onAdd} />
      {pendingCount > 0 && <div className="text-xs text-muted-foreground">{pendingCount} new file(s) selected</div>}
    </Section>
  );
}
