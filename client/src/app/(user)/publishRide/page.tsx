"use client";
import { postRide } from "@/actions/Rides/ride";
import RegisterRide from "@/components/shared/Header/components/register-ride";
import { Form } from "@/components/ui/form";
import { PublishRideSchema } from "@/schemas/Ride";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Page() {
  const form = useForm<z.infer<typeof PublishRideSchema>>({
    resolver: zodResolver(PublishRideSchema),
    defaultValues: {
      ownerId: "6659c6904364fe2614b46de2",
    },
  });

  const router = useRouter();

  return (
    <Form {...form}>
      <div className="flex h-screen justify-center bg-blue-50">
        <form
          onSubmit={form.handleSubmit(async (data) => {
            try {
              console.log(data)
              const res = await postRide(data);
              toast.success(res.message);
              router.push("/");
            } catch (error: any) {
              toast.error(error.message);
            }
          })}
          className="flex flex-col bg-white items-center w-[500px] mt-[5rem] h-fit"
        >
          <div className="h-[10px] bg-black w-full"></div>
          <RegisterRide form={form} />
        </form>
      </div>
    </Form>
  );
}
