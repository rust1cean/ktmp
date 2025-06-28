"use client";

import { useEffect, useState } from "react";
import { useList, useUnit } from "effector-react";
import { InView } from "react-intersection-observer";
import type { Store } from "effector";

import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { Loader } from "@/shared/shadcn/shadcn-ui/loader";
import { PostItem } from "@/features/post-item";
import { $myId } from "@/entities/auth";
import type { Post } from "@/entities/post";

export type PostFeedProps = PostFeedHeadBarProps & PostFeedContentProps;

type PostFeedHeadBarProps = {
  title: string;
  showAddPostButton?: boolean;
  onOpenPostCreator?: () => void;
};

type PostFeedContentProps = {
  $posts: Store<Post[]>;
  isDraft?: boolean;
  onOpenPostDetails: () => void;
  onOpenPostCreator?: () => void;
  onOpenPostEditor?: (post: Post) => void;
  onRequestPosts: ({ offset }: { offset: number }) => Promise<Post[]>;
  showFavoriteButtons?: boolean;
  showEditButtons?: boolean;
  showDeleteButtons?: boolean;
  showToggleDraftButton?: boolean;
};

type RequestStatus = "requesting" | "pending" | "idle";

export function PostFeed({
  title,
  $posts,
  isDraft = false,
  showAddPostButton = false,
  showFavoriteButtons = true,
  showEditButtons = false,
  showDeleteButtons = false,
  showToggleDraftButton = false,
  onOpenPostDetails,
  onOpenPostCreator,
  onOpenPostEditor,
  onRequestPosts,
}: PostFeedProps) {
  const [requestStatus, setStatus] = useState<RequestStatus>("idle");

  const $postsLen = $posts.map((posts) => posts.length);
  const fetchOffset = useUnit($postsLen);

  const requestPosts = (inView: boolean) => {
    if (inView && requestStatus === "idle") setStatus("requesting");
  };

  useEffect(() => {
    if (requestStatus === "requesting") {
      setStatus("pending");
      onRequestPosts({ offset: fetchOffset }).finally(() => setStatus("idle"));
    }
  }, [fetchOffset, onRequestPosts, requestStatus]);

  const LoadScreen = () =>
    requestStatus === "pending" && (
      <div className="absolute pointer-events-none top-0 left-0 z-20 size-full flex items-center justify-center bg-muted/40">
        <Loader />
      </div>
    );

  const Posts = useList($posts, (post) => (
    <PostItem
      post={post}
      isDraft={isDraft}
      getUserId={$myId.getState}
      onOpenPostDetails={onOpenPostDetails}
      onOpenPostEditor={onOpenPostEditor}
      showFavoriteButton={showFavoriteButtons}
      showEditButton={showEditButtons}
      showDeleteButton={showDeleteButtons}
      showToggleDraftButton={showToggleDraftButton}
    />
  ));

  return (
    <div className="relative w-full h-[80dvh] md:max-h-[82.5dvh] flex flex-col items-center rounded-3xl border contain-paint bg-muted">
      <HeadBar
        title={title}
        onOpenPostCreator={onOpenPostCreator}
        showAddPostButton={showAddPostButton}
      />
      <div className="overflow-y-auto w-full p-2 sm:p-3 p-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <LoadScreen />
        {Posts}
        <InView className="h-4" onChange={requestPosts} />
      </div>
      <Gradient />
    </div>
  );
}

function HeadBar({
  title,
  onOpenPostCreator,
  showAddPostButton,
}: PostFeedHeadBarProps) {
  const AddPostButton = () => {
    if (showAddPostButton)
      return <Button onClick={onOpenPostCreator}>Add post</Button>;
  };

  return (
    <header className="w-full p-4 pb-2 flex justify-between border-b">
      <span className="text-2xl">{title}</span>
      <AddPostButton />
    </header>
  );
}

function Gradient() {
  return (
    <div className="pointer-events-none absolute top-0 left-0 size-full bg-gradient-to-b from-90% to-background" />
  );
}
