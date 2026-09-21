import MoviePosterSkeleton from "./MoviePosterSkeleton"

const HomeSkeleton = () => {
   return (
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4" aria-busy="true" aria-label="Loading home page">
         {Array.from({ length: 8 }, (_, index) => (
            <section key={index} className="flex flex-col items-center gap-3">
               <div className="h-10 w-full max-w-md animate-pulse rounded bg-muted" />
               <div className="relative w-full max-w-md px-12">
                  <MoviePosterSkeleton />
               </div>
            </section>
         ))}
      </div>
   )
}

export default HomeSkeleton
