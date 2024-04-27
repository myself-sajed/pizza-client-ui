"use client"

import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../js"
import ProductCard from "./ProductCard"
import { useAppSelector } from "@/lib/redux/hooks"
import { Category, Product } from "@/types"
import { Badge } from "@/components/ui/badge"

const ShowProducts = ({ category }: { category: Category }) => {

    const tenantId = useAppSelector((state) => state.tenant.selectedTenant)

    const { data: products, isError } = useQuery({
        queryKey: ['products-list', tenantId],
        queryFn: () => {
            return getProducts(tenantId)
        },
    })


    return (
        !isError ? products?.data?.data?.length !== 0 ? <div className='sm:grid lg:grid-cols-4 md:grid-cols-3 gap-5 w-full space-y-5 sm:space-y-0'>
            {
                products?.data?.data.map((product: Product) => {
                    return category._id === product.categoryId && <div key={product._id}>
                        <ProductCard product={product} />
                    </div>
                })
            }
        </div> : <Badge variant="secondary">No products available for this restaurant</Badge> : <Badge variant="destructive">Error Occured</Badge>
    )
}

export default ShowProducts
