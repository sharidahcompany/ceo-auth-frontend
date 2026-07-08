import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return <p> {t("name")} </p>;
}
