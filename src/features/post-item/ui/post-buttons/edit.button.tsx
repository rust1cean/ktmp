import { Pencil } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { useTranslations } from "next-intl";

export type EditButtonProps = React.ComponentProps<"button"> & {
  onEdit: () => void;
};

export function EditButton({ onEdit, ...props }: EditButtonProps) {
  const t = useTranslations("Base");

  return (
    <Button
      {...props}
      className={twMerge(
        props.className,
        "border-none shrink text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 hover:bg-blue-500/20 dark:hover:bg-blue-400/20"
      )}
      onClick={onEdit}
    >
      <Pencil />
      {t("edit")}
    </Button>
  );
}
