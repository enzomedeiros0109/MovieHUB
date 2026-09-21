import { useEffect, useState } from "react"
import { getGenres, getMoviesByCategory, getMoviesByGenre, searchMovies } from "@/api/api"
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import type { HomeSelection } from "@/App"
import MoviePoster from "../layout/MoviePoster"
import SearchPageSkeleton from "../skeletons/SearchPageSkeleton"

type Props = {
   selection: HomeSelection
   searchQuery: string
}

function SearchPage({ selection, searchQuery }: Props) {
   const [movies, setMovies] = useState<MovieSearchResponse["results"]>([])
   const [genreNames, setGenreNames] = useState<Record<number, string>>({})
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      getGenres().then((result) => {
         setGenreNames(Object.fromEntries(result.genres.map((genre) => [genre.id, genre.name])))
      })
   }, [])

   useEffect(() => {
      let cancelled = false

      if (searchQuery) {
         setMovies([])
         Promise.all([
            searchMovies(searchQuery, 1),
            searchMovies(searchQuery, 2),
            searchMovies(searchQuery, 3),
         ]).then((results) => {
            if (!cancelled) {
               setMovies(results.flatMap((result) => result.results))
               setIsLoading(false)
            }
         }).catch(() => {
            if (!cancelled) {
               setMovies([])
               setIsLoading(false)
            }
         })
      } else if (selection?.type === "category") {
         getMoviesByCategory(selection.value).then((result) => {
            if (!cancelled) {
               setMovies(result.results)
               setIsLoading(false)
            }
         }).catch(() => !cancelled && setIsLoading(false))
      } else if (selection?.type === "genre") {
         getMoviesByGenre(selection.value).then((result) => {
            if (!cancelled) {
               setMovies(result.results)
               setIsLoading(false)
            }
         }).catch(() => !cancelled && setIsLoading(false))
      } else {
         setMovies([])
         setIsLoading(false)
      }

      return () => {
         cancelled = true
      }
   }, [searchQuery, selection])

   if (isLoading) return <SearchPageSkeleton />

   const title = searchQuery
      ? `Results for "${searchQuery}"`
      : selection?.type === "genre"
         ? genreNames[selection.value] ?? "Genre"
         : selection?.type === "category"
            ? selection.value.replaceAll("_", " ")
            : "Results"

   return (
      <div className="p-4">
         <h1 className="mb-4 text-2xl font-semibold capitalize">{title}</h1>
         <div className="grid grid-cols-1 gap-6 place-items-center justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <MoviePoster movies={movies} genreNames={genreNames} />
         </div>
      </div>
   )
}

export default SearchPage