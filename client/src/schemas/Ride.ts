import { z } from "zod";

export const PublishRideSchema = z.object({
  ownerId: z.string(),
  source: z.string(),
  destination: z.string(),
  date: z.date(),
  departure_time: z.string(),
  reaching_time: z.string(),
  vehicleType: z.string(),
  seatsVacant: z.number(),
  price: z.coerce.number(),
});

export const RideSchema = z.object({
  source: z.string(),
  destination: z.string(),
  date: z.date(),
  seatsVacant: z.coerce.number(),
});
