import { z } from "zod";

export const CreditsResponseSchema = z.object({
  id: z.number().default(0),
  cast: z.array(
    z.object({
      adult: z.boolean().default(true),
      gender: z.number().default(0),
      id: z.number().default(0),
      known_for_department: z.string(),
      name: z.string(),
      original_name: z.string(),
      popularity: z.number().default(0),
      profile_path: z.string().nullable(),
      cast_id: z.number().default(0),
      character: z.string(),
      credit_id: z.string(),
      order: z.number().default(0),
    })
  ),
  crew: z.array(
    z.object({
      adult: z.boolean().default(true),
      gender: z.number().default(0),
      id: z.number().default(0),
      known_for_department: z.string(),
      name: z.string(),
      original_name: z.string(),
      popularity: z.number().default(0),
      profile_path: z.string().nullable(),
      credit_id: z.string(),
      department: z.string(),
      job: z.string(),
    })
  ),
});