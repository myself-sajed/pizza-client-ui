/* eslint-disable react-hooks/exhaustive-deps */
import { Bike, CookingPot, NotebookPen, PackageCheck, Pizza, ThumbsUp, Truck, Home } from "lucide-react"
import { Step, StepItem, Stepper, useStepper } from "@/components/stepper"
import { getOrder } from "@/lib/http/endpoints"
import { useQuery } from "@tanstack/react-query"
import { Order } from "@/types"
import { useEffect } from "react"

const OrderStepper = ({ orderId, restaurant }: { orderId: string, restaurant: string }) => {

    const { data: order } = useQuery({
        queryKey: [`OrderStatus`, orderId, restaurant],
        queryFn: () => getOrder(orderId!, restaurant!, "orderStatus").then(res => res.data as Order),
        refetchInterval: 1000 * 5
    })

    const { setStep } = useStepper()

    const orderStatusMapping = {
        Received: 0,
        Confirmed: 1,
        Prepared: 2,
        "Out for Delivery": 3,
        Delivered: 4
    } as { [key: string]: number }

    useEffect(() => {
        if (order) {
            const currentStatus = orderStatusMapping[order.orderStatus as string];
            if (currentStatus !== undefined) {
                setStep(currentStatus + 1)
            }
        }
    }, [order, setStep, orderStatusMapping])

    return (
        <Stepper className="mt-4" initialStep={0} steps={steps} variant="circle-alt" >
            {
                steps.map((item) => {
                    return <Step key={item.label} label={item.label}
                        icon={item.icon} checkIcon={item.icon} />
                })
            }

            <OrderStatusChanger orderId={orderId} restaurant={restaurant} />
        </Stepper>
    )
}

export default OrderStepper


const OrderStatusChanger = ({ orderId, restaurant }: { orderId: string, restaurant: string }) => {

    const { data: order, isRefetching } = useQuery({
        queryKey: [`OrderStatus`, orderId, restaurant],
        queryFn: () => getOrder(orderId!, restaurant!, "orderStatus").then(res => res.data as Order),
        refetchInterval: 1000 * 15
    })

    const { setStep } = useStepper()

    const orderStatusMapping = {
        Received: 0,
        Confirmed: 1,
        Prepared: 2,
        "Out for delivery": 3,
        Delivered: 4
    } as { [key: string]: number }

    useEffect(() => {
        if (order) {
            const currentStatus = orderStatusMapping[order.orderStatus as string];
            if (currentStatus !== undefined) {
                setStep(currentStatus + 1)
            }
        }
    }, [order, setStep, orderStatusMapping])

    return <></>
}

export { OrderStatusChanger }

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
        label: "Prepared",
        icon: CookingPot
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
