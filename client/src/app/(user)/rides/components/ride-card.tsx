import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BiUser } from "react-icons/bi";
import { timeDifference } from "@/helpers/timediffToAlpha";
import { FaMotorcycle } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export default function RideCard({ data }: any) {
  return (
    <div className="rounded-xl p-4  grid gap-4 bg-white">
      <div className="flex text-2xl sm:text-3xl">
        <p>{data.departure_time}</p>
        <div className="flex flex-col items-center">
          <p className="text-xs -mb-2">
            {timeDifference(data.departure_time, data.reaching_time)}
          </p>
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
              <AvatarImage src={data?.ownerId?.avatar} alt="@shadcn" />
              <AvatarFallback className="bg-gray-100">
                <BiUser className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="font-semibold">
            <span>
              {data?.ownerId?.firstName + "" + data?.ownerId?.lastName}
            </span>
            <div className="flex items-center">
              <div className="mr-2 text-red-400 flex items-center">
                {data?.ownerId?.rideInfo?.rating}
                <FaStar className="w-3 h-3 ml-1" />
              </div>
              <span className="text-sm">
                {data?.ownerId?.rideInfo?.peopleRated}
              </span>
            </div>
          </div>
          {data.vehicleType === "4wheeler" ? (
            <FaCar className="w-8 h-8 text-primary/50 ml-4" />
          ) : (
            <FaMotorcycle className="w-8 h-8 text-primary/50 ml-4" />
          )}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="">
              <LiaRupeeSignSolid className="w-6 h-6" />
              <span className="text-xl">{data?.price}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div>
              <p className="font-bold text-sm">FROM:</p>
              <p className="uppercase">
                {data.source}({data.departure_time} IST)
              </p>
            </div>
            <div>
              <p className="font-bold text-sm">TO:</p>
              <p className="uppercase">
                {data.destination}({data.reaching_time} IST)
              </p>
            </div>
            <Separator className="my-2" />
            <div>
              <p className="font-bold text-sm">VEHICLE TYPE:</p>
              <p className="uppercase">
                {data.vehicleType === "4wheeler" ? "Car" : "Bike"}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm">NO OF PERSON:</p>
              <p className="uppercase">{}</p>
            </div>
            <div>
              <p className="font-bold text-sm">TOTAL AMOUNT:</p>
              <p className="uppercase">INR {data.price}</p>
            </div>

            <div className="text-sm font-medium">
              <p>
                Upon confirmation of this booking, you will receive all the rider
                details on your registered email. Please be aware that we are not
                responsible for any activities or incidents that may occur during
                the ride.
                <p>
                  If you have any questions or concerns, please feel free to
                  contact our support team.
                </p>
              </p>
            </div>

            <Button variant="default" className="w-full mt-4">Confirm </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
