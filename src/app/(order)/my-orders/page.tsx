import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import OrderDataTable from "./components/OrderDataTable"

const OrdersPage = async () => {

    const session = await getSession()

    if (!session) {
        redirect('/login?redirectTo=/my-orders')
    }

    return (
        <div>
            <OrderDataTable />
        </div>
    )
}

export default OrdersPage
