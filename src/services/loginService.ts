import api from "@/lib/api";
import { LoginData } from "@/types";
import { cookies } from "next/headers";

export async function login(data: LoginData) {
  const response = await api.post("/login", data);

  const cookieHeader = response.headers
    ? response.headers["set-cookie"]
    : undefined;

  const cookieStore = await cookies();

  if (cookieHeader) {
    const rawCookie = Array.isArray(cookieHeader)
      ? cookieHeader[0]
      : cookieHeader;

    const tokenMatch = rawCookie.match(/token=([^;]+)/);
    const tokenValue = tokenMatch ? tokenMatch[1] : response.data?.data?.token;

    if (tokenValue) {
      const maxAgeMatch = rawCookie.match(/Max-Age=([^;]+)/i);
      const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined;

      const expiresMatch = rawCookie.match(/Expires=([^;]+)/i);
      const expires = expiresMatch ? new Date(expiresMatch[1]) : undefined;

      cookieStore.set({
        name: "auth_token",
        value: tokenValue,
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        path: "/",
        ...(maxAge !== undefined ? { maxAge } : expires ? { expires } : {}),
      });
    }
  }

  const tenants = response.data?.data?.tenants;
  if (Array.isArray(tenants) && tenants.length > 0) {
    const firstTenantId = tenants[0].id;

    cookieStore.set({
      name: "tenant",
      value: String(firstTenantId),
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
  }

  return response.data;
}
