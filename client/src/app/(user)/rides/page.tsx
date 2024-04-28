import Header from "@/components/shared/Header/Header";
import React from "react";
import RideHeader from "./components/ride-header";

export default function page() {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 h-screen">
      <Header />
      <RideHeader />
    </div>
  );
}
