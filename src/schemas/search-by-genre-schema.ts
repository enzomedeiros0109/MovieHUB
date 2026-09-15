import { z } from "zod";

export const SearchByGenreSchema = z.object({
  page: z.number().int().default(0),
  results: z.array(
    z.object({
      adult: z.boolean().default(true),
      backdrop_path: z.string(),
      genre_ids: z.array(z.number().int()),
      id: z.number().int().default(0),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      popularity: z.number().default(0),
      poster_path: z.string(),
      release_date: z.string(),
      title: z.string(),
      video: z.boolean().default(true),
      vote_average: z.number().default(0),
      vote_count: z.number().int().default(0),
    })
  ),
  total_pages: z.number().int().default(0),
  total_results: z.number().int().default(0),
});

export type MovieSearchResponse = z.infer<typeof SearchByGenreSchema>;