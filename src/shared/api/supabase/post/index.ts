import { supabase } from "@/shared/api/supabase";
import type { Post, PostCategory } from "@/entities/post";

const MAX_POSTS_PER_REQUEST: number = 30;

export type Pagination = {
  offset: number;
  limit?: number;
};

export type SortBy = {
  column: "updated_at";
  order: "asc" | "desc";
};

export type Filters = {
  query?: string;
  categories?: PostCategory[];
  minAge?: number;
  maxAge?: number;
};

export const fetchPosts = async ({
  pagination: { offset, limit },
  sortBy: { column, order },
  filters: { query, categories, minAge, maxAge } = {},
}: {
  pagination: Pagination;
  sortBy: SortBy;
  filters?: Filters;
}): Promise<Post[]> => {
  const q = supabase.from("post_view").select();

  if (query) q.ilike("title", "%" + query + "%");
  if (categories) q.in("category", categories);
  if (minAge) q.gte("min_age", minAge);
  if (maxAge) q.lte("max_age", maxAge);

  const { data, error } = await q
    .order(column, { ascending: order === "asc" })
    .range(offset, limit ?? MAX_POSTS_PER_REQUEST);

  if (error) throw error;

  return data;
};

export const fetchPostById = async (postId: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("post_view")
    .select()
    .eq("id", postId)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const createPost = async ({}): Promise<void> => {
  // const { error } = await supabase.from('post')
  //   .upsert()
};

export const updatePost = async ({}): Promise<void> => {};

export const deletePost = async ({}): Promise<void> => {};
