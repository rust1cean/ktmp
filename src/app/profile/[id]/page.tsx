"use client";

import { useUnit } from "effector-react";

import { PostFeed } from "@/widgets/post-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn-ui/avatar";
import { EditPostModal } from "@/features/post-editor-modal";
import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $recentlyPosts } from "@/entities/post/store";
import { getPostsFx } from "@/entities/post/model";

export default function Profile() {
  const posts = useUnit($recentlyPosts);

  return (
    <>
      <div className="flex flex-col gap-8">
        <User />
        <PostFeed
          title="Active posts"
          posts={posts}
          onRequestPosts={getPostsFx}
          isAuthor={true}
          onOpenPostDetails={openPostDetailsModal}
        />
      </div>
      <EditPostModal />
    </>
  );
}

function User() {
  return (
    <div className="w-full p-4 flex items-center gap-4 rounded-3xl border bg-muted">
      <Avatar className="size-32">
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <span className="text-2xl">User</span>
    </div>
  );
}
