import { z } from "zod/v4";

import { FormField } from "@/shared/shadcn/shadcn-ui/form-field";
import { Input } from "@/shared/shadcn/shadcn-ui/input";

export const MIN_PASSWORD_LENGTH: number = 8;

export const passwordFieldSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, {
    message: `Passwword must contain at least ${MIN_PASSWORD_LENGTH} characters`,
  })
  .max(50);

export function PasswordField({
  name = "password",
  label,
  showMessage = true,
}: {
  name?: string;
  label?: string;
  showMessage?: boolean;
}) {
  return (
    <FormField
      name={name}
      label={label}
      showMessage={showMessage}
      render={({ field }) => (
        <Input
          type="password"
          placeholder="Password"
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      )}
    />
  );
}
