const MoviePageSkeleton = () => {
   return (
      <section className="relative h-[calc(100vh-5rem)] overflow-hidden bg-black text-white" aria-busy="true" aria-label="Loading movie details">
         <div className="h-[28vh] w-full animate-pulse bg-muted/30 md:h-[36vh]" />
         <div className="relative z-10 flex max-w-3xl flex-col gap-8 bg-linear-to-r from-black via-black/70 to-transparent p-8 md:mx-auto md:w-full">
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="h-5 w-20 animate-pulse rounded bg-muted" />
            <div className="h-20 w-full max-w-2xl animate-pulse rounded bg-muted" />
            <div className="h-8 w-40 animate-pulse rounded bg-muted" />
            <div className="flex w-full flex-col items-start gap-6 text-center">
               <div className="h-8 w-full max-w-md animate-pulse rounded border-l-3 border-yellow-500 bg-muted" />
               <div className="grid w-full grid-cols-2 md:grid-cols-4 md:gap-10">
                  {Array.from({ length: 6 }, (_, index) => (
                     <div key={index} className="flex flex-col items-center gap-2">
                        <div className="size-20 animate-pulse rounded-full bg-muted" />
                        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                     </div>
                  ))}
               </div>
            </div>
            {Array.from({ length: 3 }, (_, sectionIndex) => (
               <div key={sectionIndex} className="flex w-full flex-col gap-6">
                  <div className="h-8 w-full max-w-md animate-pulse rounded border-l-3 border-yellow-500 bg-muted" />
                  {sectionIndex === 0 ? (
                     <div className="grid gap-4 lg:grid-cols-2">
                        {Array.from({ length: 5 }, (_, itemIndex) => (
                           <div key={itemIndex} className="h-5 w-full animate-pulse rounded bg-muted" />
                        ))}
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {Array.from({ length: sectionIndex === 1 ? 4 : 6 }, (_, itemIndex) => (
                           <div key={itemIndex} className="h-64 w-full animate-pulse rounded-md bg-muted" />
                        ))}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </section>
   )
}

export default MoviePageSkeleton
