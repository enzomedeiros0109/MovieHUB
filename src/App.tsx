import { useState } from "react"
import Header from "./components/Header"
import Home from "./components/pages/Home"
import MoviePage, { type MoviePageProps } from "./components/pages/MoviePage"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

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

  return (
    <div className="bg-background">
      <Header onSelect={setSelection}/>
      <Routes>
        <Route path="/" element={<Home selection={selection}/>} />
        <Route path="/MoviePage/:movieId" element={<MoviePageRoute />} />
      </Routes>
    </div>
  )
}

export default App
