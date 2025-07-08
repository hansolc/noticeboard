import z from "zod";

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    email: z.string(),
    id: z.number(),
    role: z.string(),
  }),
});

export type AuthResponseType = z.infer<typeof authResponseSchema>;
