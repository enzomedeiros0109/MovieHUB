import { useEffect, useRef, useState } from "react"
import { searchMulti, getPosterUrl } from "@/api/api"
import type { MoviePageProps } from "../pages/MoviePage"
import { useNavigate } from "react-router-dom"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ButtonGroup } from '../ui/button-group'
import { Search } from 'lucide-react'
import SearchBarSkeleton from '../skeletons/SearchBarSkeleton'

type Props = {
  onSearch: (query: string) => void
  searchQuery: string
}

const SearchBar = ({ onSearch, searchQuery }: Props) => {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Awaited<ReturnType<typeof searchMulti>>["results"]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!searchContainerRef.current?.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setSuggestions([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeoutId = window.setTimeout(() => {
      searchMulti(trimmedQuery)
        .then((result) => {
              setSuggestions(result.results.filter((result) => result.media_type === "movie").slice(0, 10))
              setIsSearching(false)
        })
        .catch(() => {
          setSuggestions([])
          setIsSearching(false)
        })
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [query])

  const handleSuggestionClick = (movie: typeof suggestions[number]) => {
    const moviePageProps: MoviePageProps = {
      movie_id: movie.id,
      title: movie.title ?? movie.original_title ?? "Unknown title",
      movieYear: movie.release_date?.slice(0, 4) ?? "",
      vote_average: movie.vote_average,
      overview: movie.overview,
      backdrop_path: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "",
    }

    setQuery("")
    setSuggestions([])
    navigate(`/MoviePage/${movie.id}`, { state: moviePageProps })
  }

  const handleSearch = () => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) return

    setSuggestions([])
    onSearch(trimmedQuery)
    navigate("/search")
  }

   return (
    <div ref={searchContainerRef} className="relative w-full max-w-xl">
      <ButtonGroup className="w-full">
        <Input
          id="movie-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to search..."
          aria-label="Search movies"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:w-auto md:px-3"
          aria-label="Search"
          onClick={handleSearch}
        >
          <div className="flex gap-2 justify-center items-center">
            <Search />
            <span className="sr-only md:not-sr-only">Search</span>
          </div>
        </Button>
      </ButtonGroup>

      {isSearching ? <SearchBarSkeleton /> : suggestions.length > 0 && (
        <div className="animate-in fade-in-0 slide-in-from-top-2 duration-200 motion-reduce:animate-none absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg">
          {suggestions.map((movie) => {
            const movieTitle = movie.title ?? movie.original_title ?? "Unknown title"
            const posterUrl = movie.poster_path ? getPosterUrl(movie.poster_path, "w92") : null

            return (
              <button
                key={movie.id}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted"
                onClick={() => handleSuggestionClick(movie)}
              >
                {posterUrl ? (
                  <img src={posterUrl} alt="" className="size-10 rounded object-cover" />
                ) : (
                  <div className="size-10 rounded bg-muted" />
                )}
                <span className="min-w-0 truncate">{movieTitle}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
   )
}

export default SearchBar