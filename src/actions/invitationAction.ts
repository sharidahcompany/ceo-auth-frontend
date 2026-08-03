"use server";

import {
  completeInvitation,
  verifyInvitation,
} from "@/services/invitationService";
import { handleAction } from "@/utils/handleAction";

export async function verifyInvitationAction(token: string) {
  return await handleAction(() => verifyInvitation(token));
}

export async function completeInvitationAction(
  token: string,
  password: string,
  passwordConfirmation: string,
) {
  return await handleAction(() =>
    completeInvitation(token, password, passwordConfirmation),
  );
}
