import React from "react";
import { useSession } from "next-auth/react";
import FindRideForm from "@/components/FindRideForm";
import { RideSchema } from "@/schemas/Ride";
import { getRide } from "@/actions/Rides/ride";
import { z } from "zod";
import toast from "react-hot-toast";
import { getServerSession } from "next-auth";

export default function LandingPage() {
  // const { data: session } = getServerSession(authop);
  // console.log(session);


 
  return (
    <section className=" py-20 flex flex-col items-center clip-custom bg-ai gap-12">
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

      <FindRideForm className="w-3/4" defaultValues={{}}/>
    </section>
  );
}
