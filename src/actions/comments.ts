import type { CommentState } from "../providers/redux/features/commentsSlice";
import { withErrorHandler } from "../utils/error";

const DUMMY_COMMENTS_API_URL = "https://dummyjson.com/comments";

async function createCommentApi({
  postId,
  userId,
  body,
}: {
  postId: number;
  userId: number;
  body: string;
}) {
  const res = await fetch(`${DUMMY_COMMENTS_API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      userId,
      body,
    }),
  });

  if (!res.ok) {
    throw new Error("server error");
  }

  // userId hacky way
  return {
    id: Math.floor(Math.random() * (9999 - 999 + 1)) + 999,
    body,
    postId,
  };
}

async function deleteCommentApi({ comment }: { comment: CommentState }) {
  const res = await fetch(`${DUMMY_COMMENTS_API_URL}/${comment.id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("server error");
  }

  return { comment };
}

export const createComment = withErrorHandler(createCommentApi);
export const deleteComment = withErrorHandler(deleteCommentApi);
