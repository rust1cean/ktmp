"use client";

import { useTranslations } from "next-intl";

import { PostFeed } from "@/widgets/post-feed";
import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $generalPosts, getGeneralPostsFx } from "@/entities/post";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <PostFeed
      title={t("post_feed_title")}
      $posts={$generalPosts}
      onRequestPosts={getGeneralPostsFx}
      onOpenPostDetails={openPostDetailsModal}
    />
  );
}
