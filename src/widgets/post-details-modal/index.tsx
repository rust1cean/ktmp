"use client";

import Link from "next/link";
import Image from "next/image";
import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import {
  MapPin,
  Box,
  UsersRound,
  Phone,
  Heart,
  Mailbox,
  Calendar,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/shadcn/shadcn-ui/dialog";
import { Loader } from "@/shared/shadcn/shadcn-ui/loader";
import { favoritePostFx, unfavoritePostFx, type Post } from "@/entities/post";
import { capitalizeFirstLetter } from "@/shared/format-string";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/shadcn/shadcn-ui/avatar";
import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { $myId } from "@/entities/auth";
import { postFavorited, postUnfavorited } from "@/entities/post/store";

export const openPostDetailsModal = createEvent<Post>();
export const closePostDetailsModal = createEvent();

const $openedPost = createStore<Post | null>(null)
  .on(openPostDetailsModal, (_, post) => post)
  .on(closePostDetailsModal, () => null)
  .on(postFavorited, (post: Post | null) =>
    // Mark as favorite
    post == null ? null : { ...post, isFavorite: true }
  )
  .on(postUnfavorited, (post: Post | null) =>
    // Unmark as favorite
    post == null ? null : { ...post, isFavorite: false }
  );

export function PostDetailsModal() {
  const [post, onClose] = useUnit([$openedPost, closePostDetailsModal]);

  return (
    <Dialog open={post != null} onOpenChange={onClose}>
      <DialogContent className="xl:min-w-[720px] max-h-[70vh] xl:max-h-[90vh] flex flex-col p-0 overflow-y-auto border-none">
        <Media url={post?.imageUrl} />
        <div className="z-20 w-full p-4 xl:p-8 flex max-xl:flex-col gap-6 xl:gap-16">
          <div className="w-full flex flex-col gap-4">
            <DialogTitle className="text-xl font-semibold wrap-anywhere">
              {post?.title}
            </DialogTitle>
            <DialogDescription className="text-md font-medium text-foreground wrap-anywhere">
              {post?.description}
            </DialogDescription>
          </div>
          <PostDetails post={post} onCloseModal={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Media({ url }: { url: string | null | undefined }) {
  const [isLoading, setLoading] = useState(true);

  return (
    url && (
      <div className="relative max-w-full h-64 xl:h-96 flex items-center justify-center">
        {isLoading && <Loader className="absolute t-0 l-0" />}
        <Image
          className="size-full object-cover select-none"
          src={url}
          alt="Image not found"
          width={768}
          height={512}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    )
  );
}

function PostDetails({
  post,
  onCloseModal,
}: {
  post?: Post | null;
  onCloseModal: () => void;
}) {
  if (!post) return;

  const onFavoritePost = async () => {
    const userId = $myId.getState();

    return favoritePostFx({ userId, post });
  };

  const onUnfavoritePost = async () => {
    const userId = $myId.getState();

    return unfavoritePostFx({ userId, postId: post.id });
  };

  const User = () => {
    const { id, name, avatarUrl } = post.author;

    return (
      <Link
        href={`/profile/${id}`}
        className="flex items-center gap-2"
        onClick={onCloseModal}
      >
        <Avatar className="size-10">
          <AvatarImage className="object-cover" src={avatarUrl} alt="Avatar" />
          <AvatarFallback>{name.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-md font-medium">{name}</span>
      </Link>
    );
  };

  const Badges = () => (
    <div className="flex flex-col gap-1">
      <Badge
        label="Category"
        text={post.category}
        icon={Box}
        iconColor="text-sky-600"
      />
      <Badge
        iconColor="text-violet-600"
        {...formatAge(post)}
        icon={UsersRound}
      />
      <Badge
        label="Phone"
        text={post.phone}
        icon={Phone}
        iconColor="text-green-600"
      />
      <Badge
        label="Address"
        text={post.address}
        icon={MapPin}
        iconColor="text-red-600"
      />
      <Badge
        label="Zip code"
        text={post.postcode}
        icon={Mailbox}
        iconColor="text-blue-600"
      />
      <Badge
        label="Updated at"
        text={post.updatedAt.toLocaleDateString()}
        icon={Calendar}
        iconColor="text-slate-600"
      />
    </div>
  );

  const Price = () =>
    post.price != null && (
      <span className="w-full p-2 leading-none border font-semibold border-foreground text-center rounded-sm">
        {post.price === 0 ? "Free" : `€${post.price}`}
      </span>
    );

  return (
    <div className="min-w-55 xl:max-w-55 flex flex-col gap-4">
      <User />
      <Badges />
      <div className="w-full sticky bottom-0 py-4 flex flex-col gap-2 bg-background">
        <Price />
        <PendingButton
          className="text-white bg-indigo-500 hover:bg-indigo-600"
          icon={<Heart strokeWidth={3} />}
          text={post.isFavorite ? "Unfavorite" : "Favorite"}
          onClick={() =>
            post.isFavorite ? onUnfavoritePost() : onFavoritePost()
          }
        />
      </div>
    </div>
  );
}

function Badge({
  icon: Icon,
  iconColor,
  label,
  text,
}: {
  label?: string;
  icon: React.FC<{ className: string; size: number }>;
  iconColor: string;
  text?: string | number;
}) {
  if (text) {
    return (
      <div className="p-1 w-full flex gap-2">
        <Icon size={18} className={twMerge("min-w-fit mt-[1px]", iconColor)} />
        <span className="w-full text-sm font-medium select-all wrap-anywhere">
          {label ? `${label}:` : ""} {capitalizeFirstLetter(text.toString())}
        </span>
      </div>
    );
  }
}

const formatAge = ({
  minAge,
  maxAge,
}: {
  minAge?: string | number;
  maxAge?: string | number;
}) => {
  if (minAge != null && maxAge != null)
    return { label: "Age", text: `${minAge}-${maxAge}` };

  if (minAge != null && maxAge == null)
    return { label: "From", text: `${minAge}` };

  if (minAge == null && maxAge != null)
    return { label: "To", text: `${maxAge}` };

  return "";
};
