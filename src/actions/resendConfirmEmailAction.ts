"use server";

import { resendConfirmEmail } from "@/services/resendConfirmEmailService";
import { handleAction } from "@/utils/handleAction";

export async function resendConfirmEmailAction() {
  return await handleAction(() => resendConfirmEmail());
}
