"use client";

import Image from "next/image";
import { z } from "zod/v4";
import { useUnit } from "effector-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent, createStore } from "effector";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/shadcn/shadcn-ui/dialog";
import { PendingButton } from "@/shared/shadcn/shadcn-ui/button";
import { Form } from "@/shared/shadcn/shadcn-ui/form";
import {
  GREEK_PHONE_PATTERN,
  POST_CATEGORIES,
  type PostCategory,
  type PostDto,
} from "@/shared/data/post/api";
import { capitalizeFirstLetter } from "@/shared/format-string";
import {
  UploadField,
  InputField,
  SelectField,
  TextareaField,
} from "@/shared/shadcn/shadcn-components/form-fields";
import {
  createDraftFx,
  createPostFx,
  updateDraftFx,
  updatePostFx,
  type Post,
} from "@/entities/post";
import { useTranslations } from "next-intl";

export const openPostCreator = createEvent();
export const openPostEditor = createEvent<Post>();
export const closePostEditor = createEvent();

const $isPostEditorVisible = createStore(false)
  .on([openPostCreator, openPostEditor], () => true)
  .on(closePostEditor, () => false);

const $editablePost = createStore<Post | null>(null)
  .on([openPostCreator, closePostEditor], () => null)
  .on(openPostEditor, (_, newPost) => structuredClone(newPost));

const $isEditingPost = $editablePost.map((post) => post !== null);

