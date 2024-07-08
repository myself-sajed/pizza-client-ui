import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import CheckoutForm from "./components/CheckoutForm"

const CheckoutPage = async () => {

    const session = await getSession()

    if (!session) {
        redirect('/login?redirectTo=/checkout')
    }

    return (
        <div className="lg:w-[70%] md:w-[85%] w-[95%] mx-auto pb-32 min-h-screen">
            <CheckoutForm />
        </div>
    )
}

export default CheckoutPage
