"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { UserDetailsSchema } from "@/schemas/user";
import ImageUpload from "@/components/shared/AvatarSelector";
import BasicInfoForm from "./basic-info";
import { Form } from "@/components/ui/form";

export default function page() {
  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      email: "raghavawasthi240@gmail.com",
      firstName: "Raghav",
      lastName: "Awasthi",
      dob: new Date("1999-08-24"),
      gender: "male"
    },
  });
  function onSubmit(data: z.infer<typeof UserDetailsSchema>) {}
  return (
    <div>
      <h1 className="font-bold text-3xl pt-10 pb-3 px-6 bg-blue-400 text-white">
        Profile
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 mx-auto flex gap-8 py-5"
        >
          <ImageUpload form={form} />
          <BasicInfoForm form={form} />
        </form>
      </Form>
    </div>
  );
}
