import type { Enums } from "@/shared/api/supabase";

export type Post = {
  id: string;
  title: string;
  description: string;
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
};

export type PostCategory = Enums<"categories">;
