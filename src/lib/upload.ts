import { supabase } from "@/integrations/supabase/client";

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function uploadProjectFile(file: File, folder = "misc"): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("projects")
    .upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("projects")
    .createSignedUrl(path, ONE_YEAR);
  if (signErr) throw signErr;
  return data.signedUrl;
}
