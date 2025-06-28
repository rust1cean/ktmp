"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Checkbox } from "@/shared/shadcn/shadcn-ui/checkbox";
import { Form } from "@/shared/shadcn/shadcn-ui/form";
import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import {
  EmailField,
  emailFieldSchema,
  PasswordField,
  passwordFieldSchema,
} from "@/features/auth-modal/fields";

export const signUpFormSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export type SignUpFormProps = {
  onSubmit: (credentials: SignUpFormData) => Promise<void>;
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [isTermsAgreed, setTermsAgreed] = useState(false);

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...signUpForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <EmailField />
          <PasswordField />
        </div>
        <SignUpButton
          onSubmit={signUpForm.handleSubmit(onSubmit)}
          isDisabled={!isTermsAgreed}
        />
        <Terms onChange={setTermsAgreed} />
      </form>
    </Form>
  );
}

function Terms({ onChange }: { onChange: (isChecked: boolean) => void }) {
  return (
    <div className="mx-auto flex items-center gap-2">
      <Checkbox id="terms" onCheckedChange={onChange} />
      <Link href="/terms" target="_blank" className="leading-none text-sm">
        Accept terms and conditions
      </Link>
    </div>
  );
}

function SignUpButton({
  onSubmit,
  isDisabled,
}: {
  onSubmit: () => Promise<void>;
  isDisabled: boolean;
}) {
  return (
    <PendingButton
      className="text-white bg-green-500/70 hover:bg-green-500/80"
      text="Sign up"
      onClick={onSubmit}
      disabled={isDisabled}
    />
  );
}
