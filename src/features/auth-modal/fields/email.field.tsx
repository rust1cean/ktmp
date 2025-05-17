import { z } from "zod";

import { FormField } from "@/shared/shadcn-ui/form-field";
import { Input } from "@/shared/shadcn-ui/input";

export const emailFieldSchema = z
  .string()
  .email({ message: "Invalid e-mail address" })
  .max(50);

export function EmailField({ label }: { label?: string }) {
  return (
    <FormField
      name="email"
      label={label}
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