export const postEditorFormSchema = z
  .strictObject({
    image: z
      .file()
      .max(5 * 1024 * 1024)
      .mime(["image/jpeg", "image/jpg", "image/png"])
      .nullable(),
    title: z
      .string()
      .regex(/^['\w\s]+$/)
      .min(5)
      .max(50),
    description: z.string().min(16).max(1000),
    phone: z.string().regex(GREEK_PHONE_PATTERN).min(6).max(24),
    address: z.string().min(8).max(100),
    postcode: z.number().min(100_000).max(999_999),
    category: z.enum(POST_CATEGORIES).nullable(),
    price: z.number().max(100).nullable(),
    minAge: z.number().min(0).max(17),
    maxAge: z.number({ message: "Max age is required" }).min(1).max(18),
  })
  .partial({
    image: true,
    category: true,
    price: true,
  })
  .refine(
    ({ minAge, maxAge }) =>
      minAge == null || (minAge != null && minAge <= maxAge),
    "Min age must be less or equal than max age"
  );

export type PostEditorFormData = z.infer<typeof postEditorFormSchema>;

async function fileToRawBase64(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
}

export function EditPostModal({
  getUserId,
}: {
  getUserId: () => string | null | undefined;
}) {
  const t = useTranslations("Base");

  const [isVisible, onClose] = useUnit([$isPostEditorVisible, closePostEditor]);
  const [editablePost, isEditingPost] = useUnit([
    $editablePost,
    $isEditingPost,
  ]);

  const postEditorForm = useForm<PostEditorFormData>({
    resolver: zodResolver(postEditorFormSchema),
  });

  const formPostImage = postEditorForm.watch("image");
  const postImage = useMemo<string | null>(
    () =>
      formPostImage
        ? URL.createObjectURL(formPostImage)
        : editablePost?.imageUrl || null,
    [editablePost?.imageUrl, formPostImage]
  );
  const isPostImageRemoved = useMemo(() => postImage == null, [postImage]);
  const clearPostImage = () => {
    postEditorForm.resetField("image");

    if (editablePost) {
      editablePost.imageUrl = null;
    }
  };

  useEffect(() => {
    postEditorForm.reset({
      title: editablePost?.title,
      description: editablePost?.description,
      phone: editablePost?.phone,
      address: editablePost?.address,
      postcode: editablePost?.postcode,
      category: editablePost?.category
        ? (editablePost.category
            .toLowerCase()
            .replaceAll(" ", "_") as PostCategory)
        : "none",
      price: editablePost?.price,
      minAge: editablePost?.minAge ?? 0,
      maxAge: editablePost?.maxAge,
    });
  }, [editablePost, isVisible, postEditorForm]);

  const onDraftSubmit = async (postData: PostEditorFormData) => {
    const authorId = getUserId();

    if (authorId) {
      const postDto: PostDto = {
        authorId,
        title: postData.title,
        description: postData.description,
        phone: postData.phone,
        postcode: postData.postcode,
        address: postData.address,
        minAge: postData.minAge,
        maxAge: postData.maxAge,
        price: postData.price,
        category: postData.category,
      };

      if (!isPostImageRemoved && postData.image) {
        const extension = postData.image.name.split(".").pop();

        if (!extension) {
          throw new Error("Unknown image extension");
        }

        const buffer = await fileToRawBase64(postData.image);

        postDto.image = {
          extension,
          buffer,
          name: postData.image.name,
          size: postData.image.size,
          mimeType: postData.image.type,
        };
      }

      await (editablePost
        ? updateDraftFx({
            postId: editablePost.id,
            postDto,
          }).then(() => toast(t("draft_updated")))
        : createDraftFx(postDto).then(() => toast(t("draft_added")))
      ).then(() => {
        onClose();
      });
    }
  };

  const onPostSubmit = async (postData: PostEditorFormData) => {
    const authorId = getUserId();

    if (authorId) {
      const postDto: PostDto = {
        authorId,
        title: postData.title,
        description: postData.description,
        phone: postData.phone,
        postcode: postData.postcode,
        address: postData.address,
        minAge: postData.minAge,
        maxAge: postData.maxAge,
        price: postData.price,
        category: postData.category,
      };

      if (isPostImageRemoved) {
        postDto.image = null;
      } else if (postData.image) {
        const extension = postData.image.name.split(".").pop();

        if (!extension) {
          throw new Error("Unknown image extension");
        }

        const buffer = await fileToRawBase64(postData.image);

        postDto.image = {
          extension,
          buffer,
          name: postData.image.name,
          size: postData.image.size,
          mimeType: postData.image.type,
        };
      }

      await (editablePost
        ? updatePostFx({
            postId: editablePost.id,
            postDto,
          }).then(() => toast(t("post_updated")))
        : createPostFx(postDto).then(() => toast(t("post_added")))
      ).then(() => {
        onClose();
      });
    }
  };

  const PostImagePreview = () =>
    postImage && (
      <Image
        className="rounded-xl"
        src={postImage}
        alt="Image not found"
        width={768}
        height={480}
      />
    );

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col gap-8">
        <DialogTitle>{t("post_editor_title")}</DialogTitle>
        <Form {...postEditorForm}>
          <form className="p-1 flex flex-col gap-4 overflow-y-auto">
            <PostImagePreview />
            {/* TODO: Remove zod.isNullable() method */}
            <UploadField
              className="w-full"
              name="image"
              label={t("upload_post_image")}
              optional={postEditorFormSchema.shape.image.isNullable()}
              control={postEditorForm.control}
              onClear={clearPostImage}
            />
            <InputField
              name="title"
              label={t("title")}
              showMessage={false}
              optional={postEditorFormSchema.shape.title.isNullable()}
              control={postEditorForm.control}
            />
            <TextareaField
              name="description"
              label={t("description")}
              showMessage={false}
              control={postEditorForm.control}
              optional={postEditorFormSchema.shape.description.isNullable()}
            />
            <InputField
              name="address"
              label={t("address")}
              type="text"
              showMessage={false}
              optional={postEditorFormSchema.shape.address.isNullable()}
              control={postEditorForm.control}
            />
            <InputField
              name="postcode"
              label={t("zip_code")}
              type="number"
              showMessage={false}
              optional={postEditorFormSchema.shape.postcode.isNullable()}
              control={postEditorForm.control}
            />
            <InputField
              name="phone"
              label={t("phone")}
              type="phone"
              showMessage={false}
              optional={postEditorFormSchema.shape.phone.isNullable()}
              control={postEditorForm.control}
            />
            <div className="flex gap-8 justify-between">
              <InputField
                className="w-full"
                name="minAge"
                type="number"
                label={t("min_age")}
                showMessage={false}
                control={postEditorForm.control}
                optional={postEditorFormSchema.shape.minAge.isNullable()}
              />
              <InputField
                className="w-full"
                name="maxAge"
                type="number"
                label={t("max_age")}
                showMessage={false}
                control={postEditorForm.control}
                optional={postEditorFormSchema.shape.maxAge.isNullable()}
              />
            </div>
            <SelectField
              className="w-full"
              name="category"
              label={t("category")}
              showMessage={false}
              variants={POST_CATEGORIES.map((category) => ({
                label: capitalizeFirstLetter(category.replaceAll("_", " ")),
                value: category,
              }))}
              optional={postEditorFormSchema.shape.category.isNullable()}
              control={postEditorForm.control}
            />
            <InputField
              type="number"
              name="price"
              label={t("price")}
              showMessage={false}
              control={postEditorForm.control}
              optional={postEditorFormSchema.shape.price.isNullable()}
            />
          </form>
        </Form>
        <FootBar
          isEditing={isEditingPost}
          onSubmitToDrafts={postEditorForm.handleSubmit(onDraftSubmit)}
          onSubmitToPosts={postEditorForm.handleSubmit(onPostSubmit)}
        />
      </DialogContent>
    </Dialog>
  );
}

function FootBar({
  isEditing,
  onSubmitToDrafts,
  onSubmitToPosts,
}: {
  isEditing: boolean;
  onSubmitToDrafts: () => Promise<void>;
  onSubmitToPosts: () => Promise<void>;
}) {
  const t = useTranslations("Base");

  return (
    <div className="flex gap-2 justify-end">
      {isEditing ? (
        <PendingButton onClick={onSubmitToPosts} text={t("update")} />
      ) : (
        <>
          <PendingButton
            variant="ghost"
            onClick={onSubmitToDrafts}
            text={t("to_drafts")}
          />
          <PendingButton onClick={onSubmitToPosts} text={t("add_post")} />
        </>
      )}
    </div>
  );
}
