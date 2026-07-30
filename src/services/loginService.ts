import api from "@/lib/api";
import { LoginData } from "@/types";
import { cookies, headers } from "next/headers";

export async function login(data: LoginData) {
  const response = await api.post("/auth/login", data);

  const cookieHeader = response.headers
    ? response.headers["set-cookie"]
    : undefined;

  const cookieStore = await cookies();

  let tokenValue: string | undefined = undefined;
  let maxAge: number | undefined = undefined;
  let expires: Date | undefined = undefined;

  if (cookieHeader) {
    const rawCookie = Array.isArray(cookieHeader)
      ? cookieHeader[0]
      : cookieHeader;

    const tokenMatch = rawCookie.match(/token=([^;]+)/);
    if (tokenMatch) {
      tokenValue = tokenMatch[1];
    }

    const maxAgeMatch = rawCookie.match(/Max-Age=([^;]+)/i);
    maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined;

    const expiresMatch = rawCookie.match(/Expires=([^;]+)/i);
    expires = expiresMatch ? new Date(expiresMatch[1]) : undefined;
  }

  if (!tokenValue) {
    tokenValue = response.data?.data?.token || response.data?.token;
  }

  const reqHeaders = await headers();
  const host = reqHeaders.get("host") || "";
  const hostname = host.split(":")[0];
  let domain: string | undefined = undefined;

  if (hostname !== "localhost" && !/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    const parts = hostname.split(".");
    if (parts.length > 2) {
      domain = "." + parts.slice(-2).join(".");
    } else {
      domain = "." + hostname;
    }
  }

  if (tokenValue) {
    cookieStore.set({
      name: "auth_token",
      value: tokenValue,
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      domain,
      ...(maxAge !== undefined ? { maxAge } : expires ? { expires } : {}),
    });
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
      domain,
    });
  }

  return response.data;
}
