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

export default function EmailPasswordLogin() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
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
