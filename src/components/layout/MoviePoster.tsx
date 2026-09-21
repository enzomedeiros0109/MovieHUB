import { Card as CardRoot, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getPosterUrl } from "@/api/api";
import { useNavigate } from "react-router-dom";
import type { MoviePageProps } from "../pages/MoviePage";
import type { MovieSearchResponse } from "@/schemas/search-by-genre-schema"
import { Star, StarHalf } from "lucide-react";

type Props = {
   movies: MovieSearchResponse["results"]
   genreNames: Record<number, string>
}

const MoviePoster = ({ movies, genreNames }: Props) => {

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
                  className="w-[calc(100%-2rem)] border border-transparent rounded-4xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-white cursor-pointer md:w-full"
                  onClick={() => handlePosterClick(movie)}
               >
                  <CardRoot className="w-full">
                     <CardHeader className="">
                        <CardTitle className="text-center text-xl font-bold">{movieTitle}</CardTitle>
                     </CardHeader>
                     <CardContent className="flex items-center justify-center text-center">
                        {posterUrl ? (
                           <img
                              src={posterUrl}
                              alt={movieTitle}
                              className="h-80 md:h-90 w-full object-scale-down rounded-md"
                           />
                        ) : (
                           <p>Poster not available</p>
                        )}
                     </CardContent>
                     <CardFooter className="justify-between">
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