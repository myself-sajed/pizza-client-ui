import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Customer } from '@/types'
import React from 'react'

const OrderDetails = ({ customer }: { customer: Customer }) => {
    return (
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
    )
}

export default OrderDetails
