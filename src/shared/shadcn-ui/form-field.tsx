import {
  FormControl,
  FormDescription,
  FormField as Field,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn-ui/form";
import { Path, useFormContext } from "react-hook-form";

type FormFieldProps<T extends Record<string, any>> = {
  name: Path<T>;
  label?: string;
  description?: string;
  render: (props: {
    field: {
      value: any;
      onChange: (value: any) => void;
      onBlur: () => void;
      ref: React.Ref<any>;
    };
  }) => React.ReactNode;
};

export function FormField<T extends Record<string, any>>({
  name,
  label,
  description,
  render,
}: FormFieldProps<T>) {
  const form = useFormContext<T>();

  return (
    <Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
