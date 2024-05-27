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
import { toast } from "@/components/ui/use-toast";
import Countdown from "@/components/shared/Countdown/countdown";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [timeout, setTimeout] = useState(false);
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-screen h-screen flex flex-col gap-4 justify-center items-center"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="w-1/3 flex flex-col ">
              <FormLabel className="text-xl font-semibold">
                One-Time Password
              </FormLabel>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
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
            <div>Resend Code</div>
          ) : (
            <div className="flex">
              Resend Code in{" "}
              <Countdown
                seconds={120}
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
