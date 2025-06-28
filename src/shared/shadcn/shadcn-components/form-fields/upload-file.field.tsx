"use client";

import { Trash2 } from "lucide-react";
import type {
  FieldValues,
  FieldPath,
  Control,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import type React from "react";
import { useRef, type ChangeEvent } from "react";

import { Field } from ".";
import { Button } from "@/shared/shadcn/shadcn-ui/button";
import { Input } from "@/shared/shadcn/shadcn-ui/input";

export function UploadFileField<T extends FieldValues>({
  name,
  control,
  label,
  className,
  onClear,
  showMessage = true,
  optional = false,
  multipleFiles = false,
}: Readonly<{
  name: FieldPath<T>;
  control: Control<T>;
  onClear: () => void;
  label?: string;
  optional?: boolean;
  showMessage?: boolean;
  multipleFiles?: boolean;
  className?: string;
}>) {
  let onChange: (props: {
    field: ControllerRenderProps<T, Path<T>>;
  }) => (event: ChangeEvent<HTMLInputElement>) => void;

  if (multipleFiles)
    onChange =
      ({ field }) =>
      (event) =>
        field.onChange(event.target.files);
  else
    onChange =
      ({ field }) =>
      (event) =>
        field.onChange(event.target.files![0]);

  const filePicker = useRef<HTMLInputElement | null>(null);

  const handleClear = () => {
    if (filePicker.current) filePicker.current.value = "";
    onClear();
  };

  return (
    <div className="flex items-end gap-2">
      <Field
        className={className}
        name={name}
        label={label}
        control={control}
        optional={optional}
        showMessage={showMessage}
        render={({ field }) => (
          <Input
            type="file"
            accept="image/*"
            className={className}
            ref={filePicker}
            id={name}
            name={name}
            placeholder={label}
            required={!optional}
            onChange={onChange({ field })}
          />
        )}
      />
      <Button
        variant="outline"
        onClick={(e) => (e.preventDefault(), handleClear())}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
