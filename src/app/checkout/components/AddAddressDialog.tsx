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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { statesInIndia } from "@/constants"
import { addAddress } from "@/lib/http/endpoints"
import { Address } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function AddAddressDialog({ customerId }: { customerId: string }) {

    const initialState = { addressLine: "", city: "", state: "", country: "India", pincode: "", isDefault: false }
    const [address, setAddress] = useState(initialState)
    const [open, setOpen] = useState(false)
    type StateName = keyof typeof statesInIndia;


    const queryClient = useQueryClient()

    const { mutate: addAddressMutate } = useMutation({
        mutationKey: ['add-address'],
        mutationFn: ({ address, customerId }: { address: Address, customerId: string }) => {
            return addAddress(address, customerId)
        },
        onSuccess: () => {
            toast.success("Address added successfully!")
            queryClient.invalidateQueries({ queryKey: ['customer'] })
            setAddress(initialState)
            setOpen(false)
        },
        onError: () => {
            toast.error("Error adding address")
            setAddress(initialState)
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (address) {
            addAddressMutate({ address: address as Address, customerId })
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
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="address">
                                Address Line
                            </Label>
                            <Textarea
                                id="address"
                                placeholder="Enter your new address"
                                value={address.addressLine}
                                onChange={(e) => setAddress((prev) => {
                                    return { ...prev, addressLine: e.target.value }
                                })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="state">
                                State
                            </Label>
                            <Select required onValueChange={(state) => setAddress((prev) => {
                                return { ...prev, state }
                            })}>
                                <SelectTrigger id="state" className="w-full">
                                    <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectLabel>Choose State</SelectLabel>

                                        {
                                            Object.keys(statesInIndia).map((state) => {
                                                return <SelectItem key={state} value={state}>{state}</SelectItem>
                                            })
                                        }

                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label htmlFor="city">
                                    City
                                </Label>
                                <Select required onValueChange={(city) => setAddress((prev) => {
                                    return { ...prev, city }
                                })} disabled={!address.state}>
                                    <SelectTrigger id="city" className="w-[180px]">
                                        <SelectValue placeholder="Select a city" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup>
                                            <SelectLabel>Choose a City</SelectLabel>

                                            {
                                                statesInIndia[address.state as StateName]?.map((city) => {
                                                    return <SelectItem key={city} value={city}>{city}</SelectItem>
                                                })
                                            }


                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="pincode">
                                    Pincode
                                </Label>
                                <Input
                                    id="pincode"
                                    placeholder="Enter Pincode"
                                    value={address.pincode}
                                    onChange={(e) => setAddress((prev) => {
                                        return { ...prev, pincode: e.target.value }
                                    })}
                                    required
                                />
                            </div>
                        </div>

                    </div>
                    <DialogFooter className="mt-12">
                        <Button className="w-full" type="submit">Save Address</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
