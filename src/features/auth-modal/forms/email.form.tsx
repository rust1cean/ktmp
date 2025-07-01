"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { Form } from "@/shared/shadcn/shadcn-ui/form";
import { EmailField, emailFieldSchema } from "@/features/auth-modal/fields";
import { useTranslations } from "next-intl";

export const enterEmailSchema = z.object({
  email: emailFieldSchema,
});

export type EmailFormData = z.infer<typeof enterEmailSchema>;

export type EmailFormProps = {
  onSubmit: (formData: { email: string }) => Promise<void>;
};

export function EmailForm({ onSubmit }: EmailFormProps) {
  const t = useTranslations("Base");

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(enterEmailSchema),
    defaultValues: { email: "" },
  });

  return (
    <Form {...emailForm}>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <EmailField />
        <PendingButton
          text={t("restore_access")}
          onClick={emailForm.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
