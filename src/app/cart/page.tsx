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
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../(home)/js'
import { Product } from '@/types'
import ProductCard from '../(home)/components/ProductCard'

const CartPage = () => {

    const tenantId: string | null = (useAppSelector((state) => state.tenant.selectedTenant))?.id


    const { data: products, isError } = useQuery({
        queryKey: ['products-list', tenantId],
        queryFn: () => {
            return getProducts(tenantId)
        },
    })

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
            <div className="md:w-4/5 w-full min-h-screen mx-auto animate-once animate-fade-up animate-duration-[2000]">
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-bold space-x-3'><span>Shopping Cart</span> {<Badge className='mb-1'>{cartItems.length}</Badge>} </h1>
                    <div>
                        {
                            cartItems.length > 0 && <Button onClick={clearCartHandler} className='flex items-center gap-2' variant="secondary" > <Trash2 size={20} /> <span>Clear Cart</span> </Button>
                        }
                    </div>
                </div>


                {/* SHOPPING CART */}
                <div className='bg-white mt-5 p-5 space-y-4 rounded-md'>
                    {
                        (cartItems && cartItems?.length) > 0
                            ? (
                                <div>
                                    {cartItems.map((item: ICartItem, index: number) => {
                                        return <CartItem key={`${item._id}-${index}`} cartItem={item} cartItems={cartItems} />
                                    })}

                                    <div className="p-4 flex items-center justify-between" id="checkout">
                                        <span className='font-bold text-lg'>₹{totalPrice || 0}</span>
                                        <Button className='flex items-center gap-2'><span>Checkout</span> <ArrowRight size={20} /> </Button>
                                    </div>
                                </div>
                            )
                            : <div className='w-full flex items-center flex-col my-10'>
                                <div className='flex items-center justify-center gap-5'>
                                    <Cookie size={30} className='text-gray-400' />
                                    <Pizza size={30} className='text-gray-400' />
                                    <Wine size={30} className='text-gray-400' />
                                </div>
                                <p className='text-center mb-10 mt-5 text-gray-400'>No items in cart</p>
                                <Link href="/#menu">
                                    <GoButton title="Add items in cart" />
                                </Link>
                            </div>
                    }



                </div>


                {/* SUGGESTED ITEMS */}
                {
                    (products?.data?.data?.length > 0) && <div className='mt-10'>
                        <h1 className='text-lg font-bold space-x-3 mb-5'><span>{(cartItems && cartItems?.length) !== 0 ? "Trending Items" : "Suggested Items"}</span> {<Badge className='mb-1'>{products?.data?.data?.length}</Badge>} </h1>
                        <div className='grid grid-cols-4 gap-4 w-full'>
                            {
                                products?.data?.data?.map((product: Product) => {
                                    return <div key={product._id}>
                                        <ProductCard category={product.category} product={product} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartPage
