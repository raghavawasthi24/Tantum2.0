"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TbLocationFilled } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { ComboBox } from "@/components/shared/ComboxBox";
import { CustomizedCalendar } from "@/components/shared/CustomizedCalender";
import { cities } from "@/constants";
import { useSession } from "next-auth/react";
import { RideSchema } from "@/schemas/Ride";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LandingPage() {
  const { data: session } = useSession();
  console.log(session);

  const form = useForm<z.infer<typeof RideSchema>>({
    resolver: zodResolver(RideSchema),
  });

  const onSubmit = (data: z.infer<typeof RideSchema>) => {
    console.log(data);
  };

  return (
    <section className="mt-[56px] py-20 flex flex-col items-center clip-custom bg-ai gap-12">
      <div className="flex flex-col items-center gap-2 text-white">
        <p className="sm:text-6xl text-4xl font-bold text-center">
          {" "}
          Book, Ride, Enjoy!
        </p>
        <p className="font-medium text-center">
          Unlock Your Travel Potential: Instant Bookings, Comfortable Rides,
          Endless Enjoyment!
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/4 flex md:flex-row flex-col justify-center"
        >
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem className="">
                <ComboBox
                  name="source"
                  className="w-full md:w-[150px]"
                  options={cities}
                  icon={<TbLocationFilled />}
                  placeholder="Source"
                  form={form}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ComboBox
                    className="w-full md:w-[150px]"
                    options={cities}
                    name="destination"
                    icon={<MdLocationPin />}
                    placeholder="Destination"
                    form={form}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <CustomizedCalendar
                  field={field}
                  className="w-full md:w-[150px]"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="relative md:w-[150px] w-full">
                  <BsPersonFill className="absolute left-2 top-3.5 h-4 w-4 " />
                  <FormControl>
                    <Input
                      placeholder="People"
                      className="pl-8 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-10 placeholder:text-foreground"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-destructive hover:bg-destructive">
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
