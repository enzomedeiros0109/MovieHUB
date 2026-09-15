import MoviePoster from "../layout/MoviePoster"

function Home() {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 place-items-center justify-between md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MoviePoster />
    </div>
  )
}

export default Home
