import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

const GoButton = ({ title, className }: { title: string, className?: string }) => {
    return <Button className={cn("py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white", className)} >
        {title}
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
    </Button>
}

export default GoButton