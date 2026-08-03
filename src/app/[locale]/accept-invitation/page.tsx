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
    user_id?: string;
    tenant_id?: string;
    expires?: string;
    signature?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations("messages");
  const params = await searchParams;

  const userId = params.user_id;
  const hasSignatureParams =
    userId && params.tenant_id && params.expires && params.signature;

  // Laravel validates signed URLs against the raw, literal query string order
  // (it sorts params alphabetically when signing but does NOT re-sort when
  // verifying) — so these must be rebuilt in alphabetical key order or every
  // signature check fails even though the values are correct.
  const queryString = hasSignatureParams
    ? new URLSearchParams({
        expires: params.expires!,
        signature: params.signature!,
        tenant_id: params.tenant_id!,
        user_id: params.user_id!,
      }).toString()
    : "";

  const verification = hasSignatureParams
    ? await verifyInvitationAction(queryString)
    : null;

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
            <AcceptInvitationForm queryString={queryString} userId={userId!} />
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
