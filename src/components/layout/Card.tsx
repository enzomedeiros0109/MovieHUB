import { Card as CardRoot, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"

type Props = {

}

const Card = ({}: Props) => {
   return (
      <CardRoot className="w-70 h-100 p-4 flex flex-col">
         <CardHeader className="w-full">
            <CardTitle className="text-center">Movie Name</CardTitle>
         </CardHeader>
         <CardContent className="flex w-full flex-1 items-center justify-center text-center">
            <p>POSTER</p>
         </CardContent>
         <CardFooter className="justify-between">
            <p>Popularity</p>
            <p>5/5</p>
         </CardFooter>
      </CardRoot>
   )
}

export default Card