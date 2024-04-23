import { Badge } from '@/components/ui/badge'
import { getCategories, getProducts } from '../js'
import ProductCard from './ProductCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Category, Product } from '@/types'


const MainProducts = async () => {


    const [categories, products] = await Promise.all([getCategories(), getProducts()])

    return (
        <div>

            <Tabs defaultValue={categories.data?.[0]._id}>
                <TabsList>
                    {
                        categories.data?.map((category: Category) => {
                            return <TabsTrigger key={category._id} className='text-md' value={category._id}>{category.name}</TabsTrigger>
                        })
                    }

                </TabsList>

                {
                    categories.status
                        ? <>
                            {
                                categories.data?.map((category: Category) => {
                                    return <TabsContent key={category._id} value={category._id}>
                                        <div className='grid grid-cols-5 gap-5 w-full'>
                                            {
                                                products.data?.data.map((product: Product) => {
                                                    return category._id === product.categoryId && <div key={product._id}>
                                                        <ProductCard product={product} />
                                                    </div>
                                                })
                                            }
                                        </div>

                                    </TabsContent>
                                })
                            }
                        </>
                        : <Badge variant="destructive">Error Occured</Badge>
                }

            </Tabs>

        </div>
    )
}

export default MainProducts
