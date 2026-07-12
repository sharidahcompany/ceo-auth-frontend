import { TranslationFunction } from "@/types";
import { z } from "zod";

export const getForgotPasswordSchema = (t: TranslationFunction) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("validation.required") })
      .pipe(z.email({ message: t("validation.email") })),
  });
};
