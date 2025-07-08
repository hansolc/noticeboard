import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import RoleTabs, { type Role } from "./RoleTabs";

interface IFormInput {
  email: string;
  password: string;
  passwordCheck: string;
}

function RegistrationForm() {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });
  const [role, setRole] = useState<Role>("user");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <RoleTabs role={role} setRole={setRole} />
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
        <Controller
          name="passwordCheck"
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
              label="PasswordCheck"
              fullWidth
              margin="dense"
              type="password"
            />
          )}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default RegistrationForm;
