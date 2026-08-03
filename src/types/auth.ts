import { getAcceptInvitationSchema } from "@/schemas/acceptInvitation";
import { getConfirmEmailSchema } from "@/schemas/confirmEmail";
import { getForgotPasswordSchema } from "@/schemas/fogotPassword";
import { getLoginSchema } from "@/schemas/login";
import { getRegisterSchema } from "@/schemas/register";
import { getResetPasswordSchema } from "@/schemas/resetPassword";
import z from "zod";

export type LoginData = z.infer<ReturnType<typeof getLoginSchema>>;

export type RegisterData = z.infer<ReturnType<typeof getRegisterSchema>>;

export type ConfirmEmailData = z.infer<
  ReturnType<typeof getConfirmEmailSchema>
>;

export type ForgotPasswordData = z.infer<
  ReturnType<typeof getForgotPasswordSchema>
>;

export type ResetPasswordData = z.infer<
  ReturnType<typeof getResetPasswordSchema>
>;

export type AcceptInvitationData = z.infer<
  ReturnType<typeof getAcceptInvitationSchema>
>;

export interface InvitationSignature {
  user_id: string;
  tenant_id: string;
  expires: string;
  signature: string;
}
