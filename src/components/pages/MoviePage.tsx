import { getFullMoviePlot, getMovieCredits, getMovieDetails, getMovieImages, getSimilarMovies } from "@/api/api"
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import type { MovieDetails } from "@/schemas/movie-details-schema"
import type { MovieImages } from "@/schemas/movie-images-schema"
import { useEffect, useState } from "react"
import UnknownUser from '@/assets/unknown-user.svg'
import BackButton from "../layout/BackButton"
import MoviePageSkeleton from "../skeletons/MoviePageSkeleton"
import SimilarMovieCard from "../layout/SimilarMovieCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

export type MoviePageProps = {
   movie_id: number,
   title: string,
   movieYear: string,
   director?: string,
   vote_average: number,
   overview: string,
   backdrop_path: string,
}

const MoviePage = ({ movie_id, title, movieYear, director, vote_average, overview, backdrop_path }: MoviePageProps) => {
   const formatReleaseDate = (releaseDate?: string) => {
      if (!releaseDate) return "Unknown"

      const date = new Date(`${releaseDate}T00:00:00`)
      return Number.isNaN(date.getTime())
         ? releaseDate
         : new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
         }).format(date)
   }

   const [movieCredit, setMovieCredit] = useState<{
      id: number
      credit_id: string
      name: string
      profile_path: string | null
      character: string
   }[]>([])
   const [movieDirector, setMovieDirector] = useState<string>()
   const [movieDetails, setMovieDetails] = useState<MovieDetails>()
   const [fullOverview, setFullOverview] = useState(overview)
   const [similarMovies, setSimilarMovies] = useState<{
      movie: MovieSearchResponse["results"][number]
      logoPath: string
   }[]>([])
   const [movieImages, setMovieImages] = useState<MovieImages>({ logos: [], backdrops: [], posters: [] })
   const [selectedImage, setSelectedImage] = useState<string>()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (!selectedImage) return

      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") setSelectedImage(undefined)
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
   }, [selectedImage])

   useEffect(() => {
      let cancelled = false
      setIsLoading(true)

      Promise.all([
         getMovieDetails(movie_id),
         getMovieCredits(String(movie_id)),
         getSimilarMovies(movie_id),
         getMovieImages(movie_id),
      ]).then(async ([details, credits, similar, images]) => {
         let plot = overview

         if (details.imdb_id) {
            try {
               plot = await getFullMoviePlot(details.imdb_id)
            } catch {
               // Keep TMDB's overview when OMDb has no plot for the movie.
            }
         }

         if (!cancelled) {
            setMovieDetails(details)
            setMovieCredit(credits.cast.slice(0, 15))
            setMovieDirector(credits.crew.find((crewMember) => crewMember.job === "Director")?.name)
            const moviesWithLogos = await Promise.all(
               similar.results.slice(0, 12).map(async (movie) => {
                  try {
                     const similarImages = await getMovieImages(movie.id)
                     const logoPath = similarImages.logos[0]?.file_path
                     return logoPath ? { movie, logoPath } : null
                  } catch {
                     return null
                  }
               })
            )

            setSimilarMovies(
               moviesWithLogos.filter(
                  (similarMovie): similarMovie is { movie: MovieSearchResponse["results"][number]; logoPath: string } => similarMovie !== null
               ).slice(0, 6)
            )
            setMovieImages(images)
            setFullOverview(plot)
            setIsLoading(false)
         }
      }).catch(() => {
         if (!cancelled) setIsLoading(false)
      })

      return () => {
         cancelled = true
      }
   }, [movie_id, overview])

         if (isLoading) return <MoviePageSkeleton />

   return (
      <section className="relative h-[calc(100vh-5rem)] overflow-x-hidden overflow-y-scroll bg-black text-white">
         <BackButton />
         <img
            src={backdrop_path}
            alt={`${title} backdrop`}
            className="mx-auto block h-[28vh] w-full object-cover object-center opacity-60 md:h-[36vh]"
            style={{
               maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
               WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
         />
         <div className="relative z-10 flex max-w-3xl flex-col gap-2 bg-linear-to-r from-black via-black/70 to-transparent p-8 md:mx-auto md:w-full">
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-bold">{title}</h1>
               <p className="text-base text-white/80 mt-1.5">{movieYear}</p>
            </div>
            {(director || movieDirector) && (
               <p className="text-base text-white/80">Directed by {director || movieDirector}</p>
            )}
            <p className="font-semibold text-amber-300 text-xl">{vote_average.toFixed(1)}/10</p>
            <p className="max-w-full text-lg leading-relaxed text-white/90">{fullOverview}</p>
            <div className="flex w-full flex-col items-start gap-6 text-center">
               <h1 className="border-l-3 border-yellow-500 pl-3 py-2 text-left text-2xl font-semibold my-4">Main Cast</h1>
               <div className="w-full grid grid-cols-2 justify-between md:grid-cols-4 md:gap-10">
                  {movieCredit.map((actor) => {
                     return (
                        <div key={actor.credit_id} className="flex flex-col items-center gap-2">
                           {actor.profile_path ? (
                              <img
                                 src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                 alt={`${actor.name} image`}
                                 className="size-20 rounded-full object-cover"
                              />
                           ) : (
                              <div className="flex size-20 items-center justify-center rounded-full bg-white/20 text-xs">
                                 <img
                                    src={UnknownUser} alt="Image"
                                    className="size-20"
                                 />
                              </div>
                           )}
                           <div className="mb-4 text-center">
                              <p className="text-sm font-semibold">{actor.name}</p>
                              <p className="text-sm text-white/60">as {actor.character}</p>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
            <section className="flex flex-col gap-6">
               <h2 className="border-l-3 border-yellow-500 py-2 pl-3 text-left text-2xl font-semibold">Additional Info</h2>
               <div className="grid gap-4 lg:grid-cols-2">
                  <p><span className="font-semibold">Belongs to collection:</span> {movieDetails?.belongs_to_collection?.name ?? "None"}</p>
                  <p><span className="font-semibold">Budget:</span> ${movieDetails?.budget.toLocaleString() ?? "0"}</p>
                  <p><span className="font-semibold">Genres:</span> {movieDetails?.genres.map((genre) => genre.name).join(", ") || "Unknown"}</p>
                  <p><span className="font-semibold">Original language:</span> {movieDetails?.original_language.toUpperCase() ?? "Unknown"}</p>
                  <p><span className="font-semibold">Release date:</span> {formatReleaseDate(movieDetails?.release_date)}</p>
               </div>
            </section>
            <section className="flex flex-col gap-6">
               <h2 className="border-l-3 border-yellow-500 py-2 pl-3 text-left text-2xl font-semibold">Similar Movies</h2>
               <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="relative w-full touch-pan-y px-12">
                  <CarouselContent>
                     {similarMovies.map(({ movie, logoPath }) => (
                        <CarouselItem key={movie.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                           <SimilarMovieCard movie={movie} logoPath={logoPath} />
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
               </Carousel>
            </section>
            <section className="flex flex-col gap-6">
               <h2 className="border-l-3 border-yellow-500 py-2 pl-3 text-left text-2xl font-semibold">Images</h2>
               <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {[...movieImages.backdrops, ...movieImages.posters].slice(0, 12).map((image, index) => (
                     <button
                        key={`${image.file_path}-${index}`}
                        type="button"
                        className="group block cursor-zoom-in overflow-hidden rounded-md"
                        onClick={() => setSelectedImage(`https://image.tmdb.org/t/p/original${image.file_path}`)}
                     >
                        <img
                           src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                           alt={`${title} still ${index + 1}`}
                           className="h-auto w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                     </button>
                  ))}
               </div>
            </section>
         </div>
         {selectedImage && (
            <div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-12 md:p-20"
               role="dialog"
               aria-modal="true"
               aria-label="Expanded movie image"
               onClick={() => setSelectedImage(undefined)}
            >
               <img
                  src={selectedImage}
                  alt={`${title} enlarged still`}
                  className="max-h-full max-w-full object-contain"
                  onClick={(event) => event.stopPropagation()}
               />
            </div>
         )}
      </section>
   )
}

export default MoviePage