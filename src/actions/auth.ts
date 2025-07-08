import { authResponseSchema, type AuthResponseType } from "../schema/auth";
import type { AuthFormTypes, Role } from "../types/auth";
import { withErrorHandler } from "../utils/error";

async function loginApi({
  email,
  password,
  role,
}: AuthFormTypes & { role: Role }): Promise<AuthResponseType> {
  const url = new URL(`http://localhost:8000/login`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  const jsonData = await res.json();

  const { success, data } = authResponseSchema.safeParse(jsonData);

  if (!res.ok) {
    throw new Error(jsonData || "server error");
  } else if (!success) {
    throw new Error("Invalid Data");
  }
  return data;
}

async function registerApi({
  email,
  password,
  role,
}: AuthFormTypes & { role: Role }) {
  const url = new URL(`http://localhost:8000/register`);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  const jsonData = await res.json();

  const { success, data } = authResponseSchema.safeParse(jsonData);

  if (!res.ok) {
    throw new Error(jsonData || "server error");
  } else if (!success) {
    throw new Error("Invalid Data");
  }
  return data;
}
export const login = withErrorHandler(loginApi);
export const register = withErrorHandler(registerApi);
