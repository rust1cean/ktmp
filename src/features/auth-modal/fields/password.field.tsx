import { z } from "zod";

import { FormField } from "@/shared/shadcn-ui/form-field";
import { Input } from "@/shared/shadcn-ui/input";

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
}: {
  name?: string;
  label?: string;
}) {
  return (
    <FormField
      name={name}
      label={label}
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
