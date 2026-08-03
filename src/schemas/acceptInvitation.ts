import { TranslationFunction } from "@/types";
import { z } from "zod";

export const getAcceptInvitationSchema = (t: TranslationFunction) => {
  return z
    .object({
      password: z.string().min(8, {
        message: t("validation.password_min_length", { count: 8 }),
      }),
      password_confirmation: z.string().min(1, {
        message: t("validation.required"),
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("validation.password_mismatch"),
      path: ["password_confirmation"],
    });
};
