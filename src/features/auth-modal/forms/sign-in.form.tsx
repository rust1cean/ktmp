"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { Form } from "@/shared/shadcn/shadcn-ui/form";
import {
  EmailField,
  PasswordField,
  passwordFieldSchema,
} from "@/features/auth-modal/fields";
import { emailFieldSchema } from "@/features/auth-modal/fields";
import { useTranslations } from "next-intl";

export const signInFormSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

export type SignInFormData = z.infer<typeof signInFormSchema>;

export type SignInFormProps = {
  onSubmit: (credentials: SignInFormData) => Promise<void>;
};

export function SignInForm({ onSubmit }: SignInFormProps) {
  const t = useTranslations("Base");

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...signInForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <EmailField showMessage={false} />
          <PasswordField showMessage={false} />
        </div>
        <PendingButton
          className="text-white bg-blue-500/70 hover:bg-blue-500/80"
          type="submit"
          text={t("sign_in")}
          onClick={signInForm.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
