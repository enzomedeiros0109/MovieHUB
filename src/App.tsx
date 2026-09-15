import Header from "./components/Header"
import Home from "./components/pages/Home"
import MoviePage, { type MoviePageProps } from "./components/pages/MoviePage"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

function MoviePageRoute() {
  const location = useLocation()
  const movie = location.state as MoviePageProps | null

  if (!movie) {
    return <Navigate to="/" replace />
  }

  return <MoviePage {...movie} />
}

function App() {
  return (
    <div className="bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MoviePage/:movieId" element={<MoviePageRoute />} />
      </Routes>
    </div>
  )
}

export default App
