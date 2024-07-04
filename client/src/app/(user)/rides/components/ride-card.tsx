import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiaRupeeSignSolid } from "react-icons/lia";

export default function RideCard({data}:any) {
  return (
    <div className="rounded-xl px-2 py-4 border-2 grid gap-4 hover:bg-muted/5">
      <div className="flex text-2xl sm:text-3xl">
        <p>{data.departure_time}</p>
        <div className="flex flex-col items-center">
          <p className="text-xs -mb-2">3hr 10min</p>
          <div className="flex items-center">
            <TbPointFilled />
            <div className="bg-black w-32 h-1 -mx-2"></div>
            <TbPointFilled />
          </div>
        </div>
        <p>{data.reaching_time}</p>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between gap-4 sm:gap-0 md:gap-4 lg:gap-0">
        <div className="flex gap-2 items-end">
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="font-semibold">
            <span>Satyam Singh</span>
            <div className="flex items-center">
              <div className="mr-2 text-red-400 flex items-center">
                4
                <FaStar className="w-3 h-3 ml-1" />
              </div>
              <span className="text-sm">(412)</span>
            </div>
          </div>
          <FaCar className="w-8 h-8 text-primary/50 ml-4" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-2 text-primary">
              <LiaRupeeSignSolid className="w-6 h-6" />
              <span className="text-3xl">483.00</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]"></DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
