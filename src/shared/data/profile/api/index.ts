import { supabase } from "@/shared/data/supabase";

export const getProfile = async (profileId: string) => {
  const { data, error } = await supabase
    .from("user_profile_view")
    .select()
    .eq("id", profileId)
    .maybeSingle();

  // Exchange relative avatar path to URL
  if (data?.image_path) {
    data.image_path = supabase.storage
      .from("profile_avatar")
      .getPublicUrl(data.image_path).data.publicUrl;
  }

  return { data, error };
};

export const becomeAuthor = async (profileId: string) => {
  const { error } = await supabase
    .from("profile")
    .update({ role: "author" })
    .eq("id", profileId);

  return { error };
};
