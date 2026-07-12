import api from "@/lib/api";
import { RegisterData } from "@/types";
import { cookies } from "next/headers";

export async function register(data: RegisterData) {
  const response = await api.post("/register", data);

  const cookieHeader = response.headers
    ? response.headers["set-cookie"]
    : undefined;

  if (cookieHeader) {
    const cookieStore = await cookies();
    const rawCookie = Array.isArray(cookieHeader)
      ? cookieHeader[0]
      : cookieHeader;

    const tokenMatch = rawCookie.match(/token=([^;]+)/);
    const tokenValue = tokenMatch ? tokenMatch[1] : response.data.token;

    if (tokenValue) {
      const maxAgeMatch = rawCookie.match(/Max-Age=([^;]+)/i);
      const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined;

      const expiresMatch = rawCookie.match(/Expires=([^;]+)/i);
      const expires = expiresMatch ? new Date(expiresMatch[1]) : undefined;

      cookieStore.set({
        name: "auth_token",
        value: tokenValue,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        ...(maxAge !== undefined ? { maxAge } : expires ? { expires } : {}),
      });
    }
  }

  return response.data;
}
