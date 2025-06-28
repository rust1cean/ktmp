import { supabase } from "@/shared/data/supabase";
import type { Pagination, PostCategory, SortBy, PostDetailed } from ".";

const MAX_POSTS_PER_REQUEST: number = 9;

export const GREEK_PHONE_PATTERN: RegExp = /^\+30\d{10}$/;

const formatPost = (post: PostDetailed) => {
  const exchange = (
    bucketName: "post_image" | "profile_avatar",
    relativePath: string
  ) =>
    supabase.storage.from(bucketName).getPublicUrl(relativePath).data.publicUrl;

  return {
    ...post,
    category: post.category ? post.category.replaceAll("_", " ") : "none",
    avatar_path: post.avatar_path
      ? exchange("profile_avatar", post.avatar_path)
      : null,
    image_path: post.image_path
      ? exchange("post_image", post.image_path)
      : null,
  };
};

export type Filters = {
  searchQuery?: string;
  categories?: PostCategory[];
  minAge?: number;
  maxAge?: number;
  onlyDrafts?: boolean;
  onlyFavorites?: boolean;
  byIdentifiers?: Array<PostDetailed["id"]>;
  authorId?: string;
};

export const fetchPosts = async ({
  pagination: { offset, limit = MAX_POSTS_PER_REQUEST },
  sortBy: { column, order },
  filters: {
    searchQuery,
    categories,
    minAge,
    maxAge,
    onlyDrafts = false,
    onlyFavorites = false,
    byIdentifiers = [],
    authorId,
  } = {},
}: {
  pagination: Pagination;
  sortBy: SortBy;
  filters?: Filters;
}): Promise<PostDetailed[]> => {
  const q = supabase.from("post_view").select();

  if (searchQuery) q.ilike("title", "%" + searchQuery + "%");
  if (categories) q.in("category", categories);
  if (minAge) q.gte("min_age", minAge);
  if (maxAge) q.lte("max_age", maxAge);
  if (onlyFavorites) q.eq("is_favorited", true);
  if (byIdentifiers.length > 0) q.in("id", byIdentifiers);
  if (authorId) q.eq("author", authorId);

  if (limit > MAX_POSTS_PER_REQUEST) limit = MAX_POSTS_PER_REQUEST;

  const { data: posts, error } = await q
    .eq("draft", onlyDrafts)
    .order(column, { ascending: order === "asc" })
    .range(offset, limit + offset - 1);

  if (error) throw error;

  return posts.map(formatPost) as PostDetailed[];
};

export const fetchPostById = async (
  postId: string
): Promise<PostDetailed | null> => {
  const { data: post, error } = await supabase
    .from("post_view")
    .select()
    .eq("id", postId)
    .maybeSingle();

  if (error) throw error;

  return post ? (formatPost(post) as PostDetailed) : null;
};

export type PostDto = {
  authorId: string;
  image?: {
    name: string;
    mimeType: string;
    extension: string;
    buffer: string | null;
    size: number;
  } | null;
  title: string;
  description: string;
  phone: string;
  postcode: number;
  address: string;
  minAge: number;
  maxAge: number;
  price?: number | null;
  category?: PostCategory | null;
};

// TODO: DEAD ZONE -- START (Supabase function `post-create` body)

// type ClientUploadPostRequestBody = {
//   post: CreatePostEntity;
//   post_image: CreatePostImageEntity;
//   is_draft: boolean;
// };

// type CreatePostEntity = {
//   author_id: string;
//   title: string;
//   description: string;
//   phone: string;
//   postcode: number;
//   address: string;
//   min_age?: number | null;
//   max_age: number;
//   price?: number | null;
//   category?: PostCategory | null;
// };

// type CreatePostImageEntity = {
//   name: string;
//   extension: string;
//   mime_type: string;
//   size: number;
//   buf: string;
// };

// TODO: DEAD ZONE -- END (Supabase function `post-create` body)

export const createPost = async (postDto: PostDto) => {
  const { data, error } = await supabase.functions.invoke("post-create", {
    body: {
      post: {
        title: postDto.title,
        description: postDto.description,
        phone: postDto.phone,
        postcode: postDto.postcode,
        address: postDto.address,
        min_age: postDto.minAge,
        max_age: postDto.maxAge,
        price: postDto.price,
        category: postDto.category,
        author_id: postDto.authorId,
      },
      post_image: postDto.image
        ? {
            name: postDto.image.name,
            size: postDto.image.size,
            buf: postDto.image.buffer,
            mime_type: postDto.image.mimeType,
            extension: postDto.image.extension,
          }
        : null,
      is_draft: false,
    },
  });

  return { data, error };
};

