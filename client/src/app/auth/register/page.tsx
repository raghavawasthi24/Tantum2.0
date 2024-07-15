"use client";
import React from "react";
import GoogleLogin from "@/components/shared/Auth/google-login";
import AuthHeader from "@/components/shared/AuthHaeder/auth-header";
import MsLogin from "@/components/shared/Auth/ms-login";
import GitLogin from "../../../components/shared/Auth/git-login";
import Link from "next/link";
import EmailPasswordLogin from "./components/email-password-login";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/Login";
import { registerAction } from "@/actions/Auth/auth";
import { z } from "zod";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Form } from "@/components/ui/form";
import RegisterStepper from "./components/register-stepper";


export default function Page() {
    const router = useRouter();

    const form = useForm({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: null,
        gender: "",
      },
    });

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
      try {
        const res = await registerAction(data);
        console.log(res);
        toast.success(res);
        Cookies.set("email", data.email, { expires: 1 }); // The cookie will expire in 1 day
        router.push("/auth/verify-otp");
      } catch (error: any) {
        const errorMessage = error.message || "Something went wrong!";
        toast.error(errorMessage);
      }
    };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <section className="h-screen flex items-center sm:bg-slate-200">
          <div className=" p-8 w-[450px] mx-auto flex flex-col gap-4 bg-background">
            <AuthHeader />
            <RegisterStepper form={form}/>
            <p className="text-center text-sm">
              Already have an account?{""}
              <Link
                href="/auth/login"
                className="mx-1 text-primary font-medium"
              >
                Sign in
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
      </form>
    </Form>
  );
}
