import { fetchPosts } from "@/shared/api/supabase/post";
import { postsFetched } from "@/entities/post/store";

export const getPostsFx = async () => {
  const posts = await fetchPosts({
    pagination: { offset: 0, limit: 16 },
    sortBy: { column: "updated_at", order: "asc" },
  });

  postsFetched(posts);
};
