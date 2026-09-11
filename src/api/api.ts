import { MultiSearchResponseSchema } from '../schemas/multi-search-schema'

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




