"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Field, FieldError } from "@/components/ui/field";
import { ConfirmEmailData } from "@/types";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { getConfirmEmailSchema } from "@/schemas/confirmEmail";
import { confirmEmailAction } from "@/actions/confirmEmailAction";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resendConfirmEmailAction } from "@/actions/resendConfirmEmailAction";

export default function ConfirmEmailForm() {
  const t = useTranslations();
  const params = useParams();
  const currentLocale = params?.locale || "ar";
  const confirmEmailSchema = getConfirmEmailSchema(t);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmEmailData>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: ConfirmEmailData) {
    startTransition(async () => {
      const response = await confirmEmailAction(data);

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

        if (tenants && tenants.length > 0) {
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

  function resendCode() {
    startTransition(async () => {
      const response = await resendConfirmEmailAction();
      if (!response.success) {
        toast.error(response.firstError || response.error, {
          position: "bottom-right",
        });
      } else {
        toast.success(response.data?.message, {
          position: "bottom-right",
        });
      }
    });
  }

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full   flex flex-col justify-center items-center gap-5"
      >
        <Field className="w-full flex flex-col items-center justify-center">
          {isPending ? (
            <div className="flex items-center justify-center p-4">
              <Spinner />
            </div>
          ) : (
            <div className="flex items-center justify-center p-4" dir="ltr">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    onComplete={() => handleSubmit(onSubmit)()}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>
          )}
          {errors.otp && <FieldError>{errors.otp.message}</FieldError>}
        </Field>
      </form>
      <div className="flex items-center justify-center gap-1">
        <p className="text-center text-sm text-muted-foreground">
          {t("messages.confirm_email.resend_message")}
        </p>
        <button type="button" onClick={resendCode}>
          {t("messages.confirm_email.resend")}
        </button>
      </div>
    </React.Fragment>
  );
}
