import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FaCar } from "react-icons/fa";

export default function SelectVehicle({form}:any) {
   const [person, setPerson] = useState(1);
  const vehicleType = [
    {
      key: "2wheeler",
      name: "2 - Wheeler",
      icon: <FaCar className="w-24 h-24 text-gray-400" />,
    },
    {
      key: "4wheeler",
      name: "4 - Wheeler",
      icon: <FaCar className="w-24 h-24 text-gray-400" />,
    },
  ];
   const incrementperson = () => {
     if (person < 5) setPerson(person + 1);
   };
   const decrementperson = () => {if(person>1) setPerson(person - 1)};
  return (
    <section className="flex flex-col items-start gap-12">
      <div className="flex gap-4 w-fit">
        {vehicleType.map((mode) => {
          return (
            <button
              className="w-32 h-32 flex flex-col justify-center items-center transition-all hover:bg-accent p-4 border rounded-md"
              key={mode.key}
            >
              {mode.icon}
              <div className="text-start">
                <p className="font-bold">{mode.name}</p>
              </div>
            </button>
          );
        })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-md font-semibold">Number of seats vacant</h3>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={decrementperson}>
                <CiCircleMinus className="h-6 w-6" />
              </Button>
              <span className="text-2xl font-bold">{person}</span>
              <Button variant="ghost" onClick={incrementperson}>
                <CiCirclePlus className="h-6 w-6" />
              </Button>
            </div>
          </div>
    
        </div>
    </section>
  );
}
