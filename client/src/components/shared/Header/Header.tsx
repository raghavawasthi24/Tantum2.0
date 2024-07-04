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
import { usePathname } from "next/navigation";
import { BiUser } from "react-icons/bi";

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

  const pathname = usePathname();

  return (
    <nav className="flex w-full fixed bg-white border-b top-0 justify-between items-center px-4 py-2 z-20">
      <p className="font-bold text-xl md:text-4xl text-[#272142]">Tantum.</p>
      <div className="flex items-center md:gap-4 gap-2">
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

        {pathname != "/publishRide" ? (
          <Link href="/publishRide">
            <Button
              variant="outline"
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl rounded-lg  focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium text-sm px-5 py-2.5 text-center hover:text-white"
            >
              <BsPlusCircle className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:block">Publish a ride</span>
            </Button>
          </Link>
        ) : null}

        {/* condition to check whether logged In or not 
        displays signin when loggged out otherwise profile options  */}
        {loggedin ? (
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.pg" alt="@shadcn" />
                <AvatarFallback className="bg-gray-100">
                  <BiUser className="w-6 h-6" />
                </AvatarFallback>
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
