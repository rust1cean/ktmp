"use client";

import { useParams } from "next/navigation";

import { PostFeed } from "@/widgets/post-feed";
import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $searchPosts } from "@/entities/post/store";
import { searchPostsFx } from "@/entities/post/model/post.model";

export default function SearchPage() {
  let { query } = useParams<{ query: string }>();
  query = decodeURIComponent(query);

  return (
    <PostFeed
      title={`Found by query: '${query}'`}
      $posts={$searchPosts}
      onRequestPosts={async (pagination: { offset: number }) =>
        searchPostsFx({ searchQuery: query, ...pagination })
      }
      onOpenPostDetails={openPostDetailsModal}
    />
  );
}
