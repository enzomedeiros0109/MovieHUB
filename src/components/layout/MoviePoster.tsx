import { useEffect, useState } from "react";
import { Card as CardRoot, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getPosterUrl, getTrendingMovies } from "@/api/api";
import { useNavigate } from "react-router-dom";
import type { MoviePageProps } from "../pages/MoviePage";


const MoviePoster = () => {
   const [trendingMovies, setTrendingMovies] = useState<{
      id: number;
      title?: string;
      original_title?: string;
      popularity: number;
      vote_average: number;
      poster_path: string | null;
      backdrop_path: string;
      overview: string;
      release_date: string
   }[]>([])

   useEffect(() => {
      getTrendingMovies("week").then((result) => setTrendingMovies(result.results))
   }, [])

   function formatDate(dateStr: string): string {
      if (!dateStr) return '';

      const [year, month, day] = dateStr.split(/[/-]/);

      if (!year || !month || !day) return dateStr;

      return `${day}/${month}/${year}`;
   }

   const navigate = useNavigate()

   const handlePosterClick = (movie: typeof trendingMovies[number]) => {
      const moviePageProps: MoviePageProps = {
         movie_id: movie.id,
         title: movie.title ?? movie.original_title ?? "Unknown title",
         movieYear: movie.release_date.slice(0, 4),
         vote_average: movie.vote_average,
         overview: movie.overview,
         backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      }

      navigate(`/MoviePage/${movie.id}`, { state: moviePageProps })
   }

   return (
      <>
         {trendingMovies.map((movie) => {
            const movieTitle = movie.title ?? movie.original_title ?? "Unknown title";
            const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : undefined;

            return (
               <button
                  className="border border-transparent rounded-4xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-white cursor-pointer"
                  onClick={() => handlePosterClick(movie)}
               >
                  <CardRoot key={movie.id} className="w-90 md:w-80 h-auto flex flex-col">
                     <CardHeader className="w-full">
                        <CardTitle className="text-center text-xl font-bold">{movieTitle}</CardTitle>
                     </CardHeader>
                     <CardContent className="flex w-full items-center justify-center text-center">
                        {posterUrl ? (
                           <img
                              src={posterUrl}
                              alt={movieTitle}
                              className="h-80 md:h-90 w-full object-scale-down md:object-cover rounded-md"
                           />
                        ) : (
                           <p>Poster not available</p>
                        )}
                     </CardContent>
                     <CardFooter className="justify-between">
                        <p>{formatDate(movie.release_date)}</p>
                        <p >{(movie.vote_average).toFixed(1)}/10</p>
                     </CardFooter>
                  </CardRoot>
               </button>
            )
         })}
      </>
   )
}

export default MoviePoster