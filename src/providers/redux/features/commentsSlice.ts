import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CommentState {
  id: number;
  body: string;
  postId: number;
  likes?: number;
  user: {
    id: number;
    username: string;
    fullName?: string;
  };
}

const initialState: Record<string, CommentState[]> = {};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentState[]>) => {
      action.payload.forEach((comment) => {
        if (!state[comment.postId]) state[comment.postId] = [];

        const exists = state[comment.postId].some((c) => c.id === comment.id);
        if (!exists) {
          state[comment.postId].push(comment);
        }
      });
    },
    deleteComment: (state, action: PayloadAction<CommentState>) => {
      const postId = action.payload.postId;
      const commentId = action.payload.id;
      state[postId] = state[postId].filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const { setComments, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
