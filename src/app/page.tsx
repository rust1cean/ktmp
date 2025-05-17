"use client";

import { useUnit } from "effector-react";

import { PostFeed } from "@/widgets/post-feed";
import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $recentlyPosts } from "@/entities/post/store/posts.store";
import { getPostsFx } from "@/entities/post/model";

export default function Home() {
  const posts = useUnit($recentlyPosts);

  return (
    <PostFeed
      title="Recently posts"
      posts={posts}
      onRequestPosts={getPostsFx}
      onOpenPostDetails={openPostDetailsModal}
    />
  );
}
