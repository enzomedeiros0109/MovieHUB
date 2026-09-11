import Header from "./components/Header"
import Card from "./components/layout/Card"

function App() {

  return (
    <div className="bg-background">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-8 place-items-center">
        {Array.from({length: 8}).map((movie) => (
          <Card />
        ))}
      </div>
    </div>
  )
}

export default App
