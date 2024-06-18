"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TbLocationFilled } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ComboBox } from "@/components/shared/ComboxBox";
import { CustomizedCalendar } from "@/components/shared/CustomizedCalender";
import { cities } from "@/constants";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();
  console.log(session);
  const form = useForm();
  const [searchCity, setSearchCity] = useState([]);

  const onSubmit = (data: any) => {
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
                  className="w-full md:w-[150px]"
                  options={cities}
                  name="Source"
                  icon={<TbLocationFilled />}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <ComboBox
                  className="w-full md:w-[150px]"
                  options={cities}
                  name="Destination"
                  icon={<MdLocationPin />}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
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
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="relative md:w-[100px] w-full">
                  <BsPersonFill className="absolute left-2 top-3.5 h-4 w-4 " />
                  <Input
                    placeholder="People"
                    className="pl-8 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-10 placeholder:text-foreground"
                  />
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
