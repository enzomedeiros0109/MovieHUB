import { useEffect, useState } from "react"
import { getGenres, getMoviesByCategory, getMoviesByGenre, getTrendingMovies } from "@/api/api"
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import MoviePoster from "../layout/MoviePoster"
import type { HomeSelection } from "@/App"

type Props = {
   selection: HomeSelection
}

function Home({ selection }: Props) {
   const [movies, setMovies] = useState<MovieSearchResponse["results"]>([])
  const [genreNames, setGenreNames] = useState<Record<number, string>>({})

  useEffect(() => {
    getGenres().then((result) => {
      setGenreNames(Object.fromEntries(result.genres.map((genre) => [genre.id, genre.name])))
    })
  }, [])

   useEffect(() => {
    if (!selection) {
      getTrendingMovies("week").then((result) => {
        setMovies(result.results)
      })
      return
    }

    if (selection.type === "category") {
      getMoviesByCategory(selection.value).then((result) => {
        setMovies(result.results)
      })
      return
    }

    getMoviesByGenre(selection.value).then((result) => {
      setMovies(result.results)
    })
  }, [selection])

   return (
      <div className="grid grid-cols-1 gap-6 p-4 place-items-center justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         <MoviePoster movies={movies} genreNames={genreNames} />
      </div>
   )
}

export default Home
