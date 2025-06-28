import { createEffect } from "effector";

import { postFavorited, postUnfavorited } from "../store";
import type { Post } from "../types";
import { favoritePost, unfavoritePost } from "@/shared/data/post/api";
import {
  favoritePostLocal,
  unfavoritePostLocal,
} from "@/shared/data/post/local";

export const favoritePostFx = createEffect(
  async ({ userId, post }: { userId?: string; post: Post }) => {
    favoritePostLocal(post.id);

    if (userId) {
      await favoritePost({ userId, postId: post.id });
    }

    postFavorited({ ...post, isFavorite: true });
  }
);

export const unfavoritePostFx = createEffect(
  async ({ userId, postId }: { userId?: string; postId: string }) => {
    unfavoritePostLocal(postId);

    if (userId) {
      await unfavoritePost({ userId, postId });
    }

    postUnfavorited(postId);
  }
);
