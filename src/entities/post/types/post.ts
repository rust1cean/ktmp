import type { PostCategory } from "@/shared/data/post/api";

export type Post = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  phone: string;
  minAge: number;
  maxAge: number;
  updatedAt: Date;
  price?: number;
  address?: string;
  postcode?: number;
  category?: PostCategory;
  isFavorite: boolean;
};
