"use client";
import Header from "@/components/shared/Header/Header";
import React from "react";
import RideHeader from "./components/ride-header";
import { Filter } from "lucide-react";
import FilterRides from "./components/filter-rides";
import Rides from "./components/rides";
import { RideSchema } from "@/schemas/Ride";
import { getRide } from "@/actions/Rides/ride";
import { z } from "zod";
import FindRideForm from "@/components/FindRideForm";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoIosSearch } from "react-icons/io";

export default function page() {
   const onSubmit = async (data: z.infer<typeof RideSchema>) => {
     try {
       const res = await getRide(data);
       console.log(res);
     } catch (error) {
       console.log(error);
     }
   };
  return (
    <div className="min-h-screen p-4">
      <FindRideForm onSubmit={onSubmit} className="w-full hidden md:flex mx-auto" />
      <div className="flex md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full"
            >
              <IoIosSearch className="w-4 h-4 mr-2"/>
              Delhi to Mumbai - 19 March, 2024</Button>
          </DrawerTrigger>
          <DrawerContent>
            <FindRideForm onSubmit={onSubmit} className="w-full mx-auto py-2" />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex justify-center gap-8 py-4">
        {/* <FilterRides /> */}
        <Rides />
      </div>
    </div>
  );
}
