const SearchBarSkeleton = () => {
   return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-popover p-1 shadow-lg" aria-busy="true" aria-label="Loading suggestions">
         {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg p-2">
               <div className="size-10 animate-pulse rounded bg-muted" />
               <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            </div>
         ))}
      </div>
   )
}

export default SearchBarSkeleton
