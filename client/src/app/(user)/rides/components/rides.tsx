import React from "react";
import RideCard from "./ride-card";

export default function Rides({ allRides, seatsVacant }: any) {
  return (
    <div className="w-full grid md:grid-cols-2 gap-4">
      {allRides.map((item: any, index: number) => (
        <RideCard key={index} ride={item} seatsVacant={seatsVacant}/>
      ))}
    </div>
  );
}
