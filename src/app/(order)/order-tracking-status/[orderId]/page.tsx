import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import OrderTracking from "./components/OrderTracking"

const OrderTrackingStatus = async ({ params }: { params: { orderId: string } }) => {

    const session = await getSession()
    if (!session) {
        redirect(`/login?redirectTo=/order-tracking-status/${params.orderId}`)
    }

    return (
        <div>
            <OrderTracking orderId={params.orderId} />
        </div>
    )
}

export default OrderTrackingStatus
