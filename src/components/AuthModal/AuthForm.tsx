import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import type { AuthFormTypes } from "../../types/auth";

type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: SubmitHandler<AuthFormTypes>;
};

function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const { control, handleSubmit } = useForm<AuthFormTypes>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "email is required",
            pattern: {
              value: /^[a-zA-Z0-9]{4,8}$/,
              message: "4~8자의 영문 또는 숫자만 입력 가능합니다",
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
              message: "4~8자의 영문 또는 숫자만 입력 가능합니다",
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
              pattern: {
                value: /^[a-zA-Z0-9]{4,8}$/,
                message: "4~8자의 영문 또는 숫자만 입력 가능합니다",
              },
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

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default AuthForm;
