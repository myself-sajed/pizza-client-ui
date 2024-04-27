/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ToppingCard from "./ToppingCard"
import { Topping } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getToppings } from "../js";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/lib/redux/hooks";


export type ToppingsPropType = {
    selectedToppings: Topping[]
    setSelectedToppings: Dispatch<SetStateAction<Topping[]>>;
}

const ExtraToppings = ({ selectedToppings, setSelectedToppings }: ToppingsPropType) => {

    const tenantId = (useAppSelector((state) => state.tenant.selectedTenant))?.id

    const { data: toppings, isLoading, isError } = useQuery({
        queryKey: ['toppings-list', tenantId],
        queryFn: () => {
            return getToppings(tenantId)
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
                        ?
                        <div>
                            <p className="text-sm font-medium inline">Choose the toppings</p> <Badge>{toppings?.data?.length || 0}</Badge>
                            {toppings?.data.length !== 0
                                ? <div className="grid grid-cols-3 gap-4 mt-2">
                                    {
                                        toppings?.data.map((topping: Topping) => {
                                            return <ToppingCard topping={topping} key={topping._id} selectedToppings={selectedToppings} setSelectedToppings={setSelectedToppings} />
                                        })
                                    }
                                </div>
                                : <Badge variant="secondary">Toppings are not available for this restaurant</Badge>}
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
