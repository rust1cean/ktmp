import type { Tables } from "@/shared/data/supabase";

export const POST_CATEGORIES = [
  "programming",
  "sport",
  "math",
  "informatics",
  "art",
  "design",
  "architecture",
  "social_science",
  "biology",
  "ecology",
  "history",
  "chemistry",
  "none",
] as const;

export type PostEntity = Tables<"post">;
export type PostDetailed = Tables<"post_view">;
export type PostCategory = (typeof POST_CATEGORIES)[number];

export type Pagination = {
  offset: number;
  limit?: number;
};

export type SortBy = {
  column: "updated_at";
  order: "asc" | "desc";
};

export {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePostById,
  deleteDraftById,
  createDraft,
  updateDraft,
  moveDraftToPosts,
  movePostToDrafts,
  GREEK_PHONE_PATTERN,
  type PostDto,
} from "./post.api";

export { favoritePost, unfavoritePost } from "./favorite.api";
