"use server";
import { RideSchema } from "@/schemas/Ride";
import { z } from "zod";

export const getRide = async (data: z.infer<typeof RideSchema>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/findride`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cache: "no-store",
    },
    body: JSON.stringify(data),
  });

  // Check if response is okay and handle different status codes
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred");
  }

  // Parse response data
  const resData = await res.json();
  return resData;
};
