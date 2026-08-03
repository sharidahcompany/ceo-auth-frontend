"use client";

import React, { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AcceptInvitationData } from "@/types";
import { getAcceptInvitationSchema } from "@/schemas/acceptInvitation";
import { completeInvitationAction } from "@/actions/invitationAction";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

type Props = {
  queryString: string;
  userId: string;
};

export default function AcceptInvitationForm({ queryString, userId }: Props) {
  const t = useTranslations();
  const acceptInvitationSchema = getAcceptInvitationSchema(t);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationData>({
    resolver: zodResolver(acceptInvitationSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(data: AcceptInvitationData) {
    startTransition(async () => {
      const response = await completeInvitationAction(
        queryString,
        userId,
        data.password,
        data.password_confirmation,
      );

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col justify-center items-center gap-5"
    >
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
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
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
        {t("buttons.accept_invitation")}
      </Button>
    </form>
  );
}
