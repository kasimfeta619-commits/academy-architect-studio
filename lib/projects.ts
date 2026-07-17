import { supabase } from "@/integrations/supabase/client";

type ProjectRow = {
  slug: string;
  title: string;
  title_bg: string | null;
  description: string | null;
  description_bg: string | null;
  cover_image: string | null;
  gallery: string[];
  floor_plans: string[];
  visualizations: string[];
  video_url: string | null;
  area: number | null;
  floors: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  garages: number | null;
  material: string | null;
  style: string | null;
  price: number | null;
};

export async function duplicateProject(id: string, authorId: string | undefined): Promise<string> {
  const { data: src, error: readErr } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (readErr) throw readErr;
  if (!src) throw new Error("Source project not found");

  const row = src as ProjectRow;
  const suffix = Date.now().toString(36).slice(-4);
  const newSlug = `${row.slug}-copy-${suffix}`;
  const newTitle = `${row.title} (copy)`;

  const { data: created, error: insErr } = await supabase
    .from("projects")
    .insert({
      slug: newSlug,
      title: newTitle,
      title_bg: row.title_bg ? `${row.title_bg} (копие)` : null,
      description: row.description,
      description_bg: row.description_bg,
      cover_image: row.cover_image,
      gallery: row.gallery ?? [],
      floor_plans: row.floor_plans ?? [],
      visualizations: row.visualizations ?? [],
      video_url: row.video_url,
      area: row.area,
      floors: row.floors,
      bedrooms: row.bedrooms,
      bathrooms: row.bathrooms,
      garages: row.garages,
      material: row.material,
      style: row.style,
      price: row.price,
      featured: false,
      published: false,
      author_id: authorId ?? null,
    })
    .select("id")
    .maybeSingle();

  if (insErr) throw insErr;
  if (!created?.id) throw new Error("Duplicate failed: no id returned");
  return created.id;
}

export function friendlyWriteError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/row-level security|permission denied|policy/i.test(msg)) {
    return "Could not save — please sign in again and retry.";
  }
  return msg;
}
