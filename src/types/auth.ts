export type Role = "user" | "admin" | "guest";

export type AuthFormTypes = {
  email: string;
  password: string;
  passwordCheck?: string;
};
