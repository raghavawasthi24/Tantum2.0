import React from "react";
import RideCard from "./ride-card";

export default function Rides() {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="w-2/3 grid py-4 gap-4">
      {arr.map((item, index) => (
        <RideCard key={index} />
      ))}
    </div>
  );
}
