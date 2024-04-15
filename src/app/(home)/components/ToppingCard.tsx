'use client'

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Topping } from "./ProductDialog"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToppingPropType = {
    topping: Topping;
    selectedToppings: Topping[]
    setSelectedToppings: Dispatch<SetStateAction<Topping[]>>;
}

const ToppingCard = ({ topping, selectedToppings, setSelectedToppings }: ToppingPropType) => {

    const selectedItem = selectedToppings.some((item) => item.id === topping.id)

    const handleToppingsCheck = () => {
        if (selectedItem) {
            setSelectedToppings((prev) => prev.filter((item) => item.id !== topping.id))
        } else {
            setSelectedToppings((prev) => [...prev, topping])
        }
    }

    return (
        <Button onClick={handleToppingsCheck} variant="outline" className={cn(
            "p-3 flex flex-col h-40 relative border-2",
            selectedItem ? "border-primary" : ""
        )}>
            {selectedItem && <CircleCheck size={19} className="text-primary absolute top-1 right-1 text-sm" />}
            <Image src={topping.image} alt={topping.name} height={60} width={60} />
            <p className="mt-3">{topping.name}</p>
            <p className="mt-1">₹{topping.price}</p>
        </Button>
    )
}

export default ToppingCard