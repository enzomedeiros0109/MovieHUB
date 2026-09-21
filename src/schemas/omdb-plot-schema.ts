import { z } from "zod"

export const OmdbPlotSchema = z.object({
  Plot: z.string(),
  Response: z.enum(["True", "False"]),
})