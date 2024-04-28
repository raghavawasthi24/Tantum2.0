import { FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { CustomizedCalendar } from "../../CustomizedCalender";
import { Input } from "@/components/ui/input";

export default function SelectRideDate({ form }: any) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="w-full">
          <CustomizedCalendar field={field} />
        </FormItem>
      )}
    />
  );
}
