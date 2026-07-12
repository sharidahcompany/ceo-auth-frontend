"use server";

import { forgotPassword, resetPassword } from "@/services/passwordService";
import { ForgotPasswordData, ResetPasswordData } from "@/types";
import { handleAction } from "@/utils/handleAction";

export async function forgotPasswordAction(data: ForgotPasswordData) {
  return await handleAction(() => forgotPassword(data));
}

export async function resetPasswordAction(data: ResetPasswordData) {
  return await handleAction(() => resetPassword(data));
}
