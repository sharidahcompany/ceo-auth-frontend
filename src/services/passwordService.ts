import api from "@/lib/api";
import { ForgotPasswordData, ResetPasswordData } from "@/types";

export async function forgotPassword(data: ForgotPasswordData) {
  const response = await api.post("/forgot-password", data);
  return response.data;
}

export async function resetPassword(data: ResetPasswordData) {
  const response = await api.post("/reset-password", data);
  return response.data;
}
