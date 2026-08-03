"use server";

import {
  completeInvitation,
  verifyInvitation,
} from "@/services/invitationService";
import { handleAction } from "@/utils/handleAction";

export async function verifyInvitationAction(queryString: string) {
  return await handleAction(() => verifyInvitation(queryString));
}

export async function completeInvitationAction(
  queryString: string,
  userId: string,
  password: string,
  passwordConfirmation: string,
) {
  return await handleAction(() =>
    completeInvitation(queryString, userId, password, passwordConfirmation),
  );
}
