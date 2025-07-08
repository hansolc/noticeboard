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

export type PostListResponoseType = z.infer<typeof postsResponseSchema>;
export type PostResponseType = PostListResponoseType["posts"];
