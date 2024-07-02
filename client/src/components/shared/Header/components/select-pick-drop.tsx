import { FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ComboBox } from "../../ComboxBox";
import { TbLocationFilled } from "react-icons/tb";
import { cities } from "@/constants";
import { MdLocationPin } from "react-icons/md";

export default function SelectPickDrop({ form }: any) {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl sm:text-4xl font-bold">From where to where?</h1>
      <p>You need to select the location from where you want to go and upto where</p>
      <FormField
        control={form.control}
        name="source"
        render={({ field }) => (
          <FormItem className="w-full">
            <ComboBox
              options={cities}
              name="source"
              icon={<TbLocationFilled />}
              placeholder="Source"
              className="w-full"
              form={form}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="source"
        render={({ field }) => (
          <FormItem className="w-full">
            <ComboBox
              options={cities}
              name="Destination"
              icon={<MdLocationPin />}
              placeholder="Destination"
              className="w-full"
              form={form}
            />
          </FormItem>
        )}
      />
    </div>
  );
}
