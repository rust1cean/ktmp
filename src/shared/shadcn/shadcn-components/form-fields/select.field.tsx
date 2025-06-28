import type { FieldValues, FieldPath, Control } from "react-hook-form";

import { Field } from ".";
import { FormControl } from "@/shared/shadcn/shadcn-ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/shadcn-ui/select";

export function SelectField<T extends FieldValues>({
  className,
  name,
  variants,
  control,
  label,
  optional = false,
  showMessage = true,
}: Readonly<{
  name: FieldPath<T>;
  variants: Array<{ value: string; label: string }>;
  control: Control<T>;
  className?: string;
  label?: string;
  optional?: boolean;
  showMessage?: boolean;
}>) {
  const Options = () =>
    variants.map(({ value, label }) => (
      <SelectItem key={value} value={value}>
        {label}
      </SelectItem>
    ));

  return (
    <Field
      name={name}
      label={label}
      control={control}
      optional={optional}
      showMessage={showMessage}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className={className}>
              <SelectValue placeholder={label} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <Options />
          </SelectContent>
        </Select>
      )}
    />
  );
}
