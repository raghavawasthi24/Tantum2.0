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


export const FormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
  otp: z.string().min(6, {
    message: "Enter correct OTP",
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: Cookies.get("email") || "",
      otp: "",
    },
  });

  const [timeout, setTimeout] = useState(false);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   try {
     const res = await VerifyOtpAction(data);
     toast.success(res);
     router.push("/");
   } catch (error: any) {
    console.log(error);
     const errorMessage = error.message || "Something went wrong!";
     toast.error(errorMessage);
   }
  }

  async function resendCode() {
    try {
      const res= await resendOtpAction({ email: form.getValues("email") });
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
        className="w-screen h-screen flex flex-col gap-4 justify-center items-center"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-1/3 flex flex-col ">
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
                    <InputOTPSlot index={0} className="w-16 h-16" />
                    <InputOTPSlot index={1} className="w-16 h-16" />
                    <InputOTPSlot index={2} className="w-16 h-16" />
                    <InputOTPSlot index={3} className="w-16 h-16" />
                    <InputOTPSlot index={4} className="w-16 h-16" />
                    <InputOTPSlot index={5} className="w-16 h-16" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="w-1/3 flex gap-4">
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
      </form>
    </Form>
  );
}