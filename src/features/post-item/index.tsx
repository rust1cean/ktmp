"use client";

import Image from "next/image";
import { useState } from "react";

import { Loader } from "@/shared/shadcn/shadcn-ui/loader";
import { PostBadges, PostButtons } from "./ui";
import type { PostButtonVisibilityProps } from "./ui";
import type { Post } from "@/entities/post";

export type { PostButtonVisibilityProps } from "./ui";

export type PostItemProps = {
  post: Post;
  isDraft: boolean;
  getUserId: () => string | undefined;
  onOpenPostDetails: (post: Post) => void;
  onOpenPostEditor?: (post: Post) => void;
} & Partial<PostButtonVisibilityProps>;

export const PostItem = ({
  post,
  getUserId,
  onOpenPostDetails,
  onOpenPostEditor,
  showFavoriteButton = true,
  showEditButton = false,
  showDeleteButton = false,
  showToggleDraftButton = false,
  isDraft,
}: PostItemProps) => {
  const handleOpenPostDetails = () => onOpenPostDetails(post);
  const handleOpenPostEditor = () => onOpenPostEditor?.(post);

  return (
    <div className="w-full flex flex-col gap-4 rounded-xl contain-paint bg-card">
      <PostImage
        url={post.imageUrl}
        onOpenPostDetails={handleOpenPostDetails}
      />
      <div className="h-full flex flex-col gap-4 px-2 pb-3">
        <div className="px-1 h-full flex flex-col gap-2">
          <PostTitle text={post.title} />
          <PostDescription text={post.description} />
          <PostBadges {...post} />
        </div>
        <PostButtons
          getUserId={getUserId}
          post={post}
          isDraft={isDraft}
          onEdit={handleOpenPostEditor}
          showFavoriteButton={showFavoriteButton}
          showEditButton={showEditButton}
          showDeleteButton={showDeleteButton}
          showToggleDraftButton={showToggleDraftButton}
        />
      </div>
    </div>
  );
};

function PostImage({
  url,
  onOpenPostDetails,
}: {
  url: string | null;
  onOpenPostDetails: () => void;
}) {
  const [isLoading, setLoading] = useState(true);

  const Content = () =>
    url && (
      <>
        {isLoading && <Loader className="absolute t-0 l-0" />}
        <Image
          className="size-full object-cover select-none"
          src={url}
          alt="Image not found"
          width={360}
          height={240}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </>
    );

  return (
    <button
      className="relative hover:brightness-90 cursor-zoom-in w-full min-h-[25vh] md:min-h-[16vh] max-h-[25vh] md:max-h-[16vh] flex items-center justify-center rounded-xl bg-background/20"
      onClick={onOpenPostDetails}
    >
      <Content />
    </button>
  );
}

function PostTitle({ text }: { text: string }) {
  return <span className="text-lg truncate leading-none">{text}</span>;
}

function PostDescription({ text }: { text: string }) {
  return <span className="text-sm line-clamp-3">{text}</span>;
}
