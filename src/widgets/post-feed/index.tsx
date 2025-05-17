"use client";

import { useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { Button } from "@/shared/shadcn-ui/button";
import { PostItem } from "@/features/post-item";
import type { Post } from "@/entities/post";
import {
  openPostEditorCreate,
  openPostEditorUpdate,
} from "@/features/post-editor-modal";
import { Loader } from "@/shared/shadcn-ui/loader";

export type PostFeedProps = {
  title: string;
  posts: Post[];
  isAuthor?: boolean;
  onOpenPostDetails: (post: Post) => void;
  onRequestPosts: () => Promise<void>;
};

export function PostFeed({
  title,
  posts,
  isAuthor = false,
  onOpenPostDetails,
  onRequestPosts,
}: PostFeedProps) {
  const [isLoading, setLoading] = useState(false);

  const [onOpenPostCreator, onOpenPostEditor] = useUnit([
    openPostEditorCreate,
    openPostEditorUpdate,
  ]);

  useEffect(() => {
    if (posts.length === 0) {
      setLoading(true);
      onRequestPosts().finally(() => setLoading(false));
    }
  }, []);

  const Posts = () => {
    return posts.map((post) => (
      <PostItem
        key={post.id}
        post={post}
        onOpenPostDetails={onOpenPostDetails}
        onOpenPostEditor={onOpenPostEditor}
      />
    ));
  };

  return (
    <section className="relative w-full h-[80dvh] md:max-h-[82.5dvh] flex flex-col items-center rounded-3xl border contain-paint bg-muted">
      <HeadBar
        title={title}
        onOpenPostCreator={onOpenPostCreator}
        isAuthor={isAuthor}
      />
      <div className="w-full p-2 sm:p-3 p-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
        {isLoading ? <LoadScreen /> : <Posts />}
      </div>
      {/* <FootBar to={posts.length} /> */}
      <Gradient />
      <div className="h-4"></div>
    </section>
  );
}

function LoadScreen() {
  return (
    <div className="absolute top-0 left-0 size-full flex items-center justify-center">
      <Loader />
    </div>
  );
}

type HeadBarProps = {
  title: string;
  onOpenPostCreator?: () => void;
  isAuthor: boolean;
};

function HeadBar({ title, onOpenPostCreator, isAuthor }: HeadBarProps) {
  return (
    <header className="w-full p-4 pb-2 flex justify-between border-b">
      <span className="text-2xl">{title}</span>
      {isAuthor && <Button onClick={onOpenPostCreator}>Add post</Button>}
    </header>
  );
}

type FootBarProps = {
  from: number | string;
  to: number | string;
};

function FootBar({ from, to }: FootBarProps) {
  return (
    <footer className="px-4 py-2 absolute bottom-4 flex items-center justify-center z-10 border rounded-full bg-muted/80">
      <span className="text-xs">
        {from} - {to}
      </span>
    </footer>
  );
}

function Gradient() {
  return (
    <div className="pointer-events-none absolute top-0 left-0 size-full bg-gradient-to-b from-90% to-background"></div>
  );
}
