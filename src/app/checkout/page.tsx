import getSession from "@/lib/session"
import CustomerDetailsPaymentMode from "./components/CustomerDetailsPaymentMode"
import OrderDetails from "./components/OrderDetails"
import { redirect } from "next/navigation"

const CheckoutPage = async () => {

    const session = await getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="w-[70%] mx-auto my-10">
            <div className="grid grid-cols-3 gap-5 rounded-lg ">
                {/* CHECKOUT FORM */}
                <CustomerDetailsPaymentMode />
                {/* ORDER DETAILS */}
                <OrderDetails />
            </div>
        </div>
    )
}

export default CheckoutPage
