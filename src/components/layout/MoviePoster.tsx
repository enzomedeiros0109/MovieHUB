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
   }[]>([])

   useEffect(() => {
      getMoviesByCategory("popular").then((result) => setPopularMovies(result.results))
   }, [])

   return (
      <>
         {popularMovies.map((movie) => {
            const movieTitle = movie.title ?? movie.original_title ?? "Unknown title";
            const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path) : undefined;

            return (
               <CardRoot key={movie.id} className="w-70 h-100 p-2 flex flex-col">
                  <CardHeader className="w-full">
                     <CardTitle className="text-center">{movieTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex w-full flex-1 items-center justify-center text-center">
                     {posterUrl ? (
                        <img
                           src={posterUrl}
                           alt={movieTitle}
                           className="h-60 w-full object-cover rounded-md"
                        />
                     ) : (
                        <p>Poster not available</p>
                     )}
                  </CardContent>
                  <CardFooter className="justify-between">
                     <p>{movie.popularity}</p>
                     <p>{Math.round(movie.vote_average)}/10</p>
                  </CardFooter>
               </CardRoot>
            )
         })}
      </>
   )
}

export default MoviePoster