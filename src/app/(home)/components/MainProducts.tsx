import { Badge } from '@/components/ui/badge'
import { getCategories } from '../js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Category } from '@/types'
import ShowProducts from './ShowProducts'


const MainProducts = async () => {

    const categories = await Promise.resolve(getCategories())

    return (
        <div id="menu">

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
                                        <ShowProducts category={category} />
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
