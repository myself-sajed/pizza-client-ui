"use client"
import { InputWithLabel } from "@/components/custom/InputWithLabel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { CreditCard, IndianRupee } from "lucide-react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { AddAddressDialog } from "./AddAddressDialog"
import { Customer } from "@/types"
import { ICheckoutForm } from "./CheckoutForm"
import { Textarea } from "@/components/ui/textarea"

type PropType = {
    customer: Customer,
    checkoutForm: ICheckoutForm,
    setCheckoutForm: Dispatch<SetStateAction<ICheckoutForm>>
}

const CustomerDetailsPaymentMode = ({ customer, checkoutForm, setCheckoutForm }: PropType) => {

    const modes = [{ title: "Card", icon: <CreditCard size={20} /> }, { title: "Cash", icon: <IndianRupee size={18} /> }]


    return (
        <div className="space-y-5 bg-white p-4 rounded-lg col-span-2">
            <h1 className="pb-3 text-xl font-semibold text-primary border-b">Customer Details</h1>
            <InputWithLabel type="text" value={customer.name} label="Full Name" disabled={true} />
            <InputWithLabel type="email" value={customer.email} label="Email" disabled={true} />
            <div>

                <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="address">Address</Label>
                    {customer.address.length > 0 && <AddAddressDialog customerId={customer._id} />}
                </div>
                {
                    customer.address.length > 0 ?
                        <RadioGroup required onValueChange={(value) => setCheckoutForm((prev) => {
                            const index = parseInt(value, 10);
                            return { ...prev, address: customer.address[index] }
                        })} className="grid grid-cols-2" defaultValue={`address-0`}>
                            {
                                customer.address.map((add, index) => {
                                    const address = `${add.addressLine}, ${add.city}, ${add.state} - ${add.pincode}`
                                    return <div key={`address-${index}`} className="border p-3 bg-background rounded-md">
                                        <RadioGroupItem className="mr-5" value={`${index}`} id={`address-${index}`} />
                                        <Label className="leading-5" htmlFor={`address-${index}`}>{address}</Label>
                                    </div>
                                })
                            }

                        </RadioGroup>
                        : <div className="p-4 flex flex-col items-center justify-center w-full">
                            <div className="mt-4">
                                <AddAddressDialog customerId={customer._id} />
                            </div>
                        </div>
                }



            </div>
            <div>
                <Label htmlFor="paymentMode">Payment Mode</Label>
                <div className="grid grid-cols-2 gap-2">
                    {
                        modes.map((mode, index) => {
                            return <div key={`address-${index}`} className={cn("border-2 p-3 bg-background rounded-md flex items-center gap-4 cursor-pointer", checkoutForm.paymentMode === mode.title && "border-primary")} onClick={() => setCheckoutForm((prev) => {
                                return { ...prev, paymentMode: mode.title }
                            })} >
                                <span>{mode.icon}</span><span className="font-semibold text-sm">{mode.title}</span>
                            </div>
                        })
                    }

                </div>

            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="comment">Comment</Label>
                <Textarea onChange={(e) => setCheckoutForm((prev) => {
                    return { ...prev, comment: e.target.value }
                })} value={checkoutForm.comment} id="comment" placeholder="Add a comment" />

            </div>
        </div>
    )
}

export default CustomerDetailsPaymentMode
