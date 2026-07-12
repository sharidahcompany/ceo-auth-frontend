import api from "@/lib/api";
import { ConfirmEmailData } from "@/types";

export async function confirmEmail(data: ConfirmEmailData) {
  const response = await api.post("/users/confirm-email", data);
  return response.data;
}
