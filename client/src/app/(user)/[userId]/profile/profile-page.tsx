"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDetailsSchema } from "@/schemas/user";
import ImageUpload from "@/components/shared/AvatarSelector";
import BasicInfoForm from "./basic-info";
import { Form } from "@/components/ui/form";
import { updateUserDetails } from "@/actions/User/update-user-details";
import toast from "react-hot-toast";

export default function ProfilePage({
  formValues,
}: {
  formValues: z.infer<typeof UserDetailsSchema>;
}) {
  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
        ...formValues,
        dob: new Date(formValues.dob),
    },
  });

  async function onSubmit(data: z.infer<typeof UserDetailsSchema>) {
    console.log(data);
    try{
        const res = await updateUserDetails(data);
       if(res){
         toast.success("User details updated successfully");
       }
    }
    catch(error: any){
         console.log(error);
         const errorMessage = error.message || "Something went wrong!";
         toast.error(errorMessage);
}
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 mx-auto flex gap-8 py-5"
      >
        <ImageUpload form={form} image={formValues?.avatar || null} />
        <BasicInfoForm form={form} />
      </form>
    </Form>
  );
}
