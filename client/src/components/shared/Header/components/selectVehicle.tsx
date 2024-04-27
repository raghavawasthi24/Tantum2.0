import Image from "next/image";
import React from "react";

export default function SelectVehicle() {
  return (
    <div className="grid gap-4">
      <button className=" w-full border border-muted rounded-md flex justify-between px-4 py-2">
        <div className="text-start">
          <p className="font-bold">Motorbike (Two wheeler)</p>
          <p className="text-sm">You can drive a bike or scooter.</p>
        </div>
        <Image src="/assets/bike.jpg" alt="Vehicle" width={100} height={200} />
      </button>
      <button className=" w-full border border-muted rounded-md flex justify-between px-4 py-2">
        <div className="text-start">
          <p className="font-bold">Car (Four wheeler)</p>
          <p className="text-sm">You can drive a car or mini cooper.</p>
        </div>
        <Image src="/assets/car.jpg" alt="Vehicle" width={100} height={200} />
      </button>
    </div>
  );
}
