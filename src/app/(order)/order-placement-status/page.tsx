/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import DisplayError from "@/components/custom/DisplayError"
import Loading from "@/components/custom/Loading"
import { deleteOrder, getOrder } from "@/lib/http/endpoints"
import { useQuery } from "@tanstack/react-query"
import { Bike, Box, CircleCheck, CircleX, CreditCard, Home, IndianRupee, RefreshCcw, RefreshCw, Truck } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Order } from "@/types"
import Image from "next/image"
import { CartItem, updateCart } from "@/lib/redux/slices/cartSlice"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import GoButton from "@/components/custom/GoButton"


const OrderPlacementStatus = () => {

    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')
    const restaurant = searchParams.get('restaurant')
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { data: order, isLoading, isError } = useQuery({
        queryKey: [orderId, restaurant],
        queryFn: () => getOrder(orderId!, restaurant!).then(res => res.data as Order),
        enabled: (orderId && restaurant) ? true : false
    })

    useEffect(() => {
        if ((order && restaurant) && order.paymentStatus !== "Failed") {
            dispatch(updateCart([]))
        }

        return () => {
            if ((order && restaurant) && order.paymentStatus === "Failed") {
                deleteOrder(orderId!, restaurant!)
            }
        }
    }, [order])

    if (!orderId || !restaurant) {
        router.replace('/')
        toast.error("Order was invalid")
        return
    }




    return (
        <div>
            {
                isLoading
                    ? <div className="h-screen">
                        <Loading className="h-1/2" title="Fetching order details" />
                    </div>
                    : (isError || !order) ?
                        <div className="h-screen">
                            <DisplayError className="h-1/2" title="Could not fetch order details" />
                        </div>
                        : <div className="container my-5">
                            <div className="md:w-4/5 w-full min-h-screen mx-auto animate-once animate-fade-up animate-duration-[2000] mt-[5rem]">
                                <div>
                                    <div className={cn("w-full mx-auto flex items-center justify-center flex-col gap-2", order?.paymentStatus !== "Failed" ? "text-green-700" : "text-red-700")}>
                                        {order?.paymentStatus === "Failed" ? <>
                                            <CircleX className="animate-bounce" size={50} />
                                            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                                                Failed to place order.
                                            </h3>
                                            <p className="text-gray-500 -mt-1 text-sm">Your payment was failed, because of that we could not place your order.</p>
                                        </>
                                            :
                                            <>
                                                <CircleCheck className="animate-bounce" size={50} />
                                                <h3 className="scroll-m-20 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                                                    Order placed successfully..
                                                </h3>
                                                <p className="text-gray-500 -mt-1 text-xs md:text-sm text-center">Your order has been placed successfully and will be delivered within <b>45 minutes</b>.</p>
                                            </>}
                                    </div>

                                    {
                                        order?.paymentStatus !== "Failed" && <Card className="lg:w-1/2 md:w-3/4 w-full md:mx-auto mt-10">
                                            <CardHeader>
                                                <CardTitle className="flex items-center justify-between">
                                                    <p>Order Details</p>
                                                    <Badge variant="outline" className={cn(order?.paymentStatus === "Paid" ? "text-green-800" : order?.paymentStatus === "Failed" ? "text-red-800" : 'text-yellow-500')}>{order?.paymentStatus}</Badge>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <div className="pb-2 border-b">
                                                        <p className="text-gray-600 text-sm">{`You've`} ordered:</p>
                                                        {
                                                            order?.cart?.map((item: CartItem, index) => {
                                                                return <div className="flex items-center gap-4 mt-2" key={`${item._id}-${index}`}>
                                                                    <Image src={item.image} alt="pizza" height={30} width={30} />
                                                                    <p>{item.name}</p>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                    <div className="pb-2 border-b">
                                                        <p className="text-gray-600 text-xs md:text-sm">Order references:</p>
                                                        <div className="text-sm mt-2 sm:space-y-2 space-y-4">
                                                            <OrderDetailTile>
                                                                <p className="flex items-center gap-2 sm:text-black text-gray-500"><Box size={17} />Order ID</p>
                                                                <p><Link className="underline hover:text-blue-600" href={`/order-tracking-status/${orderId}`}>{orderId}</Link></p>
                                                            </OrderDetailTile>
                                                            {
                                                                order?.paymentMode === "Card" && <OrderDetailTile>
                                                                    <p className="flex items-center gap-2 sm:text-black text-gray-500 "><CreditCard size={17} />Payment ID</p>
                                                                    <p>{order?.paymentId ? `${order.paymentId.slice(0, 24)}...` : "N/A"}</p>
                                                                </OrderDetailTile>
                                                            }
                                                            <OrderDetailTile>
                                                                <p className="flex items-center gap-2 sm:text-black text-gray-500 "><IndianRupee size={17} />Payment Mode</p>
                                                                <p>{order?.paymentMode}</p>
                                                            </OrderDetailTile>
                                                            <OrderDetailTile>
                                                                <p className="flex items-center gap-2 sm:text-black text-gray-500 "><Bike size={17} />Est. Delivery</p>
                                                                <p>20 mins approx.</p>
                                                            </OrderDetailTile>
                                                            <OrderDetailTile>
                                                                <p className="flex items-center gap-2 sm:text-black text-gray-500 "><Home size={17} />Delivery Address</p>
                                                                <p>{order?.address.addressLine}, {order?.address.city}, {order?.address.state} - {order?.address.pincode}</p>
                                                            </OrderDetailTile>
                                                        </div>

                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex items-center justify-between">
                                                <p className="space-x-2"><span>{order?.paymentStatus === "Pending" ? "Amount to be Paid:" : "Amound Paid: "}</span>
                                                    <b className={order?.paymentStatus === "Paid" ? "text-green-700" : "text-yellow-500"}>₹{order?.total}</b> </p>

                                                <Link href={`/order-tracking-status/${orderId}`}>
                                                    <Button variant="secondary" className="flex items-center gap-3">
                                                        <Truck size={17} /><span>Track Order</span>
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    }


                                    <div className={`flex items-center justify-center ${order?.paymentStatus === "Failed" ? "mt-[4rem]" : 'mt-5'}`}>

                                        {
                                            order?.paymentStatus === "Failed" ? <Link href={`/checkout?restaurant=${order.tenantId}`} className="flex items-center gap-4">
                                                <Button className="flex items-center gap-4">
                                                    sm:text-black text-gray-500 <RefreshCw size={17} /> <span>Place again</span>
                                                </Button>
                                            </Link>
                                                : <Link href={`/`} className="flex items-center gap-4">
                                                    <GoButton title="Go to Home" />
                                                </Link>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
            }

        </div>
    )
}

export default OrderPlacementStatus


const OrderDetailTile = ({ children }: { children: React.ReactNode }) => {
    return <div className="sm:grid grid-cols-2 md:gap-2 gap-4 items-start">
        {children}
    </div>
}
