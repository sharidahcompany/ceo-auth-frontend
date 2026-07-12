"use client";

import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ForgotPasswordData } from "@/types";
import { getForgotPasswordSchema } from "@/schemas/fogotPassword";
import { forgotPasswordAction } from "@/actions/passwordActions";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function ForgotPasswordForm() {
  const t = useTranslations();
  const forgotPasswordSchema = getForgotPasswordSchema(t);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordData) {
    startTransition(async () => {
      const response = await forgotPasswordAction(data);

      if (!response.success) {
        toast.error(response.firstError || response.error, {
          position: "bottom-right",
        });
      } else {
        toast.success(response.data?.message, {
          position: "bottom-right",
        });
        router.push("/reset-password");
      }
    });
  }

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center gap-5"
      >
        <Field className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            {t("attributes.email")}
          </label>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder={t("attributes.email")}
                disabled={isPending}
                className="w-full"
              />
            )}
          />

          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner data-icon="inline-start" /> : <Send />}{" "}
          {t("buttons.send")}
        </Button>
      </form>
    </React.Fragment>
  );
}
