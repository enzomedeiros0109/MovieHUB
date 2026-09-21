import { Card as CardRoot, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getPosterUrl } from "@/api/api";
import { useNavigate } from "react-router-dom";
import type { MoviePageProps } from "../pages/MoviePage";
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import { Star } from "lucide-react";

type Props = {
   movies: MovieSearchResponse["results"]
   genreNames: Record<number, string>
}

const MoviePoster = ({ movies }: Props) => {

   const navigate = useNavigate()

   const handlePosterClick = (movie: MovieSearchResponse["results"][number]) => {
      const moviePageProps: MoviePageProps = {
         movie_id: movie.id,
         title: movie.title ?? movie.original_title ?? "Unknown title",
         movieYear: movie.release_date.slice(0, 4),
         vote_average: movie.vote_average,
         overview: movie.overview,
         backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "",
      }

      navigate(`/MoviePage/${movie.id}`, { state: moviePageProps })
   }

   const HalfStar = () => {
      return (
         <div className="relative size-5 inline-block">
            {/* 1. Background: Empty Star Outline */}
            <Star color="#f0b100" className="size-5 absolute top-0 left-0" />

            {/* 2. Foreground: Filled Star cut to 50% width */}
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden select-none pointer-events-none">
               <Star color="#f0b100" fill="#f0b100" className="size-5 max-w-none" />
            </div>
         </div>
      );
   };

   function StarRating({ rating }: { rating: number }) {
      const starRating = rating / 2;
      const fullStars = Math.floor(starRating);
      const hasHalfStar = starRating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      return (
         <>
            {Array.from({ length: fullStars }, (_, i) => (
               <Star fill="#f0b100" color="#f0b100" className="size-5" key={`full-${i}`} />
            ))}
            {hasHalfStar && (
               <HalfStar key="half" />
            )}
            {Array.from({ length: emptyStars }, (_, i) => (
               <Star color="#f0b100" className="size-5" key={`empty-${i}`} />
            ))}
         </>
      );
   }

   return (
      <>
         {movies.map((movie) => {
            const movieTitle = movie.title ?? movie.original_title ?? "Unknown title";
            const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : undefined;

            return (
               <button
                  key={movie.id}
                  className="mx-auto block w-full cursor-pointer rounded-4xl border border-transparent transition-colors duration-300 hover:border-white"
                  onClick={() => handlePosterClick(movie)}
               >
                  <CardRoot className="w-full gap-0">
                     <CardHeader className="h-14 overflow-hidden">
                        <CardTitle
                           className={`line-clamp-2 text-center font-bold leading-tight ${movieTitle.length > 24 ? "text-lg" : "text-xl"}`}
                        >
                           {movieTitle}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="flex items-center justify-center text-center mt-4">
                        {posterUrl ? (
                           <img
                              src={posterUrl}
                              alt={movieTitle}
                              className="h-80 w-full object-contain object-center md:h-90"
                           />
                        ) : (
                           <p>Poster not available</p>
                        )}
                     </CardContent>
                     <CardFooter className="justify-between mt-4">
                        <div className="flex gap-1">
                           {StarRating({ rating: movie.vote_average })}
                        </div>
                        <p className="text-xl">{(movie.vote_average).toFixed(1)}/10</p>
                     </CardFooter>
                  </CardRoot>
               </button>
            )
         })}
      </>
   )
}

export default MoviePoster