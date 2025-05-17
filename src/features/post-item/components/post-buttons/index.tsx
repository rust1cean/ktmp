"use client";

import { useState } from "react";

import { DeleteButton, EditButton, FavoriteButton } from ".";

export { FavoriteButton } from "./favorite.button";
export { EditButton } from "./edit.button";
export { DeleteButton } from "./delete.button";

export type UserPostButtonsProps = {
  onFavorite: () => Promise<void>;
};

export function UserPostButtons({ onFavorite }: UserPostButtonsProps) {
  return <FavoriteButton className="w-full" onFavorite={onFavorite} />;
}

type PostOperation = "update" | "delete";

export type AuthorPostButtonsProps = UserPostButtonsProps & {
  onEdit: () => void;
  onDelete: () => Promise<void>;
};

export function AuthorPostButtons({
  onFavorite,
  onEdit,
  onDelete,
}: AuthorPostButtonsProps) {
  const [currentOperation, setOperation] = useState<PostOperation | null>(null);

  const handleFavorite = async () => {
    setOperation("update");
    await onFavorite().finally(() => setOperation(null));
  };

  const handleDelete = async () => {
    setOperation("delete");
    await onDelete().finally(() => setOperation(null));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <DeleteButton
          className="w-full"
          onDelete={handleDelete}
          disabled={currentOperation != null}
        />
        <EditButton
          className="w-full"
          onEdit={onEdit}
          disabled={currentOperation == "delete"}
        />
      </div>
      <FavoriteButton
        className="w-full"
        onFavorite={handleFavorite}
        disabled={currentOperation == "delete"}
      />
    </div>
  );
}
