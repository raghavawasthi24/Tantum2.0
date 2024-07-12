import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function RidesSection() {
  return (
    <Tabs defaultValue="account" className="w-[400px] px-4">
      <TabsList className="grid w-full grid-cols-2  bg-slate-200">
        <TabsTrigger value="account">Offered</TabsTrigger>
        <TabsTrigger value="password">Booked</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="bg-red-500"></div>
      </TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
  );
}
