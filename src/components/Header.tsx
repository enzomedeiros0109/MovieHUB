import type { HomeSelection } from "@/App"
import SearchBar from "./features/SearchBar"
import SidePanel from "./layout/SidePanel"
import Logo from "./ui/Logo"

type Props = {
  onSelect: (selection: HomeSelection) => void
  onSearch: (query: string) => void
  searchQuery: string
}

const Header = ({ onSelect, onSearch, searchQuery }: Props) => {
  return (
    <div className="w-full h-20 p-4 flex gap-4 justify-between items-center bg-linear-to-r from-card to-card/90">
      <Logo />
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
      <SidePanel onSelect={onSelect} />
    </div>
  )
}

export default Header