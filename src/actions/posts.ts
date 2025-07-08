import {
  postCommentsResponseSchema,
  postItemResponseSchema,
  postsResponseSchema,
  type PostItemCommentResponseType,
  type PostListResponoseType,
  type PostResponseType,
} from "../schema/posts";
import { withErrorHandler } from "../utils/error";

const DUMMY_POSTS_API_URL = "https://dummyjson.com/posts";

async function getPostsApi({
  term,
  skip,
  limit,
}: {
  term?: string;
  skip?: number;
  limit?: number;
}): Promise<PostListResponoseType> {
  const url = new URL(
    term ? `${DUMMY_POSTS_API_URL}/search` : DUMMY_POSTS_API_URL
  );

  if (term) {
    url.searchParams.set("q", term);
  } else {
    url.searchParams.set("skip", String(skip));
    url.searchParams.set("limit", String(limit));
  }
  const res = await fetch(url.toString());
  const jsonData = await res.json();

  const { success, data } = postsResponseSchema.safeParse(jsonData);

  if (!res.ok) {
    throw new Error("server error");
  } else if (!success) {
    throw new Error("Invalid Data");
  }
  return data;
}

async function getPostByIdApi({
  id,
}: {
  id: number;
}): Promise<PostResponseType> {
  const url = new URL(`${DUMMY_POSTS_API_URL}/${id}`);
  const res = await fetch(url.toString());
  const jsonData = await res.json();

  const { success, data } = postItemResponseSchema.safeParse(jsonData);

  if (!res.ok) {
    throw new Error("server error");
  } else if (!success) {
    throw new Error("Invalid Data");
  }
  return data;
}

async function getPostCommentApi({
  id,
}: {
  id: number;
}): Promise<PostItemCommentResponseType["comments"]> {
  const url = new URL(`${DUMMY_POSTS_API_URL}/${id}/comments`);
  const res = await fetch(url.toString());
  const jsonData = await res.json();

  const { success, data } = postCommentsResponseSchema.safeParse(jsonData);
  if (!res.ok) {
    throw new Error("server error");
  } else if (!success) {
    throw new Error("Invalid Data");
  }
  return data.comments;
}

export const getPosts = withErrorHandler(getPostsApi);
export const getPostById = withErrorHandler(getPostByIdApi);
export const getPostComment = withErrorHandler(getPostCommentApi);
