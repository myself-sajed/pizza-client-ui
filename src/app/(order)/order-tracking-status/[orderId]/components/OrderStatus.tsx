'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Truck } from "lucide-react"

const OrderStatus = ({ orderId }: { orderId: string }) => {
    return (
        <div>
            <div className="w-full">
                <div className="md:mx-20 sm:m-10 m-5">
                    <div className="flex items-center gap-4 text-primary ">
                        <Truck size={30} />
                        <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                            Order status
                        </h3>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-5">
                        <Card className="h-72 col-span-2">
                            <CardContent>
                                Stepper will be here
                            </CardContent>
                        </Card>
                        <Card className="h-72">
                            <CardContent>
                                Stepper will be here
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus
