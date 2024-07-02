import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiaRupeeSignSolid } from "react-icons/lia";

export default function SelectPerson({ form }: any) {
  return (
    <div className="grid gap-8">
      <h1 className="text-2xl sm:text-4xl font-bold">
       Set price for the ride
      </h1>
      <p>Enter the appropriate amount for the travel. Minimum anount will increase the chances of faster booking</p>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="w-full flex flex-wrap gap-4">
            <FormLabel>Amount</FormLabel>
            <Input
              id="picture"
              type="number"
              placeholder="Amount"
              className="w-full"
              startAdornment={<LiaRupeeSignSolid className="h-4 w-4 mr-2" />}
              {...field}
            />
          </FormItem>
        )}
      />
    </div>
  );
}
