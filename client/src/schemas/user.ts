import { z } from "zod";

export const UserDetailsSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().optional(),
  dob: z.date(),
  gender: z.string(),
});
