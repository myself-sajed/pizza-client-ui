"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { verifyCoupon } from '@/lib/http/endpoints'
import { useAppSelector } from '@/lib/redux/hooks'
import { CartItem } from '@/lib/redux/slices/cartSlice'
import { Loader, Trash } from 'lucide-react'
import React, { useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

const TAXES = 12
const DELIVERY_CHARGE = 50

export interface ICoupon {
    discount: number;
    title: null;
}

type PropTypes = {
    coupon: ICoupon
    setCoupon: React.Dispatch<React.SetStateAction<ICoupon>>;
    initialCouponState: ICoupon,
    isPending: boolean
}

const OrderSummary = ({ coupon, setCoupon, initialCouponState, isPending }: PropTypes) => {

    const cartItems = useAppSelector((state) => state.cart?.cartItems)
    const couponRef = useRef<HTMLInputElement>(null)
    const selectedTenant = useAppSelector((state) => state.tenant?.selectedTenant)
    const [loading, setLoading] = useState(false)

    const subTotal = useMemo(() => {
        return cartItems.reduce((acc: number, item: CartItem) => {
            return acc + item.totalPrice
        }, 0)
    }, [cartItems])

    const amountOfDiscount = useMemo(() => {
        return Math.round((subTotal * coupon.discount) / 100)
    }, [subTotal, coupon])

    const amountOfTax = useMemo(() => {
        return Math.round((subTotal * TAXES) / 100)
    }, [subTotal])

    const grandTotal = useMemo(() => {
        return Math.round((subTotal + amountOfTax + DELIVERY_CHARGE) - amountOfDiscount)
    }, [subTotal, amountOfTax, amountOfDiscount])

    async function validateCoupon(e: React.MouseEvent) {
        e.preventDefault()
        if (!couponRef.current || couponRef.current.value.trim() === "") {
            toast.error("Please Enter Coupon Code")
            return
        }

        if (!selectedTenant) {
            toast.error("Please select a restaurant before applying a coupon")
            return
        }

        try {
            setLoading(true)
            const res = await verifyCoupon(couponRef.current.value, selectedTenant?.id)
            const data = res?.data


            if (data?.status === 'error') {
                return toast.error(data?.message)
            } else if (data?.status === 'success') {
                setCoupon(data?.coupon)
                couponRef.current.disabled = true;
                toast.success('Coupon redeemed successfully')
            }

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }

    }

    const removeCoupon = () => {
        setCoupon(initialCouponState)
        if (couponRef.current) {
            couponRef.current.disabled = false;
        }
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <h1 className="pb-3 text-xl font-semibold text-primary border-b">Order Summary</h1>
            <div className="py-5 text-sm space-y-4">
                <p className="flex items-center justify-between"><span>Subtotal</span><span className="font-bold">₹{subTotal}</span></p>
                <p className="flex items-center justify-between">
                    <span>Taxes <time className='text-[10px]'>{`(${TAXES}%)`}</time></span>
                    <span className="font-bold">₹{amountOfTax}</span>
                </p>
                <p className="flex items-center justify-between"><span>Delivery Charge</span><span className="font-bold">₹{DELIVERY_CHARGE}</span></p>
                <p className="flex items-center justify-between pb-5 border-b">
                    <span>Discount <time className='text-[10px]'>{`(${coupon.discount}%)`}</time></span>
                    <span className="font-bold text-green-700">-₹{amountOfDiscount}</span>
                </p>
                <p className="flex items-center justify-between"><span className="font-bold">Order Total</span><span className={coupon.title ? "text-green-700 font-bold" : "font-bold"}>₹{grandTotal}</span></p>

                <div>
                    <div className="flex w-full items-center space-x-2">
                        <Input ref={couponRef} type="text" placeholder="Coupon Code" />
                        <Button disabled={loading || (coupon.title ? true : false)} onClick={validateCoupon} variant="outline" className="bg-background" type="button">{loading ? <Loader className='animate-spin' size={19} /> : "Apply"}</Button>
                    </div>
                    <p className='text-xs mt-1 text-yellow-500'>Note: Coupon Codes are case-sensitive</p>
                    {coupon.title && <p className='bg-green-100 rounded-md p-3 mt-2 flex items-center justify-between gap-3'><b className="text-green-700 flex-1">{coupon.title}</b> <span onClick={removeCoupon} className='cursor-pointer' ><Trash size={16} className="text-red-700 hover:text-red-400" /></span> </p>}
                </div>

            </div>

            <Button className="w-full mt-4 space-x-3" disabled={isPending} type="submit">
                {
                    !isPending
                        ? <span>Place Order</span>
                        : <>
                            <span><Loader size={20} className='animate-spin' /></span>
                            <span>Placing Order...</span>
                        </>
                }
            </Button>
        </div>
    )
}

export default OrderSummary
