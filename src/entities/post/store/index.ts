import { createStore } from "effector";

export { $recentlyPosts, postsFetched } from "./posts.store";
export { createDraftsStore } from "./drafts.store";
export { createActivePostsStore } from "./active-posts.store";

export const createStoreTemplate = <T extends { id: unknown }>() => {
  const $items = createStore<T[]>([]);

  const create = (items: T[], newItem: T) => [...items, newItem];
  const update = (items: T[], updatedItem: T) =>
    items.map((item) => {
      return item.id === updatedItem.id ? updatedItem : item;
    });
  const remove = (items: T[], deletedItemId: T["id"]) =>
    items.filter((item) => {
      return item.id !== deletedItemId;
    });

  return {
    $items,
    create,
    update,
    remove,
  };
};
