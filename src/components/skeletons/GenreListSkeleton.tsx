const GenreListSkeleton = () => {
   return (
      <div className="flex flex-col gap-2 pl-2" aria-busy="true" aria-label="Loading genres">
         {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="h-5 w-32 animate-pulse rounded bg-muted" />
         ))}
      </div>
   )
}

export default GenreListSkeleton
