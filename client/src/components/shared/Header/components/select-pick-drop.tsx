import { FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { ComboBox } from "../../ComboxBox";
import { TbLocationFilled } from "react-icons/tb";
import { cities } from "@/constants";
import { MdLocationPin } from "react-icons/md";

export default function SelectPickDrop({ form }: any) {
  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="source"
        render={({ field }) => (
          <FormItem className="w-full">
            <ComboBox
              options={cities}
              name="Source"
              icon={<TbLocationFilled />}
              className="w-[400px]"
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
              className="w-[400px]"
            />
          </FormItem>
        )}
      />
    </div>
  );
}
