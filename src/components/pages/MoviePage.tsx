import { getMovieCredits } from "@/api/api"
import { useEffect, useState } from "react"
import UnknownUser from '@/assets/unknown-user.svg'
import BackButton from "../layout/BackButton"
import MoviePageSkeleton from "../skeletons/MoviePageSkeleton"

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
   const [movieCredit, setMovieCredit] = useState<{
      id: number
      credit_id: string
      name: string
      profile_path: string | null
      character: string
   }[]>([])
   const [movieDirector, setMovieDirector] = useState<string>()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      getMovieCredits(String(movie_id)).then((result) => {
         setMovieCredit(result.cast.slice(0, 15))
         setMovieDirector(result.crew.find((crewMember) => crewMember.job === "Director")?.name)
            setIsLoading(false)
      })
   }, [movie_id])

         if (isLoading) return <MoviePageSkeleton />

   return (
      <section className="relative h-[calc(100vh-5rem)] overflow-x-hidden overflow-y-scroll bg-black text-white">
         <BackButton />
         <img
            src={backdrop_path}
            alt={`${title} backdrop`}
            className="mx-auto block h-auto w-full opacity-60"
            style={{
               maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
               WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
         />
         <div className="relative z-10 flex max-w-3xl flex-col gap-3 bg-linear-to-r from-black via-black/70 to-transparent p-8">
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-bold">{title}</h1>
               <p className="text-base text-white/80 mt-1.5">{movieYear}</p>
            </div>
            {(director || movieDirector) && (
               <p className="text-base text-white/80">Directed by {director || movieDirector}</p>
            )}
            <p className="font-semibold text-amber-300">{vote_average.toFixed(1)}/10</p>
            <p className="max-w-2xl text-white/90">{overview}</p>
            <h1 className="text-2xl font-semibold">Main Cast</h1>
            <div className="grid grid-cols-3 justify-between">
               {movieCredit.map((actor) => {
                  return (
                     <div key={actor.credit_id} className="flex flex-col gap-2 items-center">
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
                        <div className="text-center mb-4">
                           <p className="text-sm font-semibold">{actor.name}</p>
                           <p className="text-sm text-white/60">as {actor.character}</p>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

export default MoviePage