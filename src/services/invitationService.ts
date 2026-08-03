import api from "@/lib/api";

export async function verifyInvitation(queryString: string) {
  const response = await api.post(`/auth/invitations/verify?${queryString}`);
  return response.data;
}

export async function completeInvitation(
  queryString: string,
  userId: string,
  password: string,
  passwordConfirmation: string,
) {
  const response = await api.post(
    `/auth/invitations/complete?${queryString}`,
    {
      user_id: userId,
      password,
      password_confirmation: passwordConfirmation,
    },
  );
  return response.data;
}
