'use client'

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Topping } from "@/types";

export type ToppingPropType = {
    topping: Topping;
    selectedToppings: Topping[]
    setSelectedToppings: Dispatch<SetStateAction<Topping[]>>;
}

const ToppingCard = ({ topping, selectedToppings, setSelectedToppings }: ToppingPropType) => {

    const isAlreadySelected = selectedToppings.some((item) => item._id === topping._id)

    const handleToppingsCheck = () => {
        if (isAlreadySelected) {
            setSelectedToppings((prev) => prev.filter((item) => item._id !== topping._id))
        } else {
            setSelectedToppings((prev) => [...prev, topping])
        }
    }

    return (
        <Button onClick={handleToppingsCheck} variant="outline" className={cn(
            "md:p-3 p-2 flex flex-col md:h-40 h-30 relative border-2",
            isAlreadySelected ? "border-primary" : ""
        )}>
            {isAlreadySelected && <CircleCheck size={19} className="text-primary absolute top-1 right-1 text-sm" />}
            <Image className="md:h-[60px] md:w-[60px]" src={topping.image} alt={topping.name} height={60} width={60} />
            <p className="mt-3">{topping.name}</p>
            <p className="mt-1">₹{topping.price}</p>
        </Button>
    )
}

export default ToppingCard