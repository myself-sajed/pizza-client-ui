'use client'

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from "./MainProducts";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ExtraToppings from "./ExtraToppings";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export interface Topping {
    id: string;
    name: string;
    price: number;
    image: string;
}

type PropTypes = {
    product: Product
    children: React.ReactNode;
}

export function ProductDialog({ children, product }: PropTypes) {


    const toppings: Topping[] = [
        { id: '1', name: 'Chicken', image: '/assets/chicken.png', price: 10 },
        { id: '2', name: 'Jelapeno', image: '/assets/jelapeno.png', price: 20 },
        { id: '3', name: 'Cheese', image: '/assets/cheese.png', price: 30 },
    ]

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([toppings[0]])


    return <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="p-0 rounded max-w-3xl">
            <div className="flex items-start">
                <div className="bg-white rounded-l-lg p-8 flex items-center justify-between h-full">
                    <Image src={'/assets/pizza-main.png'} height={220} width={220} alt="pizza-images" />
                </div>
                <div className="rounded-r-lg p-8 flex-1">
                    <div>
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-sm">{product.description}</p>
                    </div>


                    <div className="mt-6">
                        <p className="text-sm font-medium">Choose the size</p>
                        <RadioGroup
                            defaultValue="small"
                            className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                                <RadioGroupItem
                                    value="small"
                                    id="small"
                                    className="peer sr-only "
                                    aria-label="Small"
                                />
                                <Label
                                    htmlFor="small"
                                    className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Small
                                </Label>
                            </div>

                            <div>
                                <RadioGroupItem
                                    value="medium"
                                    id="medium"
                                    className="peer sr-only "
                                    aria-label="Medium"
                                />
                                <Label
                                    htmlFor="medium"
                                    className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Medium
                                </Label>
                            </div>

                            <div>
                                <RadioGroupItem
                                    value="large"
                                    id="large"
                                    className="peer sr-only "
                                    aria-label="Large"
                                />
                                <Label
                                    htmlFor="large"
                                    className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Large
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="mt-6">
                        <p className="text-sm font-medium">Choose the crust</p>
                        <RadioGroup
                            defaultValue="thin"
                            className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                                <RadioGroupItem
                                    value="thin"
                                    id="thin"
                                    className="peer sr-only "
                                    aria-label="thin"
                                />
                                <Label
                                    htmlFor="thin"
                                    className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Thin
                                </Label>
                            </div>

                            <div>
                                <RadioGroupItem
                                    value="thick"
                                    id="thick"
                                    className="peer sr-only "
                                    aria-label="thick"
                                />
                                <Label
                                    htmlFor="thick"
                                    className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Thick
                                </Label>
                            </div>

                        </RadioGroup>
                    </div>
                    <div className="mt-6">
                        <p className="text-sm font-medium">Choose the toppings</p>
                        <ExtraToppings toppings={toppings} selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings} />
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                        <span className="font-bold">₹600</span>
                        <Button>
                            <ShoppingCart />
                            <span className="ml-5">Add to Cart</span>
                        </Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>

}

