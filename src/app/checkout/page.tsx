"use client"

import { InputWithLabel } from "@/components/custom/InputWithLabel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { CreditCard, IndianRupee } from "lucide-react"
import { ChangeEvent, useState } from "react"

const CheckoutPage = () => {
    const modes = [{ title: "Card", icon: <CreditCard size={20} /> }, { title: "Cash", icon: <IndianRupee size={18} /> }]
    const [paymentMode, setPaymentMode] = useState(modes[0].title)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    }

    return (
        <div className="w-[70%] mx-auto my-10">
            <div className="grid grid-cols-3 gap-5 rounded-lg ">
                {/* CHECKOUT FORM */}
                <div className="space-y-5 bg-white p-4 rounded-lg col-span-2">
                    <h1 className="pb-3 text-xl font-semibold text-primary border-b">Customer Details</h1>
                    <InputWithLabel onChange={handleChange} label="Full Name" type="text" />
                    <InputWithLabel onChange={handleChange} label="Email" type="email" />
                    <div>

                        <Label htmlFor="address">Address</Label>
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


                {/* ORDER DETAILS */}
                <div className="bg-white p-4 rounded-lg">
                    <h1 className="pb-3 text-xl font-semibold text-primary border-b">Order Summary</h1>


                    <div className="py-5 text-sm space-y-4">
                        <p className="flex items-center justify-between" ><span>Subtotal</span><span className="font-bold">₹100</span></p>
                        <p className="flex items-center justify-between" ><span>Taxes</span><span className="font-bold">₹100</span></p>
                        <p className="flex items-center justify-between" ><span>Delivery Charge</span><span className="font-bold">₹100</span></p>
                        <p className="flex items-center justify-between pb-5 border-b" ><span>Discount</span><span className="font-bold">₹100</span></p>
                        <p className="flex items-center justify-between" ><span className="font-bold">Order Total</span><span className="font-bold">₹100</span></p>
                        <div className="flex w-full items-center space-x-2">
                            <Input type="text" placeholder="Coupon Code" />
                            <Button variant="outline" className="bg-background" type="submit">Redeem</Button>
                        </div>
                    </div>

                    <Button className="w-full" type="submit">Place Order</Button>


                </div>
            </div>
        </div>
    )
}

export default CheckoutPage