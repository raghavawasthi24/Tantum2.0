import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";

export default function SelectVehicle({form}:any) {
   const [person, setPerson] = useState(1);
  const vehicleType = [
    {
      key: "2wheeler",
      name: "2 - Wheeler",
      icon: <FaMotorcycle className="w-16 h-16 mb-1 text-gray-400" />,
    },
    {
      key: "4wheeler",
      name: "4 - Wheeler",
      icon: <FaCar className="w-24 h-24 text-gray-400" />,
    },
  ];
   const incrementperson = () => {
     if (person < 5){ 
      setPerson(prev=>prev+1)};
      form.setValue("seatsVacant", person)
   };
   const decrementperson = () => {if(person>1) {
    setPerson(prev=>prev-1)}};
    form.setValue("seatsVacant", person);
  return (
    <section className="flex flex-col items-start gap-4">
      <h1 className="text-2xl sm:text-4xl font-bold">What are the specifications of your vehicle?</h1>
      <p>
        Give us a brief specification of the vehicle and the number of seats which are vacant
      </p>
      <div className="flex gap-4 w-fit">
        {vehicleType.map((mode) => {
          return (
            <button
              className="w-32 h-32 flex flex-col justify-center items-center transition-all hover:bg-accent p-4 border rounded-md"
              key={mode.key}
            >
              {mode.icon}
              <div className="text-start">
                <p className="">{mode.name}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-md font-medium">Number of seats vacant</p>
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
