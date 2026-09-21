import { Card as CardRoot, CardContent, CardFooter, CardHeader } from "../ui/card"

const MoviePosterSkeleton = () => {
   return (
      <CardRoot className="w-full gap-0">
         <CardHeader className="h-14 overflow-hidden">
            <div className="mx-auto h-5 w-3/4 animate-pulse rounded bg-muted" />
         </CardHeader>
         <CardContent className="mt-4 flex items-center justify-center">
            <div className="h-80 w-full animate-pulse rounded-md bg-muted md:h-90" />
         </CardContent>
         <CardFooter className="mt-4 justify-between">
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="h-6 w-12 animate-pulse rounded bg-muted" />
         </CardFooter>
      </CardRoot>
   )
}

export default MoviePosterSkeleton
