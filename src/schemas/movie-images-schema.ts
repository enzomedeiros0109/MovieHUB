import { z } from "zod"

export const MovieImagesSchema = z.object({
  logos: z.array(z.object({
    file_path: z.string(),
  })),
  backdrops: z.array(z.object({
    file_path: z.string(),
    height: z.number(),
    width: z.number(),
  })),
  posters: z.array(z.object({
    file_path: z.string(),
    height: z.number(),
    width: z.number(),
  })),
})

export type MovieImages = z.infer<typeof MovieImagesSchema>