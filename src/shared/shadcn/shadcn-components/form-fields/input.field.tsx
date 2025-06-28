"use client";

import type {
  FieldValues,
  FieldPath,
  Control,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import { type ChangeEvent, type HTMLInputTypeAttribute } from "react";

import { Field } from ".";
import { Input } from "@/shared/shadcn/shadcn-ui/input";

export function InputField<T extends FieldValues>({
  name,
  control,
  label,
  description,
  className,
  type = "text",
  optional = false,
  showMessage = true,
}: Readonly<{
  name: FieldPath<T>;
  control: Control<T>;
  type?: Omit<HTMLInputTypeAttribute, "file">;
  label?: string;
  description?: string;
  className?: string;
  optional?: boolean;
  showMessage?: boolean;
}>) {
  let onChange: (props: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => (event: ChangeEvent<HTMLInputElement>) => void =
    ({ field }) =>
    (event) =>
      field.onChange(event.target.value);

  if (type === "number") {
    onChange =
      ({ field }) =>
      (event) => {
        const value = event.target.value;

        if (value.match(/^(\d)*$/)) {
          field.onChange(Number(value));
        } else {
          event.target.value = field.value ?? "";
        }
      };
  }

  return (
    <Field
      className={className}
      name={name}
      label={label}
      control={control}
      optional={optional}
      showMessage={showMessage}
      description={description}
      render={({ field }) => (
        <Input
          id={name}
          placeholder={label}
          required={!optional}
          onChange={onChange({ field })}
          defaultValue={field.value ?? ""}
        />
      )}
    />
  );
}
