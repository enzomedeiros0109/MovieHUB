type Props = {}

const SearchBar = ({ }: Props) => {
   return (
      <div className="w-100 h-10 flex bg-foreground rounded-md items-center p-2 gap-1">
         <div className="bg-card/10 rounded-full p-1">
            <img
               src="src/assets/search-icon.svg"
               alt="Search Icon"
               className="size-5 shrink-0" />
         </div>
         <input
            type="text"
            className="h-5 w-full text-black outline-none text-base"
            placeholder="Search for movies..."
         />
      </div>
   )
}

export default SearchBar