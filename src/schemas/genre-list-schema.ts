import { z } from "zod";

export const GenreListSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number().int().default(0),
      name: z.string(),
    })
  ),
});