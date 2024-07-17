"use cleint"
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
import { confirmRide } from "@/actions/Rides/confirm-ride";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RideCard({ ride, seatsVacant }: any) {

  console.log(ride);
  const router = useRouter();

  const { data: session } = useSession();
  if (!session) {
    return <div>loading...</div>;
  }

  const bookedRide = {
    ownerId: ride.ownerId._id,
    rideId: ride._id,
    userId: session.user.id,
    seatsBooked: seatsVacant,
  };

  async function Submit() {
    try {
      console.log(bookedRide);
      const res = await confirmRide(bookedRide);
      toast.success(res.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="rounded-xl p-4  grid gap-4 bg-white">
      <div className="flex text-2xl sm:text-3xl">
        <p>{ride.departure_time}</p>
        <div className="flex flex-col items-center">
          <p className="text-xs -mb-2">
            {timeDifference(ride.departure_time, ride.reaching_time)}
          </p>
          <div className="flex items-center">
            <TbPointFilled />
            <div className="bg-black w-32 h-1 -mx-2"></div>
            <TbPointFilled />
          </div>
        </div>
        <p>{ride.reaching_time}</p>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between gap-4 sm:gap-0 md:gap-4 lg:gap-0">
        <div className="flex gap-2 items-end">
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src={ride?.ownerId?.avatar} alt="@shadcn" />
              <AvatarFallback className="bg-gray-100">
                <BiUser className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="font-semibold">
            <span>
              {ride?.ownerId?.firstName + "" + ride?.ownerId?.lastName}
            </span>
            <div className="flex items-center">
              <div className="mr-2 text-red-400 flex items-center">
                {ride?.ownerId?.rideInfo?.rating}
                <FaStar className="w-3 h-3 ml-1" />
              </div>
              <span className="text-sm">
                {ride?.ownerId?.rideInfo?.peopleRated}
              </span>
            </div>
          </div>
          {ride.vehicleType === "4wheeler" ? (
            <FaCar className="w-8 h-8 text-primary/50 ml-4" />
          ) : (
            <FaMotorcycle className="w-8 h-8 text-primary/50 ml-4" />
          )}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="">
              <LiaRupeeSignSolid className="w-6 h-6" />
              <span className="text-xl">{ride?.price}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div>
              <p className="font-bold text-sm">FROM:</p>
              <p className="uppercase">
                {ride.source}({ride.departure_time} IST)
              </p>
            </div>
            <div>
              <p className="font-bold text-sm">TO:</p>
              <p className="uppercase">
                {ride.destination}({ride.reaching_time} IST)
              </p>
            </div>
            <Separator className="my-2" />
            <div>
              <p className="font-bold text-sm">VEHICLE TYPE:</p>
              <p className="uppercase">
                {ride.vehicleType === "4wheeler" ? "Car" : "Bike"}
              </p>
            </div>
            <div>
              <p className="font-bold text-sm">NO OF PERSON:</p>
              <p className="uppercase">{}</p>
            </div>
            <div>
              <p className="font-bold text-sm">TOTAL AMOUNT:</p>
              <p className="uppercase">INR {ride.price}</p>
            </div>

            <div className="text-sm font-medium">
              <p>
                Upon confirmation of this booking, you will receive all the
                rider details on your registered email. Please be aware that we
                are not responsible for any activities or incidents that may
                occur during the ride.
                <p>
                  If you have any questions or concerns, please feel free to
                  contact our support team.
                </p>
              </p>
            </div>

            <Button variant="default" className="w-full mt-4" onClick={Submit}>
              Confirm{" "}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
