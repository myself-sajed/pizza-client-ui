'use client'
import OrderReferences, { OrderDetailTile } from "@/app/(order)/order-placement-status/components/OrderReferences"
import DisplayError from "@/components/custom/DisplayError"
import Loading from "@/components/custom/Loading"
import { Step, StepItem, Stepper } from "@/components/stepper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getOrder } from "@/lib/http/endpoints"
import { Order } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Bike, CookingPot, NotebookPen, PackageCheck, Pizza, ThumbsUp, Truck, Home } from "lucide-react"

const OrderTracking = ({ orderId, restaurant }: { orderId: string, restaurant: string }) => {



    const { data: order, isLoading, isError } = useQuery({
        queryKey: [orderId, restaurant],
        queryFn: () => getOrder(orderId!, restaurant!).then(res => res.data as Order),
        enabled: (orderId && restaurant) ? true : false
    })

    const steps = [
        {
            label: "Received",
            icon: NotebookPen
        },
        {
            label: "Confirmed",
            icon: ThumbsUp
        },
        {
            label: "Preparing",
            icon: CookingPot
        },
        {
            label: "Ready for delivery",
            icon: PackageCheck
        },
        {
            label: "Out for Delivery",
            icon: Truck
        },
        {
            label: "Delivered",
            icon: Pizza
        },
    ] satisfies StepItem[]

    return (
        <div>
            {
                isLoading
                    ? <div className="h-screen">
                        <Loading className="h-1/2" title="Fetching order status" />
                    </div>
                    : isError || !order
                        ? <div className="h-screen">
                            <DisplayError className="h-1/2" title="Could not fetch order status" />
                        </div>
                        : <div className="w-full">
                            <div className="md:mx-20 sm:m-10 m-5">
                                <div className="flex items-center gap-4 text-primary ">
                                    <Truck size={30} />
                                    <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                                        Order status
                                    </h3>
                                </div>
                                <div className="mt-5 space-y-4">
                                    <Card>
                                        <CardContent className="p-3 my-3">
                                            <p className="text-gray-600 text-xs md:text-sm">Order status</p>

                                            <Stepper className="mt-4" initialStep={1} steps={steps} variant="circle-alt" >
                                                {
                                                    steps.map((item) => {
                                                        return <Step key={item.label} label={item.label}
                                                            icon={item.icon} checkIcon={item.icon} />
                                                    })
                                                }
                                            </Stepper>
                                        </CardContent>
                                    </Card>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        <Card>
                                            <CardContent className="p-3 mt-3">
                                                <OrderReferences orderId={orderId} order={order} />
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardContent className="p-3 mt-3">
                                                <p className="text-gray-600 text-xs md:text-sm">Delivery address & cancellation</p>

                                                <div className="text-sm sm:space-y-2 space-y-4 mt-2">
                                                    <OrderDetailTile>
                                                        <p className="flex items-center gap-2 sm:text-black text-gray-500 "><Bike size={17} />Est. Delivery</p>
                                                        <p>20 mins approx.</p>
                                                    </OrderDetailTile>
                                                    <OrderDetailTile>
                                                        <p className="flex items-center gap-2 sm:text-black text-gray-500 "><Home size={17} />Delivery Address</p>
                                                        <p>{order?.address.addressLine}, {order?.address.city}, {order?.address.state} - {order?.address.pincode}</p>
                                                    </OrderDetailTile>

                                                    <Button className="mt-10 sm:mt-3 sm:w-fit w-full" variant="destructive">Cancel Order</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    )
}

export default OrderTracking
