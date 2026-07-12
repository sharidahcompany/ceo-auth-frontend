import api from "@/lib/api";

export async function resendConfirmEmail() {
  const response = await api.get("/users/verify-email");
  return response.data;
}
