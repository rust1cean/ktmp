import type { FieldValues, FieldPath, Control } from "react-hook-form";

import { Field } from ".";
import { Textarea } from "@/shared/shadcn/shadcn-ui/textarea";

export function TextareaField<T extends FieldValues>({
  name,
  control,
  label,
  description,
  className,
  optional = false,
  showMessage = true,
}: Readonly<{
  name: FieldPath<T>;
  control: Control<T>;
  type?: string;
  label?: string;
  description?: string;
  className?: string;
  optional?: boolean;
  showMessage?: boolean;
}>) {
  return (
    <Field
      className={className}
      name={name}
      label={label}
      description={description}
      optional={optional}
      showMessage={showMessage}
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          value={field.value ?? ""}
          required={optional}
          placeholder={label}
        >
          {label}
        </Textarea>
      )}
    />
  );
}
