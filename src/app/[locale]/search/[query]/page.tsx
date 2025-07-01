"use client";

import { useParams, useSearchParams } from "next/navigation";

import { PostFeed } from "@/widgets/post-feed";
import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $searchPosts } from "@/entities/post/store";
import { searchPostsFx } from "@/entities/post/model/post.model";
import type { PostCategory } from "@/shared/data/post/api";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const { query } = useParams<{
    query: string;
  }>();
  const t = useTranslations("SearchPage");
  const sp = useSearchParams();

  const ageFrom: string | null = sp.get("age_from");
  const category: PostCategory | null = sp.get("category") as PostCategory;

  const searchQuery = decodeURIComponent(query);

  return (
    <PostFeed
      title={t("found_by_query", { searchQuery })}
      $posts={$searchPosts}
      onRequestPosts={async (pagination: { offset: number }) =>
        searchPostsFx({
          searchQuery,
          ageFrom,
          category,
          ...pagination,
        })
      }
      onOpenPostDetails={openPostDetailsModal}
    />
  );
}
