import { Book, BookDashed } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { useTranslations } from "next-intl";

export type ToggleDraftButtonProps = React.ComponentProps<"button"> & {
  isDraft: boolean;
  onToDrafts: () => Promise<void>;
  onToPosts: () => Promise<void>;
};

export function ToggleDraftButton({
  isDraft,
  onToDrafts,
  onToPosts,
  ...props
}: ToggleDraftButtonProps) {
  const t = useTranslations("Base");

  const toPostsStyles =
    "border-none text-yellow-500 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-400/10 hover:bg-yellow-500/20 dark:hover:bg-yellow-400/20";

  const toDraftsStyles =
    "border-none text-violet-500 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-400/10 hover:bg-violet-500/20 dark:hover:bg-violet-400/20";

  return (
    <PendingButton
      {...props}
      className={twMerge(
        props.className,
        isDraft ? toPostsStyles : toDraftsStyles
      )}
      text={isDraft ? t("to_posts") : t("to_drafts")}
      icon={isDraft ? <Book /> : <BookDashed />}
      onClick={() => (isDraft ? onToPosts() : onToDrafts())}
    />
  );
}
