import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCloudscale } from "react-icons/fa";


export default function RideCard() {
  return (
    <div className="w-[500px] bg-background rounded-md px-2 py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>Satyam Singh</span>
        </div>
        <div className="">
          <Badge className="mr-2 bg-green-500">
            4
            <FaStar className="w-3 h-3 ml-1" />
          </Badge>
          <span className="text-sm">(412 ratings)</span>
        </div>
      </div>
      <div className="text-xs text-muted p-2 gap-1">
        <p className="flex gap-2 items-center">
          <FaCar className="w-3 h-3" />
          30 rides completed
        </p>
        <p className="flex gap-2 items-center">
          <FaCloudscale className="w-3 h-3" />
          3+ year driving experience</p>
        <div className="flex justify-end">
          <Button className="bg-destructive">Book Rs. 412</Button>
        </div>
      </div>
    </div>
  );
}
