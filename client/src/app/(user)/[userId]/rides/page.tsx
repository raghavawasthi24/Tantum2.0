import React from "react";
import Rides from "../../rides/components/rides";
import RidesSection from "./rides-section";

export default function Page() {
  return (
    <div className="grid gap-2">
      <h1 className="font-bold text-3xl pt-10 pb-3 px-6 bg-blue-400 text-white">
        Rides
      </h1>

      <RidesSection />
    </div>
  );
}
