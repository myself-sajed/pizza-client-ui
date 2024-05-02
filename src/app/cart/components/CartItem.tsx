import { Trash } from 'lucide-react'
import Image from 'next/image'
import pizza from '/public/assets/spirte.png'
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
        <div className="w-full grid grid-cols-8 items-center border-b-2 border-secondary py-3">
            <div className='flex items-center gap-7 col-span-4'>
                <Image src={pizza} height={90} width={90} alt="Pizza" />

                <div>
                    <p className='font-medium'>{cartItem.name}</p>
                    <p className='text-gray-500 text-sm'>{cartItem?.productConfiguration ? Object.values(cartItem?.productConfiguration).join(', ') : null}</p>
                    <p className='text-gray-500 text-sm'>{cartItem.toppings.map((topping) => topping.name).join(', ')}</p>
                </div>
            </div>
            <div className="col-span-2">
                <div className="bg-gray-200 inline-flex rounded-full items-center gap-2 font-semibold">
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger onClick={decrementProductCount} ><button className='py-2 px-5 hover:bg-gray-100 rounded-full'>-</button></TooltipTrigger>
                            <TooltipContent>
                                Decrease quantity
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <span>{cartItem.qty}</span>
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger onClick={incrementProductCount}><button className='py-2 px-5 hover:bg-gray-100 rounded-full'>+</button></TooltipTrigger>
                            <TooltipContent>
                                Increase quantity
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>
            </div>
            <span className='font-bold'>₹{cartItem.totalPrice}</span>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger onClick={() => removeProductFromCart()} >
                        <Trash className='rounded hover:bg-gray-100 p-2 inline' size={35} />
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
