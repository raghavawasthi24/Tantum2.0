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
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "@/actions/Auth/auth";
import toast from "react-hot-toast";

const FormSchema = z.object({
  email: z.string().email()
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   try{
    const res = await forgotPasswordAction(data);
    toast.success(res.message || "OTP sent successfully");
   }
    catch(error:any){
      toast.error(error.message || "An error occurred");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-screen flex flex-col gap-8 justify-center items-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <FormLabel className="font-semibold text-xl">
                Forgot Password
              </FormLabel>
              <FormDescription>
                A link will be sent on your registered email.
              </FormDescription>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/3">
          Submit
        </Button>
      </form>
    </Form>
  );
}
