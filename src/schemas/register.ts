import { TranslationFunction } from "@/types";
import { z } from "zod";

export const getRegisterSchema = (t: TranslationFunction) => {
  return (
    z
      .object({
        username: z
          .string()
          .min(1, { message: t("validation.required") })
          .regex(/^[a-zA-Z0-9]+$/, {
            message: t("validation.username_invalid"),
          }),

        first_name: z.string().min(1, { message: t("validation.required") }),

        last_name: z.string().min(1, { message: t("validation.required") }),

        phone: z
          .string()
          .min(1, { message: t("validation.required") })
          .regex(/^[0-9]+$/, { message: t("validation.phone_invalid") }),

        email: z
          .string()
          .min(1, { message: t("validation.required") })
          .pipe(z.string().email({ message: t("validation.email") })),

        password: z.string().min(8, {
          message: t("validation.password_min_length", { count: 8 }),
        }),

        password_confirmation: z
          .string()
          .min(1, { message: t("validation.required") }),
      })
      // Cleaner refinement that doesn't rely on ZodIssueCode
      .refine((data) => data.password === data.password_confirmation, {
        message: t("validation.password_mismatch"),
        path: ["password_confirmation"], // Attaches the error to this specific field
      })
  );
};
