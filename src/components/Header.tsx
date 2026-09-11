import SearchBar from "./features/SearchBar"
import SidePanel from "./layout/SidePanel"
import Logo from "./ui/Logo"

type Props = {}

const Header = ({}: Props) => {
  return (
    <div className="w-full h-20 p-4 flex gap-4 justify-between items-center bg-linear-to-r from-card to-card/90">
      <Logo />
      <SearchBar />
      <SidePanel />
    </div>
  )
}

export default Header