"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PageProps = {
  options: { label: string; value: string }[];
  name: string;
  icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  form?: any;
  defaultValue:string;
};

export function ComboBox({ options, name, icon, className, placeholder, form, defaultValue }: PageProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("flex justify-start rounded-none",className)}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {value
            ? options.find((framework) => framework.value === value)?.label
            : `${placeholder}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0",className)}>
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandList>
            {options.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  console.log(currentValue,value);
                  form.setValue(name, currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
