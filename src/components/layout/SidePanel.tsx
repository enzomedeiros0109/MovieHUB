import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { getGenres } from "@/api/api"

const SidePanel = () => {

   const [isOpen, setIsOpen] = useState(false)
   const [genres, setGenres] = useState<{ id: number; name: string }[]>([])

   const categories = [
      "Popular",
      "Top Rated",
      "Now Playinh",
      "Upcoming",
   ]

   useEffect(() => {
      getGenres().then((result) => setGenres(result.genres))
   }, [])

   return (
      <>
         <Button
            className="items-center size-12 cursor-pointer hover:scale-110"
            onClick={() => setIsOpen(true)}
         >
            <img
               src="src/assets/menu.svg"
               alt="Menu icon"
               className="size-10 shrink-0 hover:scale-105 cursor-pointer"
            />
         </Button>

         <div
            className={`
            fixed inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
               }`}
         >
         </div >

         <div className={`
         fixed top-0 right-0 h-full shadow-2xl w-60 bg-linear-to-r from-sidebar to-sidebar-accent transform transition-transform duration-400 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
         >
            <div className="flex flex-col gap-4 justify-center pt-4 pl-4">
               <img
                  src="src/assets/arrow-back.svg"
                  alt="Arrow back icon"
                  className="size-8 shrink-0 invert transform transition-transform duration-300 rotate-180 hover:scale-120"
                  onClick={() => setIsOpen(false)}
               />

               <div className="flex flex-col gap-2 divide-y divide-sidebar-ring">
                  <p className="text-lg font-semibold select-none">
                     Categories
                  </p>
                  <div className="flex flex-col gap-1 pl-2">

                     {categories.map((category) => {
                        return (
                           <button
                              className="flex justify-start origin-left transform transition-transform hover:scale-110"
                           >
                              <p>{category}</p>
                           </button>
                        )
                     })}
                  </div>
               </div>

               <div className="flex flex-col gap-2 divide-y divide-sidebar-ring">
                  <p className="text-lg font-semibold select-none">
                     Genres
                  </p>
                  <div className="flex flex-col gap-2 pl-2">
                     {genres.map((genre) => {
                        return (
                           <button
                              className="flex justify-start origin-left transform transition-transform hover:scale-110"
                           >
                              <p key={genre.id}>{genre.name}</p>
                           </button>
                        )
                     })}
                  </div>
               </div>

            </div>

         </div>

      </>
   )
}



export default SidePanel