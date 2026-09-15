import { useEffect, useState } from "react"
import { getGenres, getMoviesByCategory, getMoviesByGenre, getTrendingMovies, searchMovies } from "@/api/api"
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import MoviePoster from "../layout/MoviePoster"
import type { HomeSelection } from "@/App"

type Props = {
   selection: HomeSelection
  searchQuery: string
}

function Home({ selection, searchQuery }: Props) {
   const [movies, setMovies] = useState<MovieSearchResponse["results"]>([])
  const [genreNames, setGenreNames] = useState<Record<number, string>>({})

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
         if (!cancelled) setMovies(results.flatMap((result) => result.results))
      }).catch(() => {
         if (!cancelled) setMovies([])
      })

      return () => {
         cancelled = true
      }
    }

    if (!selection) {
      getTrendingMovies("week").then((result) => {
        if (!cancelled) setMovies(result.results)
      })
      return () => {
         cancelled = true
      }
    }

    if (selection.type === "category") {
      getMoviesByCategory(selection.value).then((result) => {
        if (!cancelled) setMovies(result.results)
      })
      return () => {
         cancelled = true
      }
    }

    getMoviesByGenre(selection.value).then((result) => {
      if (!cancelled) setMovies(result.results)
    })

   return () => {
      cancelled = true
   }
  }, [searchQuery, selection])

   return (
      <div className="p-4">
        {searchQuery && <h1 className="mb-4 text-2xl font-semibold">Results for {searchQuery}</h1>}
        <div className="grid grid-cols-1 gap-6 place-items-center justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         <MoviePoster movies={movies} genreNames={genreNames} />
        </div>
      </div>
   )
}

export default Home
