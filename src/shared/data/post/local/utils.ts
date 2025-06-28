import type { Tables } from "@/shared/data/supabase";

export type Post = Tables<"post_view">;
export type PostId = string;

export const serializeArray = <T>(items: Array<T>): string => {
  const uniqueItems = new Set(items);
  const serialized = JSON.stringify([...uniqueItems]);

  return serialized;
};

export const deserialize = JSON.parse as unknown as <T>(
  serialized: string | null
) => T | null;
