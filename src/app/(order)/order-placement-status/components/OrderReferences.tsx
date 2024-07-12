import { Order } from '@/types'
import Link from 'next/link'
import { Bike, Box, CreditCard, Home, IndianRupee } from "lucide-react"
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const OrderReferences = ({ order, orderId }: { order: Order, orderId: string }) => {

    const pathname = usePathname()

    return (
        <div className={cn("pb-2", !pathname.includes("tracking") ? "border-b" : '')}>
            <p className="text-gray-600 text-xs md:text-sm">Order references</p>
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
                {
                    !pathname.includes("tracking") && <>
                        <OrderDetailTile>
                            <p className="flex items-center gap-2 sm:text-black text-gray-500 "><Bike size={17} />Est. Delivery</p>
                            <p>20 mins approx.</p>
                        </OrderDetailTile>
                        <OrderDetailTile>
                            <p className="flex items-center gap-2 sm:text-black text-gray-500 "><Home size={17} />Delivery Address</p>
                            <p>{order?.address.addressLine}, {order?.address.city}, {order?.address.state} - {order?.address.pincode}</p>
                        </OrderDetailTile>
                    </>
                }
            </div>

        </div>
    )
}

export default OrderReferences




export const OrderDetailTile = ({ children }: { children: React.ReactNode }) => {
    return <div className="sm:grid grid-cols-2 md:gap-2 gap-4 items-start">
        {children}
    </div>
}
