"use client";
import React from "react";
import BasicDetails from "./basic-details";
import ImageUpload from "@/components/shared/AvatarSelector";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { updateUserDetails } from "@/actions/User/update-user-details";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { UserDetailsSchema } from "@/schemas/user";


export default function Page() {
  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      email: Cookies.get("email") || ""
    },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof UserDetailsSchema>) {
    try{
      const res = await updateUserDetails(data);
    if(res){
      toast.success("User details updated successfully");
      router.push("/");  
    }}
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
        className="w-full py-20 px-6 flex flex-col md:flex-row items-center gap-4"
      >
        <ImageUpload form={form} image={""}/>
        <BasicDetails form={form} />
      </form>
    </Form>
  );
}
