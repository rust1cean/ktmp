import { z } from "zod";

import { FormField } from "@/shared/shadcn/shadcn-ui/form-field";
import { Input } from "@/shared/shadcn/shadcn-ui/input";

export const emailFieldSchema = z
  .string()
  .email({ message: "Invalid e-mail address" })
  .max(50);

export function EmailField({
  label,
  showMessage = true,
}: {
  label?: string;
  showMessage?: boolean;
}) {
  return (
    <FormField
      name="email"
      label={label}
      showMessage={showMessage}
      render={({ field }) => (
        <Input
          type="email"
          placeholder="E-mail"
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      )}
    />
  );
}
