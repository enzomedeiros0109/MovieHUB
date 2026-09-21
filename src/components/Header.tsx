import type { HomeSelection } from "@/App"
import SearchBar from "./features/SearchBar"
import SidePanel from "./layout/SidePanel"
import Logo from "./ui/Logo"

type Props = {
  onSelect: (selection: HomeSelection) => void
  onSearch: (query: string) => void
  onHome: () => void
  searchQuery: string
}

const Header = ({ onSelect, onSearch, onHome, searchQuery }: Props) => {
  return (
    <div className="flex h-20 w-full items-center justify-between gap-4 bg-linear-to-r from-card to-card/90 p-4">
      <Logo onHome={onHome} />
      <SearchBar onSearch={onSearch} searchQuery={searchQuery} />
      <SidePanel onSelect={onSelect} />
    </div>
  )
}

export default Header