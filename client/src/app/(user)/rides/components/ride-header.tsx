import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

export default function RideHeader() {
  return (
    <div className="w-full bg-blue-500 mt-[56px] p-4 text-white flex justify-between">
      <div>
        <p className="text-xs font-medium">(12th May,2014)</p>
        <p className="text-xl font-bold">Ghaziabad - Delhi</p>
        <span className="flex items-center text-sm">
          <IoPersonOutline className="w-3 h-3 mr-1" />1
        </span>
      </div>
      <Button variant="link" className="text-white">
        <MdEdit className="w-4 h-4 mr-2" />
        <span>Edit</span>
      </Button>
    </div>
  );
}
