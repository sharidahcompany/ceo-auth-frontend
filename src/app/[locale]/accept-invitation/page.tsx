import Logo from "@/components/common/Logo";
import AcceptInvitationForm from "@/components/features/accept-invitation/AcceptInvitationForm";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { verifyInvitationAction } from "@/actions/invitationAction";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations("messages");
  const params = await searchParams;

  const token = params.token;

  const verification = token ? await verifyInvitationAction(token) : null;

  const isValid = Boolean(verification?.success);

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl text-center">
            {isValid
              ? t("accept_invitation.title")
              : t("accept_invitation.invalid_title")}
          </CardTitle>
          <CardDescription className="text-center">
            {isValid
              ? t("accept_invitation.description")
              : t("accept_invitation.invalid_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isValid ? (
            <AcceptInvitationForm token={token!} />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Link href="/login" className={buttonVariants({ className: "w-full" })}>
                {t("login.title")}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
