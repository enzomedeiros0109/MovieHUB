import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { MoviePageProps } from "../pages/MoviePage"

type Props = {
   movie: MovieSearchResponse["results"][number]
   logoPath: string
}

const SimilarMovieCard = ({ movie, logoPath }: Props) => {
   const navigate = useNavigate()
   const title = movie.title ?? movie.original_title ?? "Unknown title"
   const stars = Math.round(movie.vote_average / 2)

   const handleClick = () => {
      const moviePageProps: MoviePageProps = {
         movie_id: movie.id,
         title,
         movieYear: movie.release_date.slice(0, 4),
         vote_average: movie.vote_average,
         overview: movie.overview,
         backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "",
      }

      navigate(`/MoviePage/${movie.id}`, { state: moviePageProps })
   }

   return (
      <button
         type="button"
         className="flex w-full flex-col items-center gap-3 rounded-xl border border-transparent bg-card p-4 text-card-foreground shadow-md transition-colors hover:border-white"
         onClick={handleClick}
      >
         <img
            src={`https://image.tmdb.org/t/p/w500${logoPath}`}
            alt={`${title} logo`}
            className="h-20 w-full object-contain"
         />
         <p className="line-clamp-2 min-h-10 text-center text-base font-semibold">{title}</p>
         <div className="flex gap-0.5" aria-label={`${movie.vote_average.toFixed(1)} out of 10 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
               <Star
                  key={index}
                  className="size-4"
                  color="#f0b100"
                  fill={index < stars ? "#f0b100" : "transparent"}
               />
            ))}
         </div>
      </button>
   )
}

export default SimilarMovieCard