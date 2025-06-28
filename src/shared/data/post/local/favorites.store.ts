import { deserialize, serializeArray, type PostId } from "./utils";

const FAVORITES_KEY: string = "favorites";

export const getFavoritesLocal = (): Array<PostId> => {
  return deserialize(localStorage.getItem(FAVORITES_KEY)) ?? [];
};

export const setFavoritesLocal = (favorites: Array<PostId>) => {
  localStorage.setItem(FAVORITES_KEY, serializeArray(favorites));
};

export const favoritePostLocal = (postId: PostId) => {
  setFavoritesLocal([...getFavoritesLocal(), postId]);
};

export const unfavoritePostLocal = (postId: PostId) => {
  setFavoritesLocal(getFavoritesLocal().filter((id) => id !== postId));
};

export const clearFavoritesLocal = () => {
  localStorage.removeItem(FAVORITES_KEY);
};
