import Header from "./components/Header"
import MoviePoster from "./components/layout/MoviePoster"

function App() {

  return (
    <div className="bg-background">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 place-items-center justify-between">
        <MoviePoster />
      </div>
    </div>
  )
}

export default App
