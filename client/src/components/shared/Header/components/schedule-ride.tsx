import { FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { CustomizedCalendar } from "../../CustomizedCalender";
import { Input } from "@/components/ui/input";

export default function ScheduleRide({ form }: any) {
  return (
    <div className="grid gap-4">
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
            <Input id="time" type="time" />
          </FormItem>
        )}
      />
    </div>
  );
}
