const MoviePageSkeleton = () => {
   return (
      <section className="relative h-[calc(100vh-5rem)] overflow-hidden bg-black text-white" aria-busy="true" aria-label="Loading movie details">
         <div className="h-120 w-full animate-pulse bg-muted/30" />
         <div className="relative z-10 flex max-w-3xl flex-col gap-3 p-8">
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="h-5 w-20 animate-pulse rounded bg-muted" />
            <div className="h-20 w-full max-w-2xl animate-pulse rounded bg-muted" />
            <div className="h-8 w-40 animate-pulse rounded bg-muted" />
            <div className="grid grid-cols-3 gap-4">
               {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                     <div className="size-20 animate-pulse rounded-full bg-muted" />
                     <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                     <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default MoviePageSkeleton
