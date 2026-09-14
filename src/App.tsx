import Header from "./components/Header"
import Card from "./components/layout/Card"

function App() {

  return (
    <div className="bg-background">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 place-items-center justify-between">
        {Array.from({length: 8}).map((movie) => (
          <Card />
        ))}
      </div>
    </div>
  )
}

export default App
