import { createEffect } from "effector";

import {
  createPost,
  fetchPosts,
  type Pagination,
  type PostDetailed,
  type SortBy,
  type PostDto,
  createDraft,
  deletePostById,
  deleteDraftById,
  updateDraft,
  updatePost,
  movePostToDrafts,
  moveDraftToPosts,
  type PostCategory,
} from "@/shared/data/post/api";

import {
  generalPostsFetched,
  userPostsFetched,
  userDraftsFetched,
  favoritePostsFetched,
  searchPostsFetched,
  postCreated,
  draftCreated,
  postDeleted,
  draftDeleted,
  postUpdated,
  $userDrafts,
  postMarkedAsDraft,
  $userPosts,
  postUnmarkedAsDraft,
} from "../store";

import { postDtoToPostModel } from "./post.mapper";
import { getFavoritesLocal } from "@/shared/data/post/local";
import { $myProfile } from "@/entities/profile";
import type { Post } from "../types";

type GetPostsParams = {
  pagination: Pagination;
  byIdentifiers?: Array<PostDetailed["id"]>;
  onlyFavorites?: boolean;
  onlyDrafts?: boolean;
  sortBy?: SortBy;
  searchQuery?: string;
  authorId?: string;
};

const getPostsFx = createEffect(
  async ({
    sortBy = { column: "updated_at", order: "desc" },
    onlyFavorites,
    onlyDrafts = false,
    pagination,
    byIdentifiers,
    searchQuery,
    authorId,
  }: GetPostsParams) => {
    const posts = await fetchPosts({
      pagination,
      sortBy,
      filters: {
        onlyDrafts,
        authorId,
        searchQuery,
        byIdentifiers,
        onlyFavorites,
      },
    });

    // TODO: Local / Remote favorites
    // Due to the fact that Supabase returns posts
    // taking into account the favorites parameter - we use only local favorites
    const favorites = new Set(getFavoritesLocal());

    return posts.map((dto) => {
      const model = postDtoToPostModel(dto);
      model.isFavorite ||= favorites.has(model.id);

      return model;
    });
  }
);

export const searchPostsFx = createEffect(
  async ({ searchQuery, offset }: { searchQuery: string; offset: number }) => {
    const posts = await getPostsFx({ searchQuery, pagination: { offset } });
    searchPostsFetched(posts);

    return posts;
  }
);

export const getGeneralPostsFx = createEffect(
  async ({ offset }: { offset: number }) => {
    const posts = await getPostsFx({ pagination: { offset } });
    generalPostsFetched(posts);

    return posts;
  }
);

export const getUserPostsFx = createEffect(
  async ({ authorId, offset }: { authorId: string; offset: number }) => {
    const posts = await getPostsFx({ authorId, pagination: { offset } });
    userPostsFetched(posts);

    return posts;
  }
);

export const getUserDraftsFx = createEffect(
  async ({ authorId, offset }: { authorId: string; offset: number }) => {
    const posts = await getPostsFx({
      authorId,
      pagination: { offset },
      onlyDrafts: true,
    });
    userDraftsFetched(posts);

    return posts;
  }
);

export const getFavoritePostsFx = createEffect(
  async ({ isSignedIn, offset }: { isSignedIn: boolean; offset: number }) => {
    const byIdentifiers = getFavoritesLocal();
    const onlyFavorites = isSignedIn || byIdentifiers.length === 0;

    const posts = await getPostsFx({
      pagination: { offset },
      onlyFavorites,
      byIdentifiers: onlyFavorites ? [] : byIdentifiers,
    });

    favoritePostsFetched(posts);

    return posts;
  }
);

export const createDraftFx = createEffect(async (post: PostDto) => {
  await createDraft(post).then(({ data, error }) => {
    if (data && error == null) {
      const imageUrl = post.image?.buffer
        ? URL.createObjectURL(
            new Blob(
              [
                new Uint8Array(
                  atob(post.image.buffer)
                    .split("")
                    .map((c: string) => c.charCodeAt(0))
                ),
              ],
              { type: post.image.mimeType }
            )
          )
        : null;

      draftCreated({
        ...post,
        id: data.post.id,
        author: $myProfile.getState()!,
        updatedAt: new Date(),
        isFavorite: false,
        imageUrl,
      } as Post);
    }
  });
});

