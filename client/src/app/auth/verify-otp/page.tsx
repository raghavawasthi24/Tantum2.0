"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Countdown from "@/components/shared/Countdown/countdown";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import toast from "react-hot-toast";
import { VerifyOtpAction, resendOtpAction } from "@/actions/Auth/auth";
import Cookies from "js-cookie";
import { VerifyOtpSchema } from "@/schemas/Login";
import { signIn } from "next-auth/react";



export default function Page() {
  const form = useForm<z.infer<typeof VerifyOtpSchema>>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      email: Cookies.get("email") || "",
      otp: "",
    },
  });

  const [timeout, setTimeout] = useState(false);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof VerifyOtpSchema>) {
     try {
       // Call signIn with "credentials" provider
       const res = await signIn("credentials", {
         redirect: false,
         ...data,
         isLogin: false,
       });

       if (res?.status == 200) {
         toast.success("Login successful");
        //  Cookies.set("email", data.email);
         router.push("/");
       } else {
         toast.error("Invalid Credentials");
       }
     } catch (error: any) {
       console.log(JSON.parse(error));
       toast.error(error.message || "An error occurred");
     }
  }

  async function resendCode() {
    try {
      const res = await resendOtpAction({ email: form.getValues("email") });
      toast.success(res);
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen h-screen flex flex-col gap-4 justify-center items-center px-4"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className=" flex flex-col items-center">
              <FormLabel className="text-xl font-semibold">
                One-Time Password
              </FormLabel>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="sm:w-16 sm:h-16" />
                    <InputOTPSlot index={1} className="sm:w-16 sm:h-16" />
                    <InputOTPSlot index={2} className="sm:w-16 sm:h-16" />
                    <InputOTPSlot index={3} className="sm:w-16 sm:h-16" />
                    <InputOTPSlot index={4} className="sm:w-16 sm:h-16" />
                    <InputOTPSlot index={5} className="sm:w-16 sm:h-16" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-[300px] sm:w-[400px] flex gap-4">
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
        <Button
          variant="ghost"
          disabled={!timeout}
          onClick={() => setTimeout(false)}
          type="button"
          className="text-red-500"
        >
          {timeout ? (
            <div onClick={resendCode}>Resend Code</div>
          ) : (
            <div className="flex">
              Resend Code in{" "}
              <Countdown
                seconds={20}
                setTimeout={setTimeout}
                timeout={timeout}
              />
              s
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
