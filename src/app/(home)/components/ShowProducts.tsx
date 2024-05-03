/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../js"
import ProductCard from "./ProductCard"
import { useAppSelector } from "@/lib/redux/hooks"
import { Category, Product } from "@/types"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import MainProductSkeleton from "./MainProductSkeleton"

const ShowProducts = ({ category }: { category: Category }) => {

    const tenantId: string | null = (useAppSelector((state) => state.tenant.selectedTenant))?.id
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const { data: products, isError, isLoading } = useQuery({
        queryKey: ['products-list', tenantId],
        queryFn: () => {
            return getProducts(tenantId)
        },
    })

    useEffect(() => {
        const dataProducts = products?.data?.data
        if (dataProducts?.length > 0) {
            setFilteredProducts(() => dataProducts?.filter((product: Product) => category._id === product.categoryId))
        }
    }, [products?.data])


    return (
        !isError ? isLoading
            ? <div>
                <MainProductSkeleton forProducts={true} />
            </div>
            : products?.data?.data?.length !== 0 ? <div className='sm:grid lg:grid-cols-4 md:grid-cols-3 gap-5 w-full space-y-5 sm:space-y-0 animate-once animate-fade-up animate-duration-[2200] delay-300'>
                {
                    filteredProducts.length > 0
                        ? filteredProducts.map((product: Product) => {
                            return <div key={product._id}>
                                <ProductCard category={category} product={product} />
                            </div>
                        })
                        : <Badge variant="secondary">No {category.name} available at the moment. </Badge>
                }
            </div> : <Badge variant="secondary">No products available for this restaurant</Badge> : <Badge variant="destructive">Error Occured</Badge>
    )
}

export default ShowProducts
