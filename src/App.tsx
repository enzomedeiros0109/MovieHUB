import { useState } from "react"
import Header from "./components/Header"
import Home from "./components/pages/Home"
import SearchPage from "./components/pages/SearchPage"
import MoviePage, { type MoviePageProps } from "./components/pages/MoviePage"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export type HomeSelection =
  | { type: "category"; value: "popular" | "top_rated" | "now_playing" | "upcoming" }
  | { type: "genre"; value: number }
  | null

function MoviePageRoute() {
  const location = useLocation()
  const movie = location.state as MoviePageProps | null

  if (!movie) {
    return <Navigate to="/" replace />
  }

  return <MoviePage {...movie} />
}

function App() {

  const [selection, setSelection] = useState<HomeSelection>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSelection = (nextSelection: HomeSelection) => {
    setSelection(nextSelection)
    setSearchQuery("")
    navigate("/search")
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelection(null)
    navigate("/search")
  }

  const handleHome = () => {
    setSelection(null)
    setSearchQuery("")
    navigate("/")
  }

  return (
    <div className="bg-background">
      <Header onSelect={handleSelection} onSearch={handleSearch} onHome={handleHome} searchQuery={searchQuery}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage selection={selection} searchQuery={searchQuery} />} />
        <Route path="/MoviePage/:movieId" element={<MoviePageRoute />} />
      </Routes>
    </div>
  )
}

export default App
