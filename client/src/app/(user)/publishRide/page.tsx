"use client";
import Header from '@/components/shared/Header/Header'
import RegisterRide from '@/components/shared/Header/components/register-ride';
import { Form } from '@/components/ui/form';
import { PublishRideSchema } from '@/schemas/Ride';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function page() {
   const form = useForm<z.infer<typeof PublishRideSchema>>({
     resolver: zodResolver(PublishRideSchema),
     defaultValues: {
       source: "",
       destination: "",
       date: "",
       time: "",
       seatsVacant: 0,
       price: 0,
     },
   });
  return (
      <Form {...form}>
        <div className='flex h-screen'>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(data);
            })}
            className='flex justify-center w-full lg:w-1/2 mt-[5rem]'
          >
            <RegisterRide form={form} />
          </form>
            <img src='/assets/car-pooling.png' alt='Ride' className='w-1/2 hidden lg:block'/>
        </div>
      </Form>
  );
}
