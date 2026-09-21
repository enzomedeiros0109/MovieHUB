import MoviePosterSkeleton from "./MoviePosterSkeleton"

const HomeSkeleton = () => {
   return (
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4" aria-busy="true" aria-label="Loading home page">
         {Array.from({ length: 8 }, (_, index) => (
            <section key={index} className="flex w-full flex-col items-start gap-3">
               <div className="h-10 w-full max-w-md animate-pulse rounded border-l-4 border-yellow-500 bg-muted" />
               <div className="relative w-full overflow-hidden px-12">
                  <div className="-ml-4 flex">
                     {Array.from({ length: 3 }, (_, cardIndex) => (
                        <div key={cardIndex} className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                           <MoviePosterSkeleton />
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         ))}
      </div>
   )
}

export default HomeSkeleton
