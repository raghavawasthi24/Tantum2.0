"use client";
import React, { useEffect, useState } from "react";
import Rides from "./components/rides";
import { getRide } from "@/actions/Rides/ride";
import FindRideForm from "@/components/FindRideForm";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { toDate } from "date-fns";

interface Props {
  source: string;
  destination: string;
  date: Date;
  seatsVacant: number;
};


export default function Page() {

  const params = useSearchParams();
  const [allRides, setAllRides] = useState<Props[]>([]);



  useEffect(()=>{

    const getAllRides = async() =>{
        try {
          const rides: Props[] = await getRide({
            source: params.get("source") || "",
            destination: params.get("destination") || "",
            date: new Date(params.get("date") || new Date()),
            seatsVacant: parseInt(params.get("seatsVacant") || "0"),
          });
          console.log("rides", rides);
          setAllRides(rides.data);
        } catch (error) {
          console.error("Failed to fetch rides:", error);
        }
    }

    getAllRides();
   
  },[])
   

  return (
    <div className="min-h-screen p-4">
      <FindRideForm  className="w-full hidden md:flex mx-auto" />
      <div className="flex md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full"
            >
              <IoIosSearch className="w-4 h-4 mr-2"/>
              Delhi to Mumbai - 19 March, 2024</Button>
          </DrawerTrigger>
          <DrawerContent>
            <FindRideForm  className="w-full mx-auto py-2" />
          </DrawerContent>
        </Drawer>
      </div>
      <div className="flex justify-center gap-8 py-4">
        {/* <FilterRides /> */}
        <Rides allRides={allRides}/>
      </div>
    </div>
  );
}
