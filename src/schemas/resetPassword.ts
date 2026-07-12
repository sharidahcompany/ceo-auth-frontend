import { TranslationFunction } from "@/types";
import { z } from "zod";

export const getResetPasswordSchema = (t: TranslationFunction) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("validation.required") })
      .pipe(z.email({ message: t("validation.email") })),
    otp: z.string().min(1, { message: t("validation.required") }),
    password: z.string().min(8, {
      message: t("validation.password_min_length", { count: 8 }),
    }),
    password_confirmation: z.string().min(8, {
      message: t("validation.password_min_length", { count: 8 }),
    }),
  });
};
