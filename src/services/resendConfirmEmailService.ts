import api from "@/lib/api";

export async function resendConfirmEmail() {
  const response = await api.get("/auth/users/verify-email");
  return response.data;
}
