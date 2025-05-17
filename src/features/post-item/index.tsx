"use client";

// import Image from "next/image";

import { Loader } from "@/shared/shadcn-ui/loader";
import { PostBadges, AuthorPostButtons, UserPostButtons } from "./components";
import type { Post } from "@/entities/post";

export type PostItemProps = {
  post: Post;
  isAuthor: boolean;
  onOpenPostDetails: (post: Post) => void;
  onOpenPostEditor?: (post: Post) => void;
  onFavorite: (postId: Post["id"]) => Promise<void>;
  onDelete?: (postId: Post["id"]) => Promise<void>;
};

export function PostItem({
  post,
  isAuthor,
  onOpenPostDetails,
  onFavorite,
  onOpenPostEditor,
  onDelete,
}: PostItemProps) {
  const handleOpen = () => onOpenPostDetails(post);
  const handleFavorite = () => onFavorite(post.id);
  const handleEdit = () => onOpenPostEditor?.(post);
  const handleDelete = () => onDelete!(post.id);

  return (
    <div className="w-full flex flex-col px-2 pt-3 pb-3 gap-4 rounded-xl contain-paint bg-card">
      <PostImage onOpenPostDetails={handleOpen} />
      <div className="px-1 h-full flex flex-col gap-2">
        <PostTitle text={post.title} />
        <PostDescription text={post.description} />
        <PostBadges {...post} />
      </div>
      <PostButtons
        isAuthor={isAuthor}
        onFavorite={handleFavorite}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

function PostImage({ onOpenPostDetails }: { onOpenPostDetails: () => void }) {
  return (
    <button
      className="w-full min-h-[25vh] md:min-h-[16vh] flex items-center justify-center rounded-xl bg-background/20"
      onClick={onOpenPostDetails}
    >
      <Loader />
      {/* <Image
  src={"https://github.com/shadcn.png"}
  alt={"Post image"}
  fill={true}
/> */}
    </button>
  );
}

function PostTitle({ text }: { text: string }) {
  return <span className="text-lg truncate leading-none">{text}</span>;
}

function PostDescription({ text }: { text: string }) {
  return <span className="text-sm line-clamp-3">{text}</span>;
}

function PostButtons({
  isAuthor,
  onFavorite,
  onEdit,
  onDelete,
}: {
  isAuthor: boolean;
  onFavorite: () => Promise<void>;
  onEdit?: () => void;
  onDelete?: () => Promise<void>;
}) {
  if (isAuthor && onEdit && onDelete) {
    return (
      <AuthorPostButtons
        onFavorite={onFavorite}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  return <UserPostButtons onFavorite={onFavorite} />;
}
