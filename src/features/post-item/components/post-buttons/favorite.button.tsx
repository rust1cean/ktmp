import { Heart } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { PendingButton } from "@/shared/shadcn-ui/button";

export type FavoriteButtonProps = React.ComponentProps<"button"> & {
  onFavorite: () => Promise<void>;
};

export function FavoriteButton({ onFavorite, ...props }: FavoriteButtonProps) {
  return (
    <PendingButton
      {...props}
      className={twMerge(
        props.className,
        "border-none text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-400/10 hover:bg-indigo-500/20 dark:hover:bg-indigo-400/20"
      )}
      text="Favorite"
      icon={<Heart />}
      onClick={onFavorite}
    />
  );
}
