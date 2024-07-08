"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp10, ShoppingCart, Trash } from "lucide-react";
import { Category, Product, Topping } from "@/types";
import ExtraToppings from "./ExtraToppings";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { CartItem, ProductConfiguration, addToCart, updateCart } from "@/lib/redux/slices/cartSlice";
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { checkIfItemExistsInCart } from "../js/utility";



type PropTypes = {
    product: Product
    category: Category
    children: React.ReactNode;
}

function ProductDialog({ children, product, category }: PropTypes) {

    const [selectedToppings, setSelectedToppings] = useState<Topping[] | []>([])
    const [productDataCapture, setProductDataCapture] = useState<ProductConfiguration | null>(null)
    const [open, setOpen] = useState(false)
    const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItems)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleProductConfiguration = (key: string, value: string) => {
        setProductDataCapture((prev) => {
            return { ...prev, [key]: value }
        })
    }

    // producing total price of the chosen product
    const totalPrice: number = useMemo(() => {
        if (productDataCapture && product) {

            // 1. calculate main pricing
            const productConfPrice = Object.entries(productDataCapture).reduce((acc, [key, value]) => {
                return acc + (product.priceConfiguration[key].availableOptions[value] || 0)
            }, 0)

            // 2. calculate topping cost
            const toppingPrice = selectedToppings.reduce((acc, curr) => {
                return acc + curr.price
            }, 0)

            return (productConfPrice + toppingPrice)
        } else {
            return 0
        }

    }, [product, productDataCapture, selectedToppings])

    // check if item already present in the cart
    const isProductAlreadyExists = useMemo(() => {

        const itemToSearch: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            tenantId: product.tenantId,
            productConfiguration: productDataCapture,
            toppings: selectedToppings,
            qty: 1,
            totalPrice,
        }

        const result = checkIfItemExistsInCart(cartItems, itemToSearch)
        return result

    }, [product, productDataCapture, selectedToppings, cartItems, totalPrice])

    // remove product from cart
    const removeProductFromCart = () => {
        if (isProductAlreadyExists.isExists) {
            // remove items form the array of cartItems 
            const updatedCartItems = cartItems.filter((_, index) => index !== isProductAlreadyExists.itemIndex)
            dispatch(updateCart(updatedCartItems))

            toast("Product removed from Cart", {
                description: `Removed ${product.name}`,
            })
        }
    }

    // add product to cart
    const addProductToCart = () => {

        const productCartData: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            tenantId: product.tenantId,
            productConfiguration: productDataCapture,
            toppings: selectedToppings,
            qty: 1,
            totalPrice,
        }

        if (isProductAlreadyExists.isExists) {
            const updateCartItems = cartItems.map((item, index) => {
                if (isProductAlreadyExists.itemIndex === index) {
                    const currentQty = item.qty + 1
                    const currentPrice = item.totalPrice / item.qty;
                    const updatedTotalPrice = currentPrice * currentQty;
                    return { ...item, qty: currentQty, totalPrice: updatedTotalPrice }
                } else {
                    return item
                }
            })

            dispatch(updateCart(updateCartItems))
        } else {
            dispatch(addToCart(productCartData))
        }

        toast(!isProductAlreadyExists.isExists ? "Product added to Cart" : "Product quantity increased", {
            description: `${!isProductAlreadyExists.isExists ? "Added" : "Updated"} ${product.name}`,
            action: {
                label: "Go to Cart",
                actionButtonStyle: { backgroundColor: "orangered" },
                onClick: () => router.push('/cart'),
            },
        })

        setOpen(false)
        setSelectedToppings([])
    }


    // default value product configuration on modal open
    useEffect(() => {
        if (product) {
            Object.entries(product.priceConfiguration).map(([key, value]) => {
                const availableOptions = Object.entries(value.availableOptions)
                handleProductConfiguration(key, availableOptions[0][0])
            })
        }
    }, [product, open])




    return <Dialog onOpenChange={(e) => setOpen(e)} open={open} >
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="p-0 rounded max-w-3xl flex flex-col items-start justify-start md:h-[95vh] gap-0">
            <div className="flex items-start h-full w-full">
                <div className="hidden bg-white rounded-l-lg p-8 md:flex items-center justify-between h-full overflow-hidden">
                    <Image className="md:h-[220px] md:w-[220px]" src={product.image} height={220} width={220} alt="pizza-images" />
                </div>
                <div className="rounded-r-lg p-8 flex-1 max-h-[85vh] overflow-x-auto w-full">
                    <Image className="w-[100px] h-[100px] md:hidden block" src={product.image} height={220} width={220} alt="pizza-images" />
                    <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-sm">{product.description}</p>
                    </div>

                    {
                        Object.entries(product.priceConfiguration).map(([key, value]) => {

                            const availableOptions = Object.entries(value.availableOptions)

                            return <div key={key} className="mt-6">
                                <p className="text-sm font-medium">Choose the {key}</p>

                                <RadioGroup
                                    defaultValue={availableOptions[0][0]}
                                    onValueChange={(data) => { handleProductConfiguration(key, data) }}
                                    className="grid grid-cols-3 gap-4 mt-2">
                                    {
                                        availableOptions.map(([optionKey, optionValue]) => {
                                            return <div key={optionKey}>
                                                <RadioGroupItem
                                                    value={optionKey}
                                                    id={optionKey}
                                                    className="peer sr-only "
                                                    aria-label={optionKey}
                                                />
                                                <Label
                                                    htmlFor={optionKey}
                                                    className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                    {optionKey} <br />
                                                    <span className="mt-2">{`₹${optionValue}`}</span>
                                                </Label>
                                            </div>
                                        })
                                    }
                                </RadioGroup>
                            </div>
                        })
                    }


                    {category.hasToppings ?
                        <div className="mt-6">
                            <ExtraToppings selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings} />
                        </div>
                        :
                        <Badge variant="secondary" className="mt-10">Toppings are not available for this product</Badge>
                    }

                </div>
            </div>
            <div className="flex items-center justify-end gap-10 bg-white py-2 container rounded-b-lg">
                <span className="font-bold text-xl">₹{totalPrice}</span>
                {
                    !isProductAlreadyExists.isExists
                        ? <Button onClick={addProductToCart}>
                            <ShoppingCart size={22} />
                            <span className="ml-3">Add to Cart</span>
                        </Button>
                        :
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" onClick={() => removeProductFromCart()}>
                                <Trash size={22} />
                                <span className="ml-3">Remove</span>
                            </Button>
                            <Button onClick={addProductToCart}>
                                <ArrowUp10 size={22} />
                                <span className="ml-3">Add again</span>
                            </Button>
                        </div>

                }

            </div>
        </DialogContent>
    </Dialog>

}


export default ProductDialog

