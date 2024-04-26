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
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function LandingPage() {
  const form = useForm();
  const [searchCity, setSearchCity] = useState([]);

  const cityList = ["Delhi", "Mumbai", "Hyderabad"];

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <section className="mt-[56px] py-20 flex flex-col items-center clip-custom bg-ai gap-12">
      <div className="flex flex-col items-center gap-2 text-white">
        <p className="text-6xl font-bold"> Book, Ride, Enjoy!</p>
        <p className="font-medium ">
          Unlock Your Travel Potential: Instant Bookings, Comfortable Rides,
          Endless Enjoyment!
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <Command className="rounded-lg border shadow-md" open={false}>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      {cityList.map((city) => (
                        <CommandItem key={city} value={city}>
                          {city}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command> */}
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div className="rounded-sm flex">
        <div className="relative border-r">
          <TbLocationFilled className="absolute left-2 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Source"
            className="pl-8 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-11"
          />
        </div>
        <div className="relative">
          <MdLocationPin className="absolute left-2 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Destination"
            className="pl-8 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-11"
          />
        </div>

        <div className="relative border-;">
          <FaCalendarAlt className="absolute left-2 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-8 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-11"
          />
        </div>
        <div className="relative w-[100px]">
          <BsPersonFill className="absolute left-2 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="People"
            className="pl-8 focus-visible:ring-0 rounded-none focus-visible:ring-offset-0 h-11"
          />
        </div>
        <Button
          variant="outline"
          size="lg"
          className="bg-red-500 text-white border-none rounded-none h-11"
        >
          Search
        </Button>
      </div>
    </section>
  );
}
