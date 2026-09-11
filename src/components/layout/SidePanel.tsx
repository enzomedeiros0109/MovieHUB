import { Button } from "../ui/button"

type Props = {}

const SidePanel = ({}: Props) => {
   return (
      <Button className="items-center size-12 cursor-pointer hover:scale-110">
         <img
            src="src/assets/menu.svg"
            alt="Menu icon"
         className="size-10 shrink-0"
         />
      </Button>
   )
}

export default SidePanel