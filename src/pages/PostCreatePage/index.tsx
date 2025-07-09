import { Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../../providers/redux/hooks";
import type { RootState } from "../../providers/redux/store";
import useCreatePost from "../NoticeBoardPage/hooks/useCreatePost";
import { Navigate } from "react-router";

type PostCreateProps = {
  title: string;
  body: string;
};

function PostCreatePage() {
  const user = useAppSelector((state: RootState) => state.user.user);
  const { createPost, isPending, error } = useCreatePost();
  const { control, handleSubmit } = useForm<PostCreateProps>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  if (!user || user.role === "guest") {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data: PostCreateProps) => {
    if (!user) return;
    createPost({ ...data, userId: user.id });
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Create Post</Typography>
        <Controller
          name="title"
          control={control}
          rules={{ required: "title is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Post Title"
              variant="filled"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          rules={{ required: "body is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Post Body"
              multiline
              rows={6}
              variant="filled"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button variant="contained" className="w-full" type="submit">
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
      {error && (
        <Typography
          variant="body1"
          className="text-red-500 pt-5 italic text-right"
        >
          {`${error.message} - please try again`}
        </Typography>
      )}
    </>
  );
}

export default PostCreatePage;
