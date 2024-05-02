"use client"

import { useMemo } from 'react'
import CartItem from './components/CartItem'
import { CartItem as ICartItem, updateCart } from '@/lib/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { Button } from '@/components/ui/button'
import { ArrowRight, CircleX, Cookie, Delete, Pizza, Trash2, Wine } from 'lucide-react'
import GoButton from '@/components/custom/GoButton'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

const CartPage = () => {

    const cartItems: ICartItem[] = useAppSelector((state) => state.cart.cartItems)
    const dispatch = useAppDispatch();

    const totalPrice = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.totalPrice
        }, 0)
    }, [cartItems])


    const clearCartHandler = () => {
        dispatch(updateCart([]))
    }


    return (
        <div className="container my-5">
            <div className="md:w-2/3 w-full min-h-screen mx-auto">
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-bold space-x-3'><span>Shopping Cart</span> {<Badge className='mb-1'>{cartItems.length}</Badge>} </h1>
                    <div>
                        {
                            cartItems.length > 0 && <Button onClick={clearCartHandler} className='flex items-center gap-2' variant="secondary" > <Trash2 size={20} /> <span>Clear Cart</span> </Button>
                        }
                    </div>
                </div>
                <div className='bg-white mt-5 p-3 space-y-4 rounded-md'>
                    {
                        (cartItems && cartItems?.length) > 0
                            ? (
                                <div>
                                    {cartItems.map((item: ICartItem, index: number) => {
                                        return <CartItem key={`${item._id}-${index}`} cartItem={item} cartItems={cartItems} />
                                    })}

                                    <div className="p-4 flex items-center justify-between">
                                        <span className='font-bold text-lg'>₹{totalPrice || 0}</span>
                                        <Button className='flex items-center gap-2'><span>Checkout</span> <ArrowRight size={20} /> </Button>
                                    </div>
                                </div>
                            )
                            : <div className='w-full flex items-center flex-col my-10'>
                                <div className='flex items-center justify-center gap-5'>
                                    <Cookie size={50} className='text-gray-400' />
                                    <Pizza size={50} className='text-gray-400' />
                                    <Wine size={50} className='text-gray-400' />
                                </div>
                                <p className='text-center mb-10 mt-5 text-gray-400'>No items in cart</p>
                                <Link href="/#menu">
                                    <GoButton title="Add items in cart" />
                                </Link>
                            </div>
                    }



                </div>
            </div>
        </div>
    )
}

export default CartPage
