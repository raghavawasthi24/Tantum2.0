import React from "react";
import EmailPasswordLogin from "@/app/auth/login/components/email-password-login";
import GoogleLogin from "@/components/shared/Auth/google-login";
import AuthHeader from "@/components/shared/AuthHaeder/auth-header";
import MsLogin from "@/components/shared/Auth/ms-login";
import GitLogin from "../../../components/shared/Auth/git-login";
import Link from "next/link";

export default function Page() {
  return (
    <section className="h-screen flex items-center bg-slate-200">
      <div className=" p-8 w-[450px] mx-auto flex flex-col gap-4 bg-background">
        <AuthHeader />
        <EmailPasswordLogin />
        <p className="text-center text-sm">
          Don&apos;t have an account?
          <Link href="/auth/register" className="mx-1 text-primary font-medium">
            Sign up
          </Link>
        </p>
        <p className="text-center text-muted text-xs">
          or you can continue with
        </p>
        <div className="flex gap-2">
          <GoogleLogin />
          <MsLogin />
          <GitLogin />
        </div>
      </div>
    </section>
  );
}
