"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { getLoginSchema } from "@/schemas/login";
import { LoginData } from "@/types";
import { useTransition } from "react";
import { loginAction } from "@/actions/loginAction";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginForm() {
  const t = useTranslations();

  const params = useParams();

  const currentLocale = params?.locale || "ar";

  const loginSchema = getLoginSchema(t);

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_token: false,
    },
  });

  function onSubmit(data: LoginData) {
    startTransition(async () => {
      const response = await loginAction(data);

      if (!response.success) {
        toast.error(response.firstError || response.error, {
          position: "bottom-right",
        });
      } else {
        toast.success(response.data?.message, {
          position: "bottom-right",
        });

        const apiData = response?.data as any;
        const token = apiData?.data?.token || apiData?.token;
        const tenants = apiData?.data?.tenants || apiData?.tenants;
        const tenantId = Array.isArray(tenants) && tenants.length > 0 ? tenants[0].id : "";

        const appendParams = (url: string) => {
          if (!token) return url;
          const separator = url.includes("?") ? "&" : "?";
          let newUrl = `${url}${separator}auth_token=${token}`;
          if (tenantId) {
            newUrl += `&tenant=${tenantId}`;
          }
          return newUrl;
        };

        if (response.data?.data?.tenants.length > 0) {
          const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL as string;
          window.location.href = appendParams(`${dashboardUrl}/${currentLocale}`);
        } else {
          const refererUrl = Cookies.get("redirect_origin");
          const targetUrl = refererUrl
            ? `${refererUrl}/${currentLocale}`
            : (process.env.NEXT_PUBLIC_CEO_LANDING_PAGE_URL as string);
          window.location.href = appendParams(targetUrl);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Field orientation="horizontal">
        <Controller
          name="remember_token"
          control={control}
          render={({ field: { value, onChange, ...restField } }) => (
            <Checkbox
              {...restField}
              id="remember_token"
              checked={value}
              onCheckedChange={onChange}
            />
          )}
        />
        <FieldLabel htmlFor="remember_token">
          {t("attributes.remember_token")}
        </FieldLabel>
        {errors.remember_token?.message && (
          <FieldError>{errors.remember_token.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? <Spinner data-icon="inline-start" /> : <LogIn />}{" "}
        {t("buttons.login")}
      </Button>
    </form>
  );
}
