"use client";
import React from 'react';
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
import { getRide } from "@/actions/Rides/ride";
import { useForm } from "react-hook-form";

import { ComboBox } from "@/components/shared/ComboxBox";
import { CustomizedCalendar } from "@/components/shared/CustomizedCalender";
import { cities } from "@/constants";
import { RideSchema } from "@/schemas/Ride";
import { cn } from '@/lib/utils';

export default function FindRideForm({onSubmit, className}:any) {
    const form = useForm<z.infer<typeof RideSchema>>({
      resolver: zodResolver(RideSchema),
    });

    
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex md:flex-row flex-col justify-center",className)}
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
  );
}
