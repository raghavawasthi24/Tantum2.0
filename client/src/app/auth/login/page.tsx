import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import EmailPasswordLogin from "@/app/auth/login/components/EmailPasswordLogin";
import { handleError, handleSuccess } from "./function";
import AuthHeader from "@/components/shared/AuthHaeder/auth-header";

export default function Page() {
  return (
    <section className="h-screen flex items-center">
      <AuthHeader />
      <div className="shadow-md p-8 w-[450px] mx-auto flex flex-col gap-4 bg-white">
        <p className="text-2xl font-semibold">Sign In</p>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        <p className="text-center text-muted text-xs">or login through</p>
        <EmailPasswordLogin />
      </div>
    </section>
  );
}
