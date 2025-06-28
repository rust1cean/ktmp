import { supabase } from "@/shared/data/supabase";
import type { PostId } from "../local/utils";

export const syncFavorites = async ({
  userId,
  favorites,
}: {
  userId: string;
  favorites: Array<PostId>;
}): Promise<Array<PostId>> => {
  if (favorites.length === 0) return [];

  const ids = favorites.map((id) => ({ post_id: id, profile_id: userId }));
  const { data, error } = await supabase
    .from("post_favorite")
    .upsert(ids, { onConflict: "post_id, profile_id" })
    .select();

  if (error) throw error;

  return data.map((item) => item.post_id) ?? [];
};

export const favoritePost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: PostId;
}) => {
  const { error } = await supabase
    .from("post_favorite")
    .upsert({ profile_id: userId, post_id: postId });

  if (error) throw error;
};

export const unfavoritePost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: PostId;
}) => {
  const { error } = await supabase
    .from("post_favorite")
    .delete()
    .eq("profile_id", userId)
    .eq("post_id", postId);

  if (error) throw error;
};
