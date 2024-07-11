"use client";
import React, { useEffect } from "react";
import FindRideForm from "@/components/FindRideForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  // const session = await  getServerSession(authOptions);
  const { data: session } = useSession();
  console.log("session on landing", session);

  const router = useRouter();
  
  useEffect(() => {
   router.refresh();
  }, []);

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

      <FindRideForm className="w-3/4" defaultValues={{}} />
    </section>
  );
}
