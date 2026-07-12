"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { RegisterData } from "@/types";
import { useTransition } from "react";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { getRegisterSchema } from "@/schemas/register";
import { registerAction } from "@/actions/registerAction";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const t = useTranslations();

  const router = useRouter();

  const registerSchema = getRegisterSchema(t);

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(data: RegisterData) {
    startTransition(async () => {
      const response = await registerAction(data);

      if (!response.success) {
        toast.error(response.firstError || response.error, {
          position: "bottom-right",
        });
      } else {
        toast.success(response.data?.message, {
          position: "bottom-right",
        });

        router.push("/confirm-email");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel>{t("attributes.username")}</FieldLabel>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("attributes.username")}
              type="text"
            />
          )}
        />
        {errors.username?.message && (
          <FieldError>{errors.username.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel>{t("attributes.first_name")}</FieldLabel>
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("attributes.first_name")}
              type="text"
            />
          )}
        />
        {errors.first_name?.message && (
          <FieldError>{errors.first_name.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel>{t("attributes.last_name")}</FieldLabel>
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("attributes.last_name")}
              type="text"
            />
          )}
        />
        {errors.last_name?.message && (
          <FieldError>{errors.last_name.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel>{t("attributes.phone")}</FieldLabel>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder={t("attributes.phone")} type="text" />
          )}
        />
        {errors.phone?.message && (
          <FieldError>{errors.phone.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel>{t("attributes.email")}</FieldLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder={t("attributes.email")} type="text" />
          )}
        />
        {errors.email?.message && (
          <FieldError>{errors.email.message}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>{t("attributes.password")}</FieldLabel>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="••••••••" type="password" />
          )}
        />
        {errors.password?.message && (
          <FieldError>{errors.password.message}</FieldError>
        )}
      </Field>
      <Field>
        <FieldLabel>{t("attributes.password_confirmation")}</FieldLabel>
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("attributes.password_confirmation")}
              type="password"
            />
          )}
        />
        {errors.password_confirmation?.message && (
          <FieldError>{errors.password_confirmation.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner data-icon="inline-start" /> : <LogIn />}{" "}
        {t("buttons.register")}
      </Button>
    </form>
  );
}
