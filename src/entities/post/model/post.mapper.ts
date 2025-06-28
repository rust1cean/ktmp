import type { Tables } from "@/shared/data/supabase";
import type { Post } from "../types";
import type { PostCategory } from "@/shared/data/post/api";

export const postDtoToPostModel = (post: Tables<"post_view">): Post => ({
  id: post.id!,
  title: post.title!,
  description: post.description!,
  author: {
    id: post.author!,
    name: post.author_name!,
    avatarUrl: post.avatar_path!,
  },
  phone: post.phone!,
  minAge: post.min_age ?? 0,
  maxAge: post.max_age!,
  updatedAt: new Date(post.updated_at!),
  price: post.price!,
  address: post.address!,
  postcode: post.postcode!,
  category: (post.category?.toLowerCase() === "none"
    ? null
    : post.category) as PostCategory,
  isFavorite: post.is_favorited ?? false,
  imageUrl: post.image_path,
});
