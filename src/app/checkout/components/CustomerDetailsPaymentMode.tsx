"use client"
import { InputWithLabel } from "@/components/custom/InputWithLabel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { CreditCard, IndianRupee } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { AddAddressDialog } from "./AddAddressDialog"


const CustomerDetailsPaymentMode = () => {
    const modes = [{ title: "Card", icon: <CreditCard size={20} /> }, { title: "Cash", icon: <IndianRupee size={18} /> }]
    const [paymentMode, setPaymentMode] = useState(modes[0].title)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    }
    return (
        <div className="space-y-5 bg-white p-4 rounded-lg col-span-2">
            <h1 className="pb-3 text-xl font-semibold text-primary border-b">Customer Details</h1>
            <InputWithLabel onChange={handleChange} label="Full Name" type="text" />
            <InputWithLabel onChange={handleChange} label="Email" type="email" />
            <div>

                <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="address">Address</Label>
                    <AddAddressDialog />
                </div>
                <RadioGroup className="grid grid-cols-2" defaultValue={`address-0`}>
                    {
                        ["Sakhla Plot, Dnyaneshwar Nagar, Parbhani, Maharashtra, India 431401", "Inayat Nagar, Old Pedgaon Road, Parbhani, Maharashtra, India 431401"].map((add, index) => {
                            return <div key={`address-${index}`} className="border p-3 bg-background rounded-md">
                                <RadioGroupItem className="mr-5" value={add} id={`address-${index}`} />
                                <Label className="leading-5" htmlFor={`address-${index}`}>{add}</Label>
                            </div>
                        })
                    }

                </RadioGroup>

            </div>
            <div>
                <Label htmlFor="paymentMode">Payment Mode</Label>
                <div className="grid grid-cols-2 gap-2">
                    {
                        modes.map((mode, index) => {
                            return <div key={`address-${index}`} className={cn("border-2 p-3 bg-background rounded-md flex items-center gap-4 cursor-pointer", paymentMode === mode.title && "border-primary")} onClick={() => setPaymentMode(mode.title)} >
                                <span>{mode.icon}</span><span className="font-semibold text-sm">{mode.title}</span>
                            </div>
                        })
                    }

                </div>

            </div>
            <InputWithLabel onChange={handleChange} label="Comment" type="textarea" />
        </div>
    )
}

export default CustomerDetailsPaymentMode
