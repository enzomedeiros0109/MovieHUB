import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const BackButton = () => {
   const navigate = useNavigate()

   return (
      <Button
         type="button"
         variant="outline"
         className="absolute left-4 top-4 z-20 border-border bg-card text-card-foreground hover:bg-muted hover:text-foreground"
         onClick={() => navigate(-1)}
      >
         <ArrowLeft />
         Back
      </Button>
   )
}

export default BackButton