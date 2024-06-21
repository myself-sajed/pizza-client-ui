import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function AddAddressDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="h-0 p-0 m-0 text-primary font-semibold whitespace-nowrap text-sm flex items-center gap-1 outline-none border-none ring-0"><Plus size={17} />Add a new address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new address</DialogTitle>
                    <DialogDescription>
                        Make sure {`you're`} address is detailed & correct.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="name">
                        Address
                    </Label>
                    <Textarea
                        id="adress"
                        placeholder="Enter your new address"
                        className="mt-2"
                    />
                </div>
                <DialogFooter>
                    <Button type="submit">Save Address</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
