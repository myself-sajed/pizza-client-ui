"use client"

import GoButton from '@/components/custom/GoButton'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/lib/redux/hooks'
import Link from 'next/link'
import React from 'react'

const OrderNowButton = () => {

    const cartItems = useAppSelector((state) => state.cart.cartItems)

    return (
        <Link href={cartItems.length > 0 ? "/cart#checkout" : "#menu"} className="mt-10 grid gap-3 w-full sm:inline-flex">
            <GoButton title="Order Now" />
        </Link>
    )
}

export default OrderNowButton


