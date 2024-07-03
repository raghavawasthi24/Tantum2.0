import Header from "@/components/shared/Header/Header";
import React from "react";
import RideHeader from "./components/ride-header";
import { Filter } from "lucide-react";
import FilterRides from "./components/filter-rides";
import Rides from "./components/rides";

export default function page() {
  return (
    <div className="min-h-screen">
      <Header />
      <RideHeader />
      <div className="flex justify-center gap-8 p-4">
        {/* <FilterRides /> */}
        <Rides />
      </div>
    </div>
  );
}
