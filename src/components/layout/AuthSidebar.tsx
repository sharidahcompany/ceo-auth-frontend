import { useTranslations } from "next-intl";
import React from "react";
import { FaChartLine } from "react-icons/fa6";
import { PiProjectorScreen } from "react-icons/pi";
import { MdOutlineAccountBalance } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiGlobe } from "react-icons/bi";
import { DiCoffeescript } from "react-icons/di";
import { GiMagnifyingGlass } from "react-icons/gi";
import { RiOrganizationChart } from "react-icons/ri";
import { ThreeDMarquee } from "../ui/3d-marquee";
import Image from "next/image";

export interface AuthSidebarItem {
  title: string;
  icon: React.ReactNode;
}

export default function AuthSidebar() {
  const t = useTranslations();

  const items: AuthSidebarItem[] = [
    {
      title: t("auth_sidebar.financial_services"),
      icon: <FaChartLine />,
    },
    {
      title: t("auth_sidebar.project_management"),
      icon: <PiProjectorScreen />,
    },
    {
      title: t("auth_sidebar.accounting"),
      icon: <MdOutlineAccountBalance />,
    },
    {
      title: t("auth_sidebar.hr"),
      icon: <GiThreeFriends />,
    },
    {
      title: t("auth_sidebar.reports"),
      icon: <TbReportSearch />,
    },
    {
      title: t("auth_sidebar.e_invoicing"),
      icon: <LiaFileInvoiceDollarSolid />,
    },
    {
      title: t("auth_sidebar.websites"),
      icon: <BiGlobe />,
    },
    {
      title: t("auth_sidebar.buffet"),
      icon: <DiCoffeescript />,
    },
    {
      title: t("auth_sidebar.auditing"),
      icon: <GiMagnifyingGlass />,
    },
    {
      title: t("auth_sidebar.org_structure"),
      icon: <RiOrganizationChart />,
    },
    {
      title: t("auth_sidebar.financial_services"),
      icon: <FaChartLine />,
    },
    {
      title: t("auth_sidebar.project_management"),
      icon: <PiProjectorScreen />,
    },
    {
      title: t("auth_sidebar.accounting"),
      icon: <MdOutlineAccountBalance />,
    },
    {
      title: t("auth_sidebar.hr"),
      icon: <GiThreeFriends />,
    },
    {
      title: t("auth_sidebar.reports"),
      icon: <TbReportSearch />,
    },
    {
      title: t("auth_sidebar.e_invoicing"),
      icon: <LiaFileInvoiceDollarSolid />,
    },
    {
      title: t("auth_sidebar.websites"),
      icon: <BiGlobe />,
    },
    {
      title: t("auth_sidebar.buffet"),
      icon: <DiCoffeescript />,
    },
    {
      title: t("auth_sidebar.auditing"),
      icon: <GiMagnifyingGlass />,
    },
    {
      title: t("auth_sidebar.org_structure"),
      icon: <RiOrganizationChart />,
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <ThreeDMarquee items={items} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 text-center">
        <div className="flex justify-center items-center bg-black rounded px-1 py-3">
          <Image
            src="/images/logo.webp"
            alt="logo"
            width={100}
            height={100}
            className="w-15 h-auto"
          />
        </div>

        <h1 className="text-3xl  ">{t("meta.title")}</h1>
        <p className="text-lg">{t("meta.description")}</p>
      </div>
    </div>
  );
}
