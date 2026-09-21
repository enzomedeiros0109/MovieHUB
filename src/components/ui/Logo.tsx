import logo from "@/assets/logo.svg"
import { useNavigate } from "react-router-dom"

type Props = {
  onHome: () => void
}

const Logo = ({ onHome }: Props) => {

  const navigate = useNavigate()

  const handleLogoClick = () => {
    onHome()
    navigate("/")
  }

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={handleLogoClick}
    >
      <img
        src={logo}
        className="size-10 shrink-0 transition-transform duration-500 hover:scale-120"
      />
    </button>
  )
}

export default Logo