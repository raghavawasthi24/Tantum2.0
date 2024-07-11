"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../../schemas/Login";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { loginAction } from "@/actions/Auth/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function EmailPasswordLogin() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      // Call signIn with "credentials" provider
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
    
     if(res?.status==200){
        toast.success("Login successful");
        router.back();
      }
      else {
        toast.error("Invalid Credentials");
      }
    } catch (error: any) {
      console.log(JSON.parse(error));
      toast.error(error.message || "An error occurred");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="w-3 h-3 flex justify-center items-center"
            />
            <label
              htmlFor="terms"
              className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="flex items-center text-xs "
          >
            <LiaQuestionCircleSolid className="w-4 h-4 mr-1" />
            Forgot Password
          </Link>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
