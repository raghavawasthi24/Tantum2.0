import { FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { Card } from "@/components/ui/card";

export default function SelectPerson({ form }: any) {
  const person = [1, 2,3,4];
  return (
    <FormField
      control={form.control}
      name="source"
      render={({ field }) => (
        <FormItem className="w-full flex flex-wrap gap-4 justify-center items-end">
          {person?.map((person) => (
            <Card className="w-24 h-24 flex justify-center items-center hover:bg-muted">
              {person}
            </Card>
          ))}
        </FormItem>
      )}
    />
  );
}
