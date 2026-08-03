import api from "@/lib/api";

export async function verifyInvitation(token: string) {
  const response = await api.post("/auth/invitations/verify", { token });
  return response.data;
}

export async function completeInvitation(
  token: string,
  password: string,
  passwordConfirmation: string,
) {
  const response = await api.post("/auth/invitations/complete", {
    token,
    password,
    password_confirmation: passwordConfirmation,
  });
  return response.data;
}
