import { Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";

export type FavoriteButtonProps = React.ComponentProps<"button"> & {
  isFavorite: boolean;
  onFavorite: () => Promise<void>;
  onUnfavorite: () => Promise<void>;
};

export function FavoriteButton({
  isFavorite,
  onFavorite,
  onUnfavorite,
  ...props
}: FavoriteButtonProps) {
  return (
    <PendingButton
      {...props}
      className={twMerge(
        props.className,
        "border-none text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-400/10 hover:bg-indigo-500/20 dark:hover:bg-indigo-400/20"
      )}
      text={isFavorite ? "Unfavorite" : "Favorite"}
      icon={<Heart />}
      onClick={() => (isFavorite ? onUnfavorite() : onFavorite())}
    />
  );
}
