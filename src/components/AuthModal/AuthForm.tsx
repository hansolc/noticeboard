import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import type { AuthFormTypes } from "../../types/auth";

type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: SubmitHandler<AuthFormTypes>;
};

function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const { control, handleSubmit, watch } = useForm<AuthFormTypes>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });
  const password = watch("password");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Email",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              label="email"
              fullWidth
              margin="dense"
              type="email"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: /^[a-zA-Z0-9]{4,8}$/,
              message: "4~8 characters or numbers allowed",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              label="Password"
              fullWidth
              margin="dense"
              type="password"
            />
          )}
        />

        {mode === "register" && (
          <Controller
            name="passwordCheck"
            control={control}
            rules={{
              required: "Password check is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Confirm Password"
                fullWidth
                margin="dense"
                type="password"
              />
            )}
          />
        )}

        <Button variant="contained" type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </>
  );
}

export default AuthForm;
