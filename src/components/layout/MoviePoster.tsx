import { useEffect, useState } from "react";
import { Card as CardRoot, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getMoviesByCategory, getPosterUrl } from "@/api/api";

const MoviePoster = () => {
   const [popularMovies, setPopularMovies] = useState<{
      id: number;
      title?: string;
      original_title?: string;
      popularity: number;
      vote_average: number;
      poster_path: string | null;
      release_date: string
   }[]>([])

   useEffect(() => {
      getMoviesByCategory("popular").then((result) => setPopularMovies(result.results))
   }, [])

   function formatDate(dateStr: string): string {
      if (!dateStr) return '';

      const [year, month, day] = dateStr.split(/[/-]/);

      if (!year || !month || !day) return dateStr;

      return `${day}/${month}/${year}`;
   }

   return (
      <>
         {popularMovies.map((movie) => {
            const movieTitle = movie.title ?? movie.original_title ?? "Unknown title";
            const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : undefined;

            return (
               <button
                  className="border border-transparent rounded-4xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:border-white"

               >
                  <CardRoot key={movie.id} className="w-70 h-auto flex flex-col">
                     <CardHeader className="w-full">
                        <CardTitle className="text-center text-xl font-bold">{movieTitle}</CardTitle>
                     </CardHeader>
                     <CardContent className="flex w-full items-center justify-center text-center">
                        {posterUrl ? (
                           <img
                              src={posterUrl}
                              alt={movieTitle}
                              className="h-80 w-full object-cover rounded-md"
                           />
                        ) : (
                           <p>Poster not available</p>
                        )}
                     </CardContent>
                     <CardFooter className="justify-between">
                        <p>{formatDate(movie.release_date)}</p>
                        <p >{(movie.vote_average).toFixed(2)}/10</p>
                     </CardFooter>
                  </CardRoot>
               </button>
            )
         })}
      </>
   )
}

export default MoviePoster