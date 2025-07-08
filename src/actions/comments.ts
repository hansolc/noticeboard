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

  return { id: userId + 9999, body, postId };
}

export const createComment = withErrorHandler(createCommentApi);
