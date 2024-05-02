import Image from "next/image"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Category, Product } from "@/types"
import ProductDialog from "./ProductDialog"
import { showMinimumPrice } from "@/lib/utils"


type PropType = { product: Product, category: Category }

const ProductCard = ({ product, category }: PropType) => {
    return (
        <Card className="rounded-lg border-none">
            <CardHeader>
                <div className="h-[180px] w-[180px] mx-auto">
                    <Image
                        src={product.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }} alt={product.name}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-gray-400 text-sm">{product.description}</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-between gap-10 w-full">
                    <span>from  <b className='ml-1'>₹{showMinimumPrice(product)}</b></span>
                    <ProductDialog product={product} category={category}>
                        <span className="p-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white">Choose</span>
                    </ProductDialog>
                </div>
            </CardFooter>
        </Card>

    )
}

export default ProductCard
