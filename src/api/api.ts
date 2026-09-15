import { GenreListSchema } from '@/schemas/genre-list-schema';
import { MultiSearchResponseSchema } from '../schemas/multi-search-schema'
import { SearchByGenreSchema } from '@/schemas/search-by-genre-schema';
import { CreditsResponseSchema } from '@/schemas/movie-credits-schema';

const API_KEY = import.meta.env.VITE_API_KEY

export const searchMulti = async (query: string) => {

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  const data = await response.json();

  return MultiSearchResponseSchema.parse(data);
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=en`
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data = await response.json();
  return SearchByGenreSchema.parse(data);
};

export function getPosterUrl(posterPath: string | null, size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w342") {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

export const getGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`
  )

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  const data = await response.json();

  return GenreListSchema.parse(data)
}

export async function getMoviesByGenre(genreId: number, page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=en`
  );

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export async function getMoviesByCategory(
  category: "popular" | "top_rated" | "now_playing" | "upcoming",
  page = 1
) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}&language=en`
  );

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);

  const data = await res.json()
  return SearchByGenreSchema.parse(data)
}

export async function getTrendingMovies(time_window: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);

  const data = await res.json()
  return SearchByGenreSchema.parse(data)
}

export async function getMovieCredits(movie_id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
  );

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);

  const data = await res.json()

  return CreditsResponseSchema.parse(data)
}




