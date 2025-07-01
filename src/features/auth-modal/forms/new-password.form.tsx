"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { Form } from "@/shared/shadcn/shadcn-ui/form";
import {
  PasswordField,
  passwordFieldSchema,
} from "@/features/auth-modal/fields";
import { useTranslations } from "next-intl";

export const newPasswordSchema = z
  .object({
    password: passwordFieldSchema,
    confirmPassword: passwordFieldSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password confirmation must be identical to the password",
    path: ["confirmPassword"],
  });

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export type NewPasswordFormProps = {
  onSubmit: (formData: { password: string }) => Promise<void>;
};

export function NewPasswordForm({ onSubmit }: NewPasswordFormProps) {
  const t = useTranslations("Base");

  const EmailForm = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <Form {...EmailForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <PasswordField name="password" label={t("new_password")} />
        <PasswordField
          name="confirmPassword"
          label={t("confirm_new_password")}
        />
        <PendingButton
          text={t("set_password")}
          onClick={EmailForm.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
