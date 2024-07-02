import { z } from "zod";

export const PublishRideSchema = z.object({
  source: z.string(),
  destination: z.string(),
  date: z.date(),
  time: z.string(),
  seatsVacant: z.number(),
  price: z.coerce.number(),
});

export const RideSchema = z.object({
  source: z.string(),
  destination: z.string(),
  date: z.date(),
  seats: z.coerce.number(),
});
