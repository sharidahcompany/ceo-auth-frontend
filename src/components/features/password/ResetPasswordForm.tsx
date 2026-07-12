"use client";

import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ResetPasswordData } from "@/types";
import { getResetPasswordSchema } from "@/schemas/resetPassword";
import { resetPasswordAction } from "@/actions/passwordActions";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function ResetPasswordForm() {
  const t = useTranslations();
  const resetPasswordSchema = getResetPasswordSchema(t);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(data: ResetPasswordData) {
    startTransition(async () => {
      const response = await resetPasswordAction(data);

      if (!response.success) {
        toast.error(response.firstError || response.error, {
          position: "bottom-right",
        });
      } else {
        toast.success(response.data?.message, {
          position: "bottom-right",
        });
        router.push("/login");
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

        <Field className="w-full flex flex-col gap-2">
          <label htmlFor="otp" className="text-sm font-medium">
            {t("attributes.otp")}
          </label>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="otp"
                type="text"
                placeholder={t("attributes.otp")}
                disabled={isPending}
                className="w-full"
              />
            )}
          />
          {errors.otp && <FieldError>{errors.otp.message}</FieldError>}
        </Field>

        <Field className="w-full flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            {t("attributes.password")}
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                type="password"
                placeholder={t("attributes.password")}
                disabled={isPending}
                className="w-full"
              />
            )}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field className="w-full flex flex-col gap-2">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-medium"
          >
            {t("attributes.password_confirmation")}
          </label>
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="password_confirmation"
                type="password"
                placeholder={t("attributes.password_confirmation")}
                disabled={isPending}
                className="w-full"
              />
            )}
          />
          {errors.password_confirmation && (
            <FieldError>{errors.password_confirmation.message}</FieldError>
          )}
        </Field>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Spinner data-icon="inline-start" /> : <KeyRound />}
          {t("buttons.reset_password")}
        </Button>
      </form>
    </React.Fragment>
  );
}
