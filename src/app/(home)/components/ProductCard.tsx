import Image from "next/image"
import { Product } from "./MainProducts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


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
                <div className="flex items-center justify-between gap-10">
                    <span>from  <b className='ml-1'>₹{product.price}</b></span>
                    <Button size={"sm"}>Choose</Button>
                </div>
            </CardFooter>
        </Card>

    )
}

export default ProductCard
