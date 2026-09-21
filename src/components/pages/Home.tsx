import { useEffect, useState } from "react"
import { getGenres, getMoviesByGenre } from "@/api/api"
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import MoviePoster from "../layout/MoviePoster"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import HomeSkeleton from "../skeletons/HomeSkeleton"

type MovieCarouselProps = {
  title: string
  movies: MovieSearchResponse["results"]
  genreNames: Record<number, string>
}

function MovieCarousel({ title, movies, genreNames }: MovieCarouselProps) {
  return (
    <section className="flex flex-col items-center gap-3">
      <h2 className="w-full max-w-md border-l-4 border-primary pl-3 text-left text-3xl font-bold text-foreground">
        {title}
      </h2>
      <Carousel
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="relative w-full max-w-md touch-pan-y px-12"
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-full pl-4">
              <MoviePoster movies={[movie]} genreNames={genreNames} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </section>
  )
}

function Home() {
  const [genreNames, setGenreNames] = useState<Record<number, string>>({})
  const [genreMovies, setGenreMovies] = useState<Record<number, MovieSearchResponse["results"]>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getGenres().then((result) => {
      setGenreNames(Object.fromEntries(result.genres.map((genre) => [genre.id, genre.name])))

      return Promise.all(result.genres.map(async (genre) => {
        const response = await getMoviesByGenre(genre.id)
        return [genre.id, response.results] as const
      }))
    }).then((results) => {
      if (!cancelled && results) {
        setGenreMovies(Object.fromEntries(results))
        setIsLoading(false)
      }
    }).catch(() => {
      if (!cancelled) setIsLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading) return <HomeSkeleton />

   return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4">
      {Object.entries(genreNames).map(([genreId, genreName]) => (
        <MovieCarousel
          key={genreId}
          title={genreName}
          movies={genreMovies[Number(genreId)] ?? []}
          genreNames={genreNames}
        />
      ))}
      </div>
   )
}

export default Home
