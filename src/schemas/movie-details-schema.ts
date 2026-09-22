import { z } from "zod"

export const MovieDetailsSchema = z.object({
  belongs_to_collection: z.object({
    id: z.number(),
    name: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
  }).nullable(),
  budget: z.number(),
  genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  release_date: z.string(),
})

export type MovieDetails = z.infer<typeof MovieDetailsSchema>