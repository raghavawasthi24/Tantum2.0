"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaRegBell } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CgProfile } from "react-icons/cg";
import { RiMotorbikeFill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { PublishRideSchema } from "@/schemas/PublishRide";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import RegisterRide from "./components/register-ride";
// import RegisterRide from "./components/register-Ride";
// import { Link } from "react-router-dom";

export default function Header() {
  const loggedin = true;
  const ProfileMenu = [
    {
      name: "My Profile",
      icon: <CgProfile className="w-4 h-4 mr-2" />,
      link: "/profile",
    },
    {
      name: "My Rides",
      icon: <RiMotorbikeFill className="w-4 h-4 mr-2" />,
      link: "/rides",
    },
    {
      name: "My Payments",
      icon: <MdPayment className="w-4 h-4 mr-2" />,
      link: "/payments",
    },
    {
      name: "Settings",
      icon: <IoIosSettings className="w-4 h-4 mr-2" />,
      link: "/settings",
    },
  ];
  const form = useForm<z.infer<typeof PublishRideSchema>>({
    resolver: zodResolver(PublishRideSchema),
    defaultValues: {
      source: "",
      destination: "",
      date: "",
      time: "",
      seats: 0,
      price: 0,
    },
  });
  return (
    <nav className="flex w-full fixed bg-white top-0 justify-between items-center px-4 py-2 z-20">
      <p className="font-bold text-xl md:text-4xl text-[#272142]">Tantum.</p>
      <div className="flex items-center md:gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <FaRegBell className="w-4 h-4 cursor-pointer text-[#272142]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-white sm:border sm:border-[#272142] rounded-full"
            >
              <BsPlusCircle className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:block">Publish a ride</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90%] overflow-auto">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  console.log(data);
                })}
              >
                <RegisterRide form={form} />
              </form>
            </Form>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
        {/* condition to check whether logged In or not 
        displays signin when loggged out otherwise profile options  */}
        {loggedin ? (
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent className="w-[300px] pt-12 flex flex-col justify-between">
              <div>
                {ProfileMenu?.map((menu, key) => (
                  <Link
                    href={`${menu.link}`}
                    key={key}
                    className="flex items-center text-[#4e4d4f] text-md font-medium  hover:bg-[#F3F3F3] p-2 rounded-lg cursor-pointer"
                  >
                    {menu.icon}
                    {menu.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/logout"
                className="flex items-center text-white bg-red-600 text-md font-medium p-2 rounded-lg cursor-pointer"
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </SheetContent>
          </Sheet>
        ) : (
          <Button
            size="sm"
            className="flex items-center font-semibold bg-[#272142]"
          >
            <CiGlobe className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}
