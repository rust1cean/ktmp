"use client";

import { useState } from "react";

import { DeleteButton, EditButton, FavoriteButton, ToggleDraftButton } from ".";

export { FavoriteButton } from "./favorite.button";
export { EditButton } from "./edit.button";
export { DeleteButton } from "./delete.button";
export { ToggleDraftButton } from "./toggle-draft.button";

import {
  deleteDraftByIdFx,
  deletePostByIdFx,
  favoritePostFx,
  unfavoritePostFx,
} from "@/entities/post";
import type { Post } from "@/entities/post";
import {
  movePostToDraftsFx,
  moveDraftToPostsFx,
} from "@/entities/post/model/post.model";

type OperationType = "update" | "delete";

export type PostButtonProps = PostButtonVisibilityProps & {
  post: Post;
  isDraft: boolean;
  getUserId: () => string | undefined;
  onEdit: () => void;
};

export type PostButtonVisibilityProps = {
  showFavoriteButton: boolean;
  showEditButton: boolean;
  showDeleteButton: boolean;
  showToggleDraftButton: boolean;
};

export function PostButtons({
  post,
  isDraft,
  showFavoriteButton,
  showEditButton,
  showDeleteButton,
  showToggleDraftButton,
  onEdit,
  getUserId,
}: PostButtonProps) {
  const [currentOperation, setOperation] = useState<OperationType | null>(null);

  const isDeleteDisabled = currentOperation !== null;
  const isEditDisabled = currentOperation === "delete";
  const isFavoriteDisabled = currentOperation === "delete";
  const isToggleDraftDisabled = currentOperation === "delete";

  const handleFavorite = async () => {
    setOperation("update");

    await favoritePostFx({ userId: getUserId(), post }).finally(() =>
      setOperation(null)
    );
  };

  const handleUnfavorite = async () => {
    setOperation("update");

    await unfavoritePostFx({ userId: getUserId(), postId: post.id }).finally(
      () => setOperation(null)
    );
  };

  const handleDelete = async () => {
    setOperation("delete");

    const userId = getUserId();

    if (userId) {
      await (isDraft ? deleteDraftByIdFx : deletePostByIdFx)(post.id).finally(
        () => setOperation(null)
      );
    }
  };

  const handleToDrafts = async () => {
    setOperation("update");

    await movePostToDraftsFx(post.id).finally(() => setOperation(null));
  };

  const handleToPosts = async () => {
    setOperation("update");

    await moveDraftToPostsFx(post.id).finally(() => setOperation(null));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        {showDeleteButton && (
          <DeleteButton
            className="w-full"
            onDelete={handleDelete}
            disabled={isDeleteDisabled}
          />
        )}
        {showEditButton && (
          <EditButton
            className="w-full"
            onEdit={onEdit}
            disabled={isEditDisabled}
          />
        )}
      </div>
      {showToggleDraftButton && (
        <ToggleDraftButton
          className="w-full"
          disabled={isToggleDraftDisabled}
          isDraft={isDraft}
          onToDrafts={handleToDrafts}
          onToPosts={handleToPosts}
        />
      )}
      {showFavoriteButton && (
        <FavoriteButton
          className="w-full"
          disabled={isFavoriteDisabled}
          isFavorite={post.isFavorite}
          onFavorite={handleFavorite}
          onUnfavorite={handleUnfavorite}
        />
      )}
    </div>
  );
}
