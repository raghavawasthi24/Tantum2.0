"use client";
import React from "react";
import BasicDetails from "./basic-details";
import ImageUpload from "@/components/shared/AvatarSelector";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

export const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().optional(),
  dob: z.date(),
  gender: z.string(),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full py-20 px-6 flex flex-col md:flex-row items-center gap-4"
      >
        <ImageUpload form={form}/>
        <BasicDetails form={form} />
      </form>
    </Form>
  );
}
