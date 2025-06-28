import type {
  FieldValues,
  FieldPath,
  Control,
  ControllerRenderProps,
} from "react-hook-form";

import {
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/shared/shadcn/shadcn-ui/form";

export { InputField } from "./input.field";
export { SelectField } from "./select.field";
export { TextareaField } from "./textarea.field";
export { UploadFileField as UploadField } from "./upload-file.field";

export function Field<T extends FieldValues>({
  showMessage = true,
  name,
  control,
  label,
  description,
  className,
  optional,
  render,
}: Readonly<{
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  className?: string;
  optional?: boolean;
  showMessage?: boolean;
  render: (props: {
    field: ControllerRenderProps<T, FieldPath<T>>;
  }) => React.ReactNode;
}>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="ml-2 flex gap-1" htmlFor={name}>
              {label}
              {optional && (
                <span className="text-2xs font-thin">(optional)</span>
              )}
            </FormLabel>
          )}
          <FormControl>{render({ field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
