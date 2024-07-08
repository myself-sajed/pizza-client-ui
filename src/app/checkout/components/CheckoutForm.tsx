"use client"

import { useMutation, useQuery } from '@tanstack/react-query'
import CustomerDetailsPaymentMode from './CustomerDetailsPaymentMode'
import { createOrder, getCustomer } from '@/lib/http/endpoints'
import Loading from '@/components/custom/Loading'
import DisplayError from '@/components/custom/DisplayError'
import { FormEvent, useRef, useState } from 'react'
import { toast } from 'sonner'
import OrderSummary from './OrderSummary'
import { useAppSelector } from '@/lib/redux/hooks'
import { useRouter } from 'next/navigation'
import { Address, Order } from '@/types'
import { v4 as uuid } from 'uuid'

export interface ICheckoutForm {
    address: Address;
    paymentMode: string;
    comment: string;
}

const CheckoutForm = () => {

    const [checkoutForm, setCheckoutForm] = useState<ICheckoutForm>({
        address:
            { addressLine: '', city: '', state: '', country: 'India', pincode: '', isDefault: false }, paymentMode: "Card", comment: ""
    })
    const initialCouponState = { discount: 10, title: null }
    const idemKeyRef = useRef("")
    const [coupon, setCoupon] = useState(initialCouponState)
    const cart = useAppSelector((state) => state.cart.cartItems)
    const router = useRouter()

    const { data: customer, isLoading, isError } = useQuery({
        queryKey: ['customer'],
        queryFn: () => {
            return getCustomer()
        }
    })


    const { mutate: orderMutate, isPending } = useMutation({
        mutationKey: ['order'],
        mutationFn: async (orderData: Order) => {

            // generate idem key
            const idemKey = idemKeyRef.current ? idemKeyRef.current : (idemKeyRef.current = uuid() + orderData.customerId)
            return await createOrder(orderData, idemKey).then((res) => res.data)
        },
        onSuccess: (data: { paymentURL: string | null, orderId: string, tenantId: string }) => {
            if (data.paymentURL) {
                window.location.href = data.paymentURL
                return
            }

            router.replace(`/order-placement-status/?orderId=${data.orderId}&restaurant=${data.tenantId}`)
        }
    })


    const handleOrderPlace = (e: FormEvent) => {
        e.preventDefault()
        const { address, paymentMode, comment } = checkoutForm

        if (!customer?.data) {
            toast.error("Customer not found")
            router.replace('/')
            return
        }

        if (!address.addressLine && !address.city && !address.pincode && !address.city && !address.state) {
            toast.error("Select address of the order")
            return
        }

        if (!paymentMode) {
            toast.error("Please select a payment mode")
            return
        }

        if (!cart || cart.length === 0) {
            toast.error("Your cart is empty, please add items to cart")
            router.replace('/#menu')
            return
        }

        let tenantId: string | null | undefined = cart[0].tenantId || null

        if (!tenantId) {
            toast.error("Please select a restaurant")
            router.replace('/#menu')
            return
        }

        const orderBody: Order = {
            cartItems: cart,
            customerId: customer?.data?._id,
            tenantId,
            address,
            paymentMode,
            comment,
            coupon
        }

        orderMutate(orderBody)

    }

    return (
        isLoading
            ? <div className="h-screen">
                <Loading className='h-1/2' title="Getting customer details" />
            </div>
            : isError ? <div className='h-screen'>
                <DisplayError className='h-1/2' title="Could not load customer details, please try again later..." />
            </div>
                : <form onSubmit={handleOrderPlace} className="md:grid grid-cols-3 md:space-y-0 space-y-4 gap-5 rounded-lg w-full mt-10">
                    <CustomerDetailsPaymentMode checkoutForm={checkoutForm} setCheckoutForm={setCheckoutForm} customer={customer?.data} />
                    <OrderSummary coupon={coupon} setCoupon={setCoupon} initialCouponState={initialCouponState} isPending={isPending} />
                </form>
    )
}

export default CheckoutForm
