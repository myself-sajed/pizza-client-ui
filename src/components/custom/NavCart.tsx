'use client'

import { ShoppingBasket } from "lucide-react"
import { useAppSelector } from "@/lib/redux/hooks"
import Link from "next/link"

const NavCart = () => {
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    return (
        <Link href="/cart" className="cursor-pointer relative hover:text-primary" >
            <ShoppingBasket />
            <span className="sr-only">CartItems</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary border-2 border-white rounded-full -top-3 p-2 -end-2 dark:border-gray-900">
                {cartItems.length || 0}
            </div>
        </Link>
    )
}

export default NavCart
