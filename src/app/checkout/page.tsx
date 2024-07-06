import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import CheckoutForm from "./components/CheckoutForm"

const CheckoutPage = async () => {

    const session = await getSession()

    if (!session) {
        redirect('/login?redirectTo=/checkout')
    }

    return (
        <div className="w-[70%] mx-auto pb-32 h-screen">
            <CheckoutForm />
        </div>
    )
}

export default CheckoutPage
