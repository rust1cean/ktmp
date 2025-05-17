"use client";

import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/shared/shadcn-ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/shared/shadcn-ui/dialog";
import { Input } from "@/shared/shadcn-ui/input";
import { Label } from "@/shared/shadcn-ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn-ui/select";
import { Textarea } from "@/shared/shadcn-ui/textarea";
import type { Post } from "@/entities/post";

const $isPostEditorVisible = createStore(false);
const $editablePost = createStore<Post | null>(null);

export const openPostEditorCreate = createEvent();
export const openPostEditorUpdate = createEvent<Post>();
export const closePostEditor = createEvent();

$isPostEditorVisible.on(
  [openPostEditorCreate, openPostEditorUpdate],
  () => true
);
$isPostEditorVisible.on(closePostEditor, () => false);

$editablePost.on([openPostEditorCreate, closePostEditor], () => null);
$editablePost.on(openPostEditorUpdate, (_, editablePost) => editablePost);

export function EditPostModal() {
  const [isVisible, onClose] = useUnit([$isPostEditorVisible, closePostEditor]);

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] flex flex-col gap-8">
        <DialogTitle>Post editor</DialogTitle>
        <form className="flex flex-col gap-4 overflow-y-auto">
          <UploadField
            id="post-image"
            label="Upload post image"
            optional={true}
          />
          <TextField type="text" id="title" label="Title" />
          <TextField type="text" id="address" label="Address" />
          <TextField type="phone" id="phone" label="Phone" />
          <SelectField
            id="category"
            label="Category"
            variants={[{ label: "Chemistry", value: "chemistry" }]}
          />
          <AgeBounds />
          <TextField type="number" id="price" label="Price" optional={true} />
          <TextareaField id="description" label="Description" optional={true} />
        </form>
        <FootBar />
      </DialogContent>
    </Dialog>
  );
}

function AgeBounds() {
  return (
    <div className="flex gap-8 justify-between">
      <TextField
        className="w-full"
        type="number"
        id="min-age"
        label="Min age"
      />
      <TextField
        className="w-full"
        type="number"
        id="max-age"
        label="Max age"
      />
    </div>
  );
}

function FootBar() {
  return (
    <div className="flex gap-2 justify-end">
      <Button variant="ghost">To drafts</Button>
      <Button>Add post</Button>
    </div>
  );
}

function UploadField({
  id,
  label,
  optional = false,
}: Readonly<{ id: string; label: string; optional?: boolean }>) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="ml-2 flex gap-1" htmlFor={id}>
        {label}
        {optional && <span className="text-2xs font-thin">(optional)</span>}
      </Label>
      <div className="flex gap-2">
        <Input type="file" id={id} placeholder={label} />
        <Button variant="outline">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

function TextField({
  id,
  type,
  label,
  optional = false,
  className,
}: Readonly<{
  id: string;
  type: string;
  label: string;
  optional?: boolean;
  className?: string;
}>) {
  const styles = twMerge("flex flex-col gap-2", className);

  return (
    <div className={styles}>
      <Label className="ml-2 flex gap-1" htmlFor={id}>
        {label}
        {optional && <span className="text-2xs font-thin">(optional)</span>}
      </Label>
      <Input type={type} id={id} placeholder={label} />
    </div>
  );
}

function SelectField({
  id,
  label,
  variants,
  optional = false,
}: Readonly<{
  id: string;
  label: string;
  variants: Array<{ value: string; label: string }>;
  optional?: boolean;
}>) {
  const Options = () =>
    variants.map(({ value, label }) => (
      <SelectItem key={value} value={value}>
        {label}
      </SelectItem>
    ));

  return (
    <div className="flex flex-col gap-2">
      <Label className="ml-2 flex gap-1" htmlFor={id}>
        {label}
        {optional && <span className="text-2xs font-thin">(optional)</span>}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <Options />
        </SelectContent>
      </Select>
    </div>
  );
}

function TextareaField({
  id,
  label,
  optional = false,
}: Readonly<{ id: string; label: string; optional?: boolean }>) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="ml-2 flex gap-1" htmlFor={id}>
        {label}
        {optional && <span className="text-2xs font-thin">(optional)</span>}
      </Label>
      <Textarea id="description" placeholder={label}></Textarea>
    </div>
  );
}
