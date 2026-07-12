import Logo from "@/components/common/Logo";
import ConfirmEmailForm from "@/components/features/confirm-email/ConfirmEmailForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("messages");

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1  ">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl text-center">
            {t("confirm_email.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("confirm_email.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmEmailForm />
          <div className="p-5 pb-0 flex justify-center items-center text-center gap-1">
            <p className="text-center text-sm text-muted-foreground">
              {t("register.already_have_account")}
            </p>{" "}
            <Link href="/login">{t("register.login")}</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
