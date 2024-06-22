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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addAddress } from "@/lib/http/endpoints"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function AddAddressDialog({ customerId }: { customerId: string }) {


    const queryClient = useQueryClient()

    const { mutate: addAddressMutate } = useMutation({
        mutationKey: ['add-address'],
        mutationFn: ({ address, customerId }: { address: string, customerId: string }) => {
            return addAddress(address, customerId)
        },
        onSuccess: () => {
            toast.success("Address added successfully!")
            queryClient.invalidateQueries({ queryKey: ['customer'] })
            setAddress("")
            setOpen(false)
        },
        onError: () => {
            toast.error("Error adding address")
            setAddress("")
        }
    })

    const [address, setAddress] = useState("")
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (address) {
            addAddressMutate({ address, customerId })
        }
    }


    return (
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)} >
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant="link" className="h-0 p-0 m-0 text-primary font-semibold whitespace-nowrap text-sm flex items-center gap-1 outline-none border-none ring-0"><Plus size={17} />Add a new address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader >
                    <DialogTitle>Add a new address</DialogTitle>
                    <DialogDescription>
                        Make sure {`you're`} address is detailed & correct.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="name">
                            Address
                        </Label>
                        <Textarea
                            id="adress"
                            placeholder="Enter your new address"
                            className="mt-2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter className="mt-3">
                        <Button type="submit">Save Address</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
