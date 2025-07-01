import { Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { useTranslations } from "next-intl";

export type DeleteButtonProps = React.ComponentProps<"button"> & {
  onDelete: () => Promise<void>;
};

export function DeleteButton({ onDelete, ...props }: DeleteButtonProps) {
  const t = useTranslations("Base");

  return (
    <PendingButton
      {...props}
      className={twMerge(
        props.className,
        "w-full border-none shrink text-red-500 dark:text-red-400 bg-red-500/10 dark:bg-red-400/10 hover:bg-red-500/20 dark:hover:bg-red-400/20"
      )}
      text={t("delete")}
      icon={<Trash2 />}
      onClick={onDelete}
    />
  );
}
