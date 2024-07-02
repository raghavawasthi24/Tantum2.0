import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import React from "react";
import { CustomizedCalendar } from "../../CustomizedCalender";
import { Input } from "@/components/ui/input";

export default function ScheduleRide({ form }: any) {
  return (
    <div className="w-full grid gap-4">
      <h1 className="text-2xl sm:text-4xl font-bold">
        When you want to go?
      </h1>
      <p>Pick the date and time of leaving the location</p>

      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="w-full">
            <CustomizedCalendar field={field} className="w-full" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Time</FormLabel>
            <Input id="time" type="time" className="w-full" {...field}/>
          </FormItem>
        )}
      />
    </div>
  );
}
