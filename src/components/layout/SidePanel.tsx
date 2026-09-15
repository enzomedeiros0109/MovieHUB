import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { getGenres } from "@/api/api"
import Menu from '@/assets/menu.svg'
import ArrowBack from '@/assets/arrow-back.svg'
import type { HomeSelection } from "@/App"

type Props = {
   onSelect: (selection: HomeSelection) => void
}

const SidePanel = ({ onSelect }: Props) => {

   const [isOpen, setIsOpen] = useState(false)
   const [genres, setGenres] = useState<{ id: number; name: string }[]>([])

   const categories = [
      { label: "Popular", value: "popular" },
      { label: "Top Rated", value: "top_rated" },
      { label: "Now Playing", value: "now_playing" },
      { label: "Upcoming", value: "upcoming" },
   ] as const

   useEffect(() => {
      getGenres().then((result) => setGenres(result.genres))
   }, [])

   return (
      <>
         <Button
            className="items-center bg-white size-12 cursor-pointer hover:scale-110"
            onClick={() => setIsOpen(true)}
         >
            <img
               src={Menu}
               alt="Menu icon"
               className="shrink-0 hover:scale-105 cursor-pointer"
            />
         </Button>

         <div
            className={`
            fixed z-1001 inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
               }`}
            onClick={() => setIsOpen(false)}
         >
         </div >

         <div className={`
         fixed top-0 z-1001 right-0 h-full shadow-2xl w-60 bg-linear-to-r from-sidebar to-sidebar-accent transform transition-transform duration-400 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
         >
            <div className="flex flex-col gap-4 justify-center pt-4 pl-4">
               <img
                  src={ArrowBack}
                  alt="Arrow back icon"
                  className="size-8 shrink-0 invert transform transition-transform duration-300 rotate-180 hover:scale-120 cursor-pointer"
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
                              onClick={() => {
                                 onSelect({
                                    type: "category",
                                    value: category.value,
                                 })
                                 setIsOpen(false)
                              }}
                           >
                              <p>{category.label}</p>
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
                              onClick={() => {
                                 onSelect({
                                    type: "genre",
                                    value: genre.id,
                                 })
                                 setIsOpen(false)
                              }}
                           >
                              {genre.name}
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