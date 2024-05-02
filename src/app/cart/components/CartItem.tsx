import { Trash } from 'lucide-react'
import Image from 'next/image'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { CartItem as ICartItem, updateCart } from '@/lib/redux/slices/cartSlice'
import { toast } from 'sonner'
import { useAppDispatch } from '@/lib/redux/hooks'
import { checkIfItemExistsInCart } from '@/app/(home)/js/utility'
import { useMemo } from 'react'

const CartItem = ({ cartItem, cartItems }: { cartItem: ICartItem, cartItems: ICartItem[] }) => {

    const dispatch = useAppDispatch()

    const isProductAlreadyExists = useMemo(() => {
        return checkIfItemExistsInCart(cartItems, cartItem)
    }, [cartItem, cartItems])


    const removeProductFromCart = () => {
        if (isProductAlreadyExists.isExists) {
            // remove items form the array of cartItems 
            const updatedCartItems = cartItems.filter((_, index) => index !== isProductAlreadyExists.itemIndex)
            dispatch(updateCart(updatedCartItems))

            toast("Product removed from Cart", {
                description: `Removed ${cartItem.name} (${Object.values({ ...cartItem?.productConfiguration || {} }).join(', ')})`,
            })
        }
    }


    const incrementProductCount = () => {
        const updatedCartItems = cartItems.map((item, index) => {
            if (isProductAlreadyExists.itemIndex === index) {
                const currentQty = item.qty + 1
                const currentPrice = item.totalPrice / item.qty;
                const updatedTotalPrice = currentPrice * currentQty;
                return { ...item, qty: currentQty, totalPrice: updatedTotalPrice }
            } else {
                return item
            }
        })

        dispatch(updateCart(updatedCartItems))
    }

    const decrementProductCount = () => {
        const updatedCartItems = cartItems.map((item, index) => {
            if (isProductAlreadyExists.itemIndex === index) {
                // Ensure quantity does not go below 1
                const currentQty = Math.max(item.qty - 1, 1);
                const currentPrice = item.totalPrice / item.qty;
                const updatedTotalPrice = currentPrice * currentQty;
                return { ...item, qty: currentQty, totalPrice: updatedTotalPrice };
            } else {
                return item;
            }
        });

        dispatch(updateCart(updatedCartItems));
    }


    return (
        <div className="w-full grid md:grid-cols-9 grid-cols-5  items-center border-b-2 border-secondary py-6">
            <div className='flex items-center gap-7 md:col-span-4 col-span-5'>
                <Image src={cartItem.image} height={90} width={90} alt="Pizza" />

                <div>
                    <p className='font-medium'>{cartItem.name}</p>
                    <p className='text-gray-500 sm:text-sm text-xs'>{cartItem?.productConfiguration ? Object.values(cartItem?.productConfiguration).join(', ') : null}</p>
                    <p className='text-gray-500 sm:text-sm text-xs'>{cartItem.toppings.map((topping) => topping.name).join(', ')}</p>
                </div>
            </div>
            <span className='md:block hidden'></span>
            <div className="md:col-span-2 md:mt-0 mt-5">
                <div className="bg-gray-100 inline-flex rounded-full items-center gap-2 font-semibold">
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger onClick={decrementProductCount} ><button className='py-2 px-5 hover:bg-[#fafafa] rounded-full'>-</button></TooltipTrigger>
                            <TooltipContent>
                                Decrease quantity
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span>{cartItem.qty}</span>
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger onClick={incrementProductCount}><button className='py-2 px-5 hover:bg-[#fafafa] rounded-full'>+</button></TooltipTrigger>
                            <TooltipContent>
                                Increase quantity
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
            </div>
            <p className='font-bold md:mt-0 mt-5 md:ml-0 sm:ml-[80px] ml-[92px]'>₹{cartItem.totalPrice}</p>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger onClick={() => removeProductFromCart()} >
                        <Trash className='rounded hover:bg-gray-100 p-2 inline md:mt-0 mt-5 md:ml-0 ml-[120px]' size={35} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className='font-semibold'>Remove from cart</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default CartItem
