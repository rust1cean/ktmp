"use client";

import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { MapPin, Box, UsersRound, Phone, Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/shadcn-ui/dialog";
import { Loader } from "@/shared/shadcn-ui/loader";
import type { Post } from "@/entities/post";
import { capitalizeFirstLetter } from "@/shared/format-string";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn-ui/avatar";
import { PendingButton } from "@/shared/shadcn-ui/button";

const $openedPost = createStore<Post | null>(null);

export const openPostDetailsModal = createEvent<Post>();
export const closePostDetailsModal = createEvent();

$openedPost.on(openPostDetailsModal, (_, post) => post);
$openedPost.on(closePostDetailsModal, () => null);

export function PostDetailsModal() {
  const [post, onClose] = useUnit([$openedPost, closePostDetailsModal]);

  return (
    <Dialog open={post != null} onOpenChange={onClose}>
      <DialogContent className="xl:min-w-[720px] max-h-[85vh] p-0 overflow-y-auto border-none">
        <Media />
        <div className="w-full p-4 xl:p-12 flex max-xl:flex-col gap-6 xl:gap-16">
          <div className="w-full flex flex-col gap-4">
            <DialogTitle className="text-xl font-semibold">
              {post?.title}
            </DialogTitle>
            <DialogDescription className="text-md font-medium text-foreground">
              {post?.description}
            </DialogDescription>
          </div>
          <Details {...post} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Media() {
  return (
    <div className="relative w-full h-64 xl:h-80 flex items-center justify-center">
      <Loader />
    </div>
  );
}

function Details({
  category,
  address,
  phone,
  minAge,
  maxAge,
  price,
}: {
  category?: string;
  address?: string;
  phone?: string;
  price?: string | number;
  minAge?: string | number;
  maxAge?: string | number;
}) {
  return (
    <div className="min-w-55 xl:max-w-55 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span className="text-md font-medium">Steve Haisenberg</span>
      </div>
      <div className="flex flex-col gap-1">
        <Badge text={category} icon={Box} iconColor="text-sky-600" />
        <Badge
          iconColor="text-violet-600"
          text={formatAge({ minAge, maxAge })}
          icon={UsersRound}
        />
        <Badge text={phone} icon={Phone} iconColor="text-green-600" />
        <Badge text={address} icon={MapPin} iconColor="text-red-600" />
      </div>

      <div className="w-full sticky bottom-0 py-4 flex flex-col gap-2 bg-background">
        {price != null && (
          <span className="w-full p-2 leading-none border font-semibold border-foreground text-center rounded-sm">
            €{price}
          </span>
        )}
        <PendingButton
          className="text-white bg-indigo-500 hover:bg-indigo-600"
          icon={<Heart strokeWidth={3} />}
          text="Add to favorites"
          onClick={async () => console.log("ok")}
        />
      </div>
    </div>
  );
}

function Badge({
  icon: Icon,
  iconColor,
  text,
}: {
  icon: React.FC<{ className: string; size: number }>;
  iconColor: string;
  text?: string;
}) {
  if (text) {
    return (
      <div className="p-1 w-full flex gap-2">
        <Icon size={18} className={twMerge("mt-[1px]", iconColor)} />
        <span className="w-full text-sm font-medium select-all">
          {capitalizeFirstLetter(text)}
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
  if (minAge != null && maxAge != null) return `Age: ${minAge}-${maxAge}`;
  if (minAge != null && maxAge == null) return `From ${minAge}`;
  if (minAge == null && maxAge != null) return `To ${maxAge}`;
  return "";
};
