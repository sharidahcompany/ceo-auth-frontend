import { TranslationFunction } from "@/types";
import { z } from "zod";

export const getConfirmEmailSchema = (t: TranslationFunction) => {
  return z.object({
    otp: z.string().min(1, { message: t("validation.required") }),
  });
};
