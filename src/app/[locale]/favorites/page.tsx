"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useUnit } from "effector-react";

import { openPostDetailsModal } from "@/widgets/post-details-modal";
import { $favoritePosts, getFavoritePostsFx } from "@/entities/post";
import { PostFeed } from "@/widgets/post-feed";
import { $myId, $isSignedIn } from "@/entities/auth";
import { syncFavorites } from "@/shared/data/post/api/favorite.api";
import { getFavoritesLocal } from "@/shared/data/post/local";
import { useTranslations } from "next-intl";

const LAST_SYNC_OF_FAVORITES_TIME_LOCALSTORAGE_KEY: string =
  "last_favorites_sync";
const FAVORITES_SYNC_INTERVAL_IN_MINUTES: number = 30;

export default function FavoritesPage() {
  const t = useTranslations("FavoritesPage");
  const userId = useUnit($myId);

  useEffect(() => {
    const synchronize = async () => {
      const plannedNextSyncTime = new Date(
        localStorage.getItem(LAST_SYNC_OF_FAVORITES_TIME_LOCALSTORAGE_KEY)!
      );

      const currentTime = new Date();

      const favorites = getFavoritesLocal();

      if (
        userId &&
        currentTime.getMinutes() > plannedNextSyncTime.getMinutes() &&
        favorites.length > 0
      ) {
        toast(t("sync_favorites"));

        syncFavorites({
          userId,
          favorites,
        });

        const nextSyncTimeInMinutes = new Date(
          currentTime.getTime() + FAVORITES_SYNC_INTERVAL_IN_MINUTES
        ).toString();

        localStorage.setItem(
          LAST_SYNC_OF_FAVORITES_TIME_LOCALSTORAGE_KEY,
          nextSyncTimeInMinutes
        );
      }
    };

    if (userId) {
      // Block renderer until synchronized.
      synchronize();
    }
  }, [t, userId]);

  const getFavorites = async (params: { offset: number }) => {
    return getFavoritePostsFx({
      ...params,
      isSignedIn: $isSignedIn.getState(),
    });
  };

  return (
    <PostFeed
      title={t("title")}
      $posts={$favoritePosts}
      onRequestPosts={getFavorites}
      onOpenPostDetails={openPostDetailsModal}
    />
  );
}
