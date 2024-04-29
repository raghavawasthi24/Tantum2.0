import { z } from "zod";

export const PublishRideSchema = z.object({
    source: z.string(),
    destination: z.string(),
    date: z.string(),
    time: z.string(),
    seats: z.number(),
    price: z.number(),
    });