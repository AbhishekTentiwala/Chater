import { Menu } from "lucide-react"
import { Sheet,SheetTrigger,SheetContent } from "./ui/sheet"
import { Button } from "./ui/button"

export const Mobiletoggle=()=>{
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
        </Sheet>
    )
}