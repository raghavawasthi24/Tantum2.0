"use client";
import React, { useEffect } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ComboBox } from "@/components/shared/ComboxBox";
import { CustomizedCalendar } from "@/components/shared/CustomizedCalender";
import { cities } from "@/constants";
import { RideSchema } from "@/schemas/Ride";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

export default function FindRideForm({ className, defaultValues }: any) {
  const form = useForm<z.infer<typeof RideSchema>>({
    resolver: zodResolver(RideSchema),
    defaultValues:{
      date:defaultValues.date,
      seatsVacant:defaultValues.seatsVacant
    }
  });

  const router = useRouter();
  const path= usePathname()
  // const onSubmit = async (data: z.infer<typeof RideSchema>) => {
  //   try {
  //     const res = await getRide(data);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof RideSchema>) => {
    try {
      router.push(
        `/rides?source=${data.source}&destination=${data.destination}&date=${data.date}&seatsVacant=${data.seatsVacant}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex md:flex-row flex-col justify-center", className)}
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
                icon={<TbLocationFilled className="text-green-800 w-4 h-4" />}
                placeholder="Source"
                form={form}
                defaultValue={defaultValues.source}
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
                  icon={<MdLocationPin className="text-red-800 w-4 h-4" />}
                  placeholder="Destination"
                  form={form}
                  defaultValue={defaultValues.destination}
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seatsVacant"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="relative md:w-[150px] w-full">
                <BsPersonFill className="absolute left-4 top-3.5 h-4 w-4" />
                <FormControl>
                  <Input
                    placeholder="People"
                    className="pl-10 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-10 placeholder:text-foreground"
                    {...field}
                    type="number"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        {path!="/rides"? <Button type="submit" className="bg-destructive hover:bg-destructive">
          <IoIosSearch className="w-4 h-4 mr-1" />
          Find
        </Button>:null}
       
      </form>
    </Form>
  );
}
