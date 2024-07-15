import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RidesSection({ rides, userId }: any) {
  console.log(rides);
  return (
    <Tabs defaultValue="offered" className="w-full px-4">
      <TabsList className="grid w-[400px] grid-cols-2  bg-slate-200">
        <TabsTrigger value="offered">Offered</TabsTrigger>
        <TabsTrigger value="booked">Booked</TabsTrigger>
      </TabsList>
      <TabsContent value="offered">
        <Accordion type="single" collapsible className="w-full">
          {rides.offered.map((ride: any) => (
            <AccordionItem key={ride._id} value={ride._id}>
              <AccordionTrigger>
                <div className="flex gap-4">
                  <Badge>{format(new Date(ride.date), "PPP")}</Badge>
                  <p className="capitalize">
                    {ride.source} to {ride.destination}
                  </p>
                </div>

                <div className="flex">
                  {ride.passengers
                    .filter((passenger: any) => passenger._id !== userId)
                    .map((passenger: any, key: number) => (
                      <TooltipProvider key={key}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar>
                              <AvatarImage
                                src={passenger.avatar}
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {passenger.firstName} {passenger.lastName}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p>
                    Time: {ride.departure_time} - {ride.reaching_time}
                  </p>
                  <p>Price : Rs. {ride.price}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
      <TabsContent value="booked">
        <Accordion type="single" collapsible className="w-full">
          {rides.booked.map((ride: any) => (
            <AccordionItem key={ride._id} value={ride._id}>
              <AccordionTrigger>
                <div className="flex gap-4">
                  <Badge>{format(new Date(ride.date), "PPP")}</Badge>
                  <p className="capitalize">
                    {ride.source} to {ride.destination}
                  </p>
                </div>

                <div className="flex">
                  {ride.passengers
                    .filter((passenger: any) => passenger._id !== userId)
                    .map((passenger: any, key:number) => (
                      <TooltipProvider key={key}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar>
                              <AvatarImage
                                src={passenger.avatar}
                                alt="@shadcn"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {passenger.firstName} {passenger.lastName}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <p>
                    Time: {ride.departure_time} - {ride.reaching_time}
                  </p>
                  <p>Price : Rs. {ride.price}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}
