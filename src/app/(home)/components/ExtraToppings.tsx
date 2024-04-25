/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ToppingCard from "./ToppingCard"
import { Topping } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getToppings } from "../js";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";


export type ToppingsPropType = {
    selectedToppings: Topping[]
    setSelectedToppings: Dispatch<SetStateAction<Topping[]>>;
}

const ExtraToppings = ({ selectedToppings, setSelectedToppings }: ToppingsPropType) => {

    const { data: toppings, isLoading, isError } = useQuery({
        queryKey: ['toppings-list'],
        queryFn: () => {
            return getToppings()
        },
    })

    return (
        <div className="mt-2">
            {
                isLoading
                    ? <div>
                        <ToppingSkelton />
                    </div>
                    : !isError
                        ? <div className="grid grid-cols-3 gap-4">
                            {
                                toppings?.data.map((topping: Topping) => {
                                    return <ToppingCard topping={topping} key={topping._id} selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings} />
                                })
                            }
                        </div>
                        : <Badge variant="destructive">Error occured while fetching toppings</Badge>}
        </div>
    )
}

export default ExtraToppings


const ToppingSkelton = () => {
    return (
        <div className="grid grid-cols-3 gap-5 w-full">
            {
                [1, 2, 3].map((item) => {
                    return <div key={item} className="flex flex-col space-y-3">
                        <Skeleton className="h-[150px] w-[125px] rounded-xl bg-[#e2e2e2]" />
                    </div>
                })
            }
        </div>
    )
}
