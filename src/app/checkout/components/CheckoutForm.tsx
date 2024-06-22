"use client"

import { useQuery } from '@tanstack/react-query'
import CustomerDetailsPaymentMode from './CustomerDetailsPaymentMode'
import OrderDetails from './OrderDetails'
import { getCustomer } from '@/lib/http/endpoints'
import Loading from '@/components/custom/Loading'
import DisplayError from '@/components/custom/DisplayError'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export interface ICheckoutForm {
    address: string;
    paymentMode: string;
    comment: string;
}

const CheckoutForm = () => {


    const { data: customer, isLoading, isError } = useQuery({
        queryKey: ['customer'],
        queryFn: () => {
            return getCustomer()
        }
    })

    const [checkoutForm, setCheckoutForm] = useState<ICheckoutForm>({ address: "", paymentMode: "Online", comment: "" })

    const handleOrderPlace = (e: FormEvent) => {
        e.preventDefault()
        const { address, paymentMode, comment } = checkoutForm

        if (!address) {
            toast.error("Select address of the order")
            return
        }

        if (!paymentMode) {
            toast.error("Please select a payment mode")
        }

        console.log("Placing order....")

    }

    return (
        isLoading
            ? <Loading title="Getting customer details" />
            : isError ? <DisplayError title="Could not load customer details, please try again later..." />
                : <form onSubmit={handleOrderPlace} className="grid grid-cols-3 gap-5 rounded-lg w-full mt-10">
                    <CustomerDetailsPaymentMode checkoutForm={checkoutForm} setCheckoutForm={setCheckoutForm} customer={customer?.data} />
                    <OrderDetails customer={customer?.data} />
                </form>
    )
}

export default CheckoutForm
