import { TranslationFunction } from "@/types";
import { z } from "zod";

export const getLoginSchema = (t: TranslationFunction) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("validation.required") })
      .pipe(z.email({ message: t("validation.email") })),
    password: z
      .string()
      .min(8, { message: t("validation.password_min_length", { count: 8 }) }),
    remember_token: z.boolean(),
  });
};
