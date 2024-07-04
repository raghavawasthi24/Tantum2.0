"use client";

import React, { Suspense, useEffect, useState } from "react";
import Rides from "./components/rides";
import { getRide } from "@/actions/Rides/ride";
import FindRideForm from "@/components/FindRideForm";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "next/navigation";

interface Props {
  source: string;
  destination: string;
  date: Date;
  seatsVacant: number;
}

function SearchParamsFetcher({
  setDefaultValues,
}: {
  setDefaultValues: (values: any) => void;
}) {
  const params = useSearchParams();

  useEffect(() => {
    const defaultValues = {
      source: params.get("source") || "",
      destination: params.get("destination") || "",
      date: new Date(params.get("date") || new Date()),
      seatsVacant: parseInt(params.get("seatsVacant") || "0"),
    };
    setDefaultValues(defaultValues);
  }, [params, setDefaultValues]);

  return null;
}

export default function Page() {
  const [defaultValues, setDefaultValues] = useState<Props | null>(null);
  const [allRides, setAllRides] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (defaultValues) {
      const getAllRides = async () => {
        try {
          const rides = await getRide(defaultValues);
          console.log("rides", rides);
          setAllRides(rides?.data);
        } catch (error) {
          console.error("Failed to fetch rides:", error);
        } finally {
          setLoading(false);
        }
      };

      getAllRides();
    }
  }, [defaultValues]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsFetcher setDefaultValues={setDefaultValues} />
      {defaultValues && (
        <div className="min-h-screen p-4">
          <FindRideForm
            className="w-full hidden md:flex mx-auto"
            defaultValues={defaultValues}
          />
          <div className="flex md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                  <IoIosSearch className="w-4 h-4 mr-2" />
                  Delhi to Mumbai - 19 March, 2024
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <FindRideForm
                  className="w-full mx-auto py-2"
                  defaultValues={defaultValues}
                />
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex justify-center gap-8 py-4">
            {/* <FilterRides /> */}
            <Rides allRides={allRides} />
          </div>
        </div>
      )}
    </Suspense>
  );
}
