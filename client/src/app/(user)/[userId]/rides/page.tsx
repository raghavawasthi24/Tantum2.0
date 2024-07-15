import React from "react";
import Rides from "../../rides/components/rides";
import RidesSection from "./rides-section";
import { getRideDetails } from "@/actions/User/get-user-rides";

export  default async function Page({params}:{params: {userId: string}}) {

  const rides = await getRideDetails({ id: params.userId });

  console.log("rides", rides.rideInfo);
  return (
    <div className="grid gap-2">
      <h1 className="font-bold text-3xl pt-10 pb-3 px-6 bg-blue-400 text-white">
        Rides
      </h1>

      <RidesSection rides={rides.rideInfo} userId= {params.userId}/>
    </div>
  );
}
