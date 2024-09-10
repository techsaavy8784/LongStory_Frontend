import { LAYOUT, Props } from "@/constants";
import MainLayout from "./mainlayout";
import MinimalLayout from "./minimallayout";
import AuthGuard from "../guard/authguard";
import GuestGuard from "../guard/guestguard";
import ProgressGuard from "../guard/progressGuard";
import MailGuard from "../guard/mailguard";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Layout({ variant = LAYOUT.main, children }: Props) {
  switch (variant) {
    case LAYOUT.authprogress:
      return (
        <ProgressGuard>
          <MinimalLayout>{children}</MinimalLayout>
        </ProgressGuard>
      );
    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <MinimalLayout>{children}</MinimalLayout>
        </GuestGuard>
      );

    case LAYOUT.main:
      return (
        <AuthGuard>
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      );
    case LAYOUT.mail:
      return (
        <MailGuard>
          <MainLayout>{children}</MainLayout>
        </MailGuard>
      );
    default:
      return (
        <AuthGuard>
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      );
  }
}