export const createDraft = async (postDto: PostDto) => {
  const { data, error } = await supabase.functions.invoke("post-create", {
    body: {
      post: {
        title: postDto.title,
        description: postDto.description,
        phone: postDto.phone,
        postcode: postDto.postcode,
        address: postDto.address,
        min_age: postDto.minAge,
        max_age: postDto.maxAge,
        price: postDto.price,
        category: postDto.category,
        author_id: postDto.authorId,
      },
      post_image: postDto.image
        ? {
            name: postDto.image.name,
            size: postDto.image.size,
            buf: postDto.image.buffer,
            mime_type: postDto.image.mimeType,
            extension: postDto.image.extension,
          }
        : null,
      is_draft: true,
    },
  });

  return { data, error };
};

export const updatePost = async (
  postId: string,
  postDto: Partial<PostDto>,
  isDraft?: boolean | null
) => {
  const body: {
    post_id: string;
    post: Record<string, unknown>;
    is_draft?: boolean;
    post_image: Record<string, unknown> | null;
  } = { post_id: postId, post: {}, post_image: {} };

  if ("title" in postDto) body.post.title = postDto.title;
  if ("description" in postDto) body.post.description = postDto.description;
  if ("phone" in postDto) body.post.phone = postDto.phone;
  if ("postcode" in postDto) body.post.postcode = postDto.postcode;
  if ("address" in postDto) body.post.address = postDto.address;
  if ("minAge" in postDto) body.post.min_age = postDto.minAge;
  if ("maxAge" in postDto) body.post.max_age = postDto.maxAge;
  if ("price" in postDto) body.post.price = postDto.price;
  if ("category" in postDto) body.post.category = postDto.category;
  if ("authorId" in postDto) body.post.author_id = postDto.authorId;

  if (postDto.image === null) {
    body.post_image = null;
  } else if (postDto.image && body.post_image) {
    body.post_image.name = postDto.image.name;
    body.post_image.size = postDto.image.size;
    body.post_image.buf = postDto.image.buffer;
    body.post_image.mime_type = postDto.image.mimeType;
    body.post_image.extension = postDto.image.extension;
  }

  if (isDraft != null) body.is_draft = isDraft;

  const { data, error } = await supabase.functions.invoke("post-update", {
    body,
  });

  if (error) {
    throw error;
  }

  return data?.post ? formatPost(data.post) : null;
};

export const updateDraft = async (
  postId: string,
  postDto: Partial<PostDto>,
  isDraft?: boolean | null
) => {
  const body: {
    post_id: string;
    post: Record<string, unknown>;
    is_draft?: boolean;
    post_image: Record<string, unknown> | null;
  } = { post_id: postId, post: {}, post_image: {} };

  if ("title" in postDto) body.post.title = postDto.title;
  if ("description" in postDto) body.post.description = postDto.description;
  if ("phone" in postDto) body.post.phone = postDto.phone;
  if ("postcode" in postDto) body.post.postcode = postDto.postcode;
  if ("address" in postDto) body.post.address = postDto.address;
  if ("minAge" in postDto) body.post.min_age = postDto.minAge;
  if ("maxAge" in postDto) body.post.max_age = postDto.maxAge;
  if ("price" in postDto) body.post.price = postDto.price;
  if ("category" in postDto) body.post.category = postDto.category;
  if ("authorId" in postDto) body.post.author_id = postDto.authorId;

  if (postDto.image === null) {
    body.post_image = null;
  } else if (postDto.image && body.post_image) {
    body.post_image.name = postDto.image.name;
    body.post_image.size = postDto.image.size;
    body.post_image.buf = postDto.image.buffer;
    body.post_image.mime_type = postDto.image.mimeType;
    body.post_image.extension = postDto.image.extension;
  }

  if (isDraft != null) body.is_draft = isDraft;

  const { data, error } = await supabase.functions.invoke("post-update", {
    body,
  });

  if (error) {
    throw error;
  }

  return data?.post ? formatPost(data.post) : null;
};

export const deletePostById = async (postId: string) => {
  const { error } = await supabase.functions.invoke("post-delete", {
    body: { id: postId },
  });

  return { error };
};

export const deleteDraftById = async (postId: string) => {
  const { error } = await supabase.functions.invoke("post-delete", {
    body: { id: postId },
  });

  return { error };
};

export const movePostToDrafts = async (postId: string) => {
  const { error } = await supabase
    .from("post")
    .update({ draft: true })
    .eq("id", postId);

  return { error };
};

export const moveDraftToPosts = async (postId: string) => {
  const { error } = await supabase
    .from("post")
    .update({ draft: false })
    .eq("id", postId);

  return { error };
};
