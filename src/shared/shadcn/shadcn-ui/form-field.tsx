import {
  FormControl,
  FormDescription,
  FormField as Field,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn/shadcn-ui/form";
import { Path, useFormContext } from "react-hook-form";

type FormFieldProps<T extends Record<string, string>> = {
  name: Path<T>;
  label?: string;
  description?: string;
  showMessage?: boolean;
  render: (props: {
    field: {
      value: string;
      onChange: (value: unknown) => void;
      onBlur: () => void;
      ref: React.Ref<HTMLInputElement> | undefined;
    };
  }) => React.ReactNode;
};

export function FormField<T extends Record<string, string>>({
  name,
  label,
  description,
  render,
  className,
  showMessage = true,
}: React.ComponentProps<"div"> & FormFieldProps<T>) {
  const form = useFormContext<T>();

  return (
    <Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
