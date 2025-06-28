"use client";

import { PostFeed } from "@/widgets/post-feed";
import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $generalPosts, getGeneralPostsFx } from "@/entities/post";

export default function HomePage() {
  return (
    <PostFeed
      title="Active posts"
      $posts={$generalPosts}
      onRequestPosts={getGeneralPostsFx}
      onOpenPostDetails={openPostDetailsModal}
    />
  );
}
