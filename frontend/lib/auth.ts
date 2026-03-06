import { apiRequest } from "./api";

export async function registerUser(email: string, username: string, password: string) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });
}


export async function loginUser(email: string, password: string) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return data;
}
