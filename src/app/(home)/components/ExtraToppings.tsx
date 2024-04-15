'use client'

import { Dispatch, SetStateAction } from "react";
import { Topping } from "./ProductDialog"
import ToppingCard from "./ToppingCard"


export type ToppingsPropType = {
    toppings: Topping[];
    selectedToppings: Topping[]
    setSelectedToppings: Dispatch<SetStateAction<Topping[]>>;
}

const ExtraToppings = ({ toppings, selectedToppings, setSelectedToppings }: ToppingsPropType) => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-2">
            {
                toppings?.map((topping) => {
                    return <ToppingCard topping={topping} key={topping.id} selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings} />
                })
            }
        </div>
    )
}

export default ExtraToppings
