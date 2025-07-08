import { z } from "zod";

export const postItemResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  userId: z.number(),
  views: z.number(),
  reactions: z.object({
    likes: z.number(),
    dislikes: z.number(),
  }),
});

export const postsResponseSchema = z.object({
  posts: z.array(postItemResponseSchema),
  total: z.number(),
  limit: z.number(),
  skip: z.number(),
});

export const postItemCommentResponseSchema = z.object({
  id: z.number(),
  body: z.string(),
  postId: z.number(),
  likes: z.number(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    fullName: z.string(),
  }),
});

export const postCommentsResponseSchema = z.object({
  comments: z.array(postItemCommentResponseSchema),
});

export type PostListResponoseType = z.infer<typeof postsResponseSchema>;
export type PostResponseType = z.infer<typeof postItemResponseSchema>;
export type PostItemCommentResponseType = z.infer<
  typeof postCommentsResponseSchema
>;
