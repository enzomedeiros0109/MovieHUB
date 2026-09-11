import { z } from "zod";

export const MultiSearchResponseSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      id: z.number(),
      title: z.string().optional(),
      original_language: z.string(),
      original_title: z.string().optional(),
      overview: z.string(),
      poster_path: z.string().nullable(),
      media_type: z.string(),
      genre_ids: z.array(z.number()),
      popularity: z.number(),
      release_date: z.string().optional(),
      video: z.boolean().optional(),
      vote_average: z.number(),
      vote_count: z.number(),
      name: z.string().optional(),
      original_name: z.string().optional(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});