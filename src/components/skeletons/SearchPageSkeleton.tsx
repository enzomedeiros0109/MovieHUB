import MoviePosterSkeleton from "./MoviePosterSkeleton"

const SearchPageSkeleton = () => {
   return (
      <div className="p-4" aria-busy="true" aria-label="Loading search results">
         <div className="mb-4 h-8 w-64 animate-pulse rounded bg-muted" />
         <div className="grid grid-cols-1 gap-6 place-items-center justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
               <div key={index} className="w-[calc(100%-2rem)] md:w-full">
                  <MoviePosterSkeleton />
               </div>
            ))}
         </div>
      </div>
   )
}

export default SearchPageSkeleton