export const createPostFx = createEffect(async (post: PostDto) => {
  await createPost(post).then(({ data, error }) => {
    if (data && error == null) {
      const imageUrl = post.image?.buffer
        ? URL.createObjectURL(
            new Blob(
              [
                new Uint8Array(
                  atob(post.image.buffer)
                    .split("")
                    .map((c: string) => c.charCodeAt(0))
                ),
              ],
              { type: post.image.mimeType }
            )
          )
        : null;

      postCreated({
        ...post,
        id: data.post.id,
        author: $myProfile.getState()!,
        updatedAt: new Date(),
        isFavorite: false,
        imageUrl,
      } as Post);
    }
  });
});

export const updateDraftFx = createEffect(
  async ({
    postId,
    postDto,
    isDraft,
  }: {
    postId: string;
    postDto: Partial<PostDto>;
    isDraft?: boolean | null;
  }) => {
    const author = $myProfile.getState();
    if (author == null) {
      throw new Error("No author.");
    }
    await updateDraft(postId, postDto, isDraft).then((data) => {
      const updatedPost = postDtoToPostModel({
        ...postDto,
        ...data,
        author_name: author.name,
        avatar_path: author.avatarUrl!,
        author: author.id,
        address: data?.address || null,
        category: (data?.category || null) as PostCategory | null,
        description: data?.description || null,
        draft: data?.draft ?? null,
        image_path: data?.image_path ?? null,
        is_author: data?.is_author ?? null,
        is_favorited: data?.is_favorited || false,
        max_age: data?.max_age ?? null,
        min_age: data?.min_age ?? null,
        phone: data?.phone ?? null,
        postcode: data?.postcode ?? null,
        price: data?.price ?? null,
        updated_at: null,
        title: data?.title ?? null,
        id: postId,
      });
      postUpdated({
        postId,
        updatedPost,
      });
    });
  }
);

export const updatePostFx = createEffect(
  async ({
    postId,
    postDto,
    isDraft,
  }: {
    postId: string;
    postDto: Partial<PostDto>;
    isDraft?: boolean | null;
  }) => {
    const author = $myProfile.getState();
    if (author == null) {
      throw new Error("No author.");
    }
    await updatePost(postId, postDto, isDraft).then((data) => {
      const updatedPost = postDtoToPostModel({
        ...postDto,
        ...data,
        author_name: author.name,
        avatar_path: author.avatarUrl!,
        author: author.id,
        address: data?.address || null,
        category: (data?.category || null) as PostCategory | null,
        description: data?.description || null,
        draft: data?.draft ?? null,
        image_path: data?.image_path ?? null,
        is_author: data?.is_author ?? null,
        is_favorited: data?.is_favorited || false,
        max_age: data?.max_age ?? null,
        min_age: data?.min_age ?? null,
        phone: data?.phone ?? null,
        postcode: data?.postcode ?? null,
        price: data?.price ?? null,
        updated_at: null,
        title: data?.title ?? null,
        id: postId,
      });
      postUpdated({
        postId,
        updatedPost,
      });
    });
  }
);

export const movePostToDraftsFx = createEffect(async (postId: Post["id"]) => {
  await movePostToDrafts(postId).then(({ error }) => {
    if (error) {
      throw error;
    }

    const post = $userPosts.getState().find((post) => post.id === postId);

    if (post) {
      postMarkedAsDraft(post);
    }
  });
});

export const moveDraftToPostsFx = createEffect(async (postId: Post["id"]) => {
  await moveDraftToPosts(postId).then(({ error }) => {
    if (error) {
      throw error;
    }

    const post = $userDrafts.getState().find((post) => post.id === postId);

    if (post) {
      postUnmarkedAsDraft(post);
    }
  });
});

export const deleteDraftByIdFx = createEffect(async (postId: Post["id"]) => {
  await deleteDraftById(postId).then(({ error }) => {
    if (error == null) {
      draftDeleted(postId);
    }
  });
});

export const deletePostByIdFx = createEffect(async (postId: Post["id"]) => {
  await deletePostById(postId).then(({ error }) => {
    if (error == null) {
      postDeleted(postId);
    }
  });
});
