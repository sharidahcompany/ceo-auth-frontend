"use server";

import { confirmEmail } from "@/services/confirmEmailService";
import { ConfirmEmailData } from "@/types";
import { handleAction } from "@/utils/handleAction";

export async function confirmEmailAction(data: ConfirmEmailData) {
  return await handleAction(() => confirmEmail(data));
}
