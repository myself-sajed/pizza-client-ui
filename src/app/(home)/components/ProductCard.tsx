import Image from "next/image"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductDialog } from "./ProductDialog"
import { Product } from "@/types"


type PropType = { product: Product }

const ProductCard = ({ product }: PropType) => {
    return (
        <Card className="rounded-lg border-none">
            <CardHeader>
                <Image className="mx-auto" src={product.image} alt={"product-image-pizza"} height={130} width={130} />
            </CardHeader>
            <CardContent>
                <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-between gap-10 w-full">
                    <span>from  <b className='ml-1'>₹{100}</b></span>
                    <ProductDialog product={product}>
                        <span className="p-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white">Choose</span>
                    </ProductDialog>
                </div>
            </CardFooter>
        </Card>

    )
}

export default ProductCard
