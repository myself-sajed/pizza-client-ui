"use client"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Topping } from "@/types";
import ExtraToppings from "./ExtraToppings";


type PropTypes = {
    product: Product
    children: React.ReactNode;
}

export function ProductDialog({ children, product }: PropTypes) {

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])


    return <Dialog >
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="p-0 rounded max-w-3xl flex flex-col items-start justify-start h-[95vh] gap-0">
            <div className="flex items-start h-full">
                <div className="bg-white rounded-l-lg p-8 flex items-center justify-between h-full overflow-hidden">
                    <Image src={product.image} height={220} width={220} alt="pizza-images" />
                </div>
                <div className="rounded-r-lg p-8 flex-1 max-h-[85vh] overflow-x-auto">
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

                    <div className="mt-6">
                        <p className="text-sm font-medium">Choose the toppings</p>
                        <ExtraToppings selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings} />
                    </div>

                </div>
            </div>
            <div className="flex items-center justify-end gap-10 bg-white py-2 container rounded-b-lg">
                <span className="font-bold text-xl">₹600</span>
                <Button>
                    <ShoppingCart />
                    <span className="ml-5">Add to Cart</span>
                </Button>
            </div>
        </DialogContent>
    </Dialog>

}

