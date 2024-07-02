"use client";
import RegisterRide from '@/components/shared/Header/components/register-ride';
import { Form } from '@/components/ui/form';
import { PublishRideSchema } from '@/schemas/Ride';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Page() {
   const form = useForm<z.infer<typeof PublishRideSchema>>({
     resolver: zodResolver(PublishRideSchema),
     defaultValues: {
       source: "",
       destination: "",
       date: "",
       time: "",
       seatsVacant: 0,
     },
   });
  return (
    <Form {...form}>
      <div className="flex h-screen justify-center">
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
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
