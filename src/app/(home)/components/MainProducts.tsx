import ProductCard from './ProductCard'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


const MainProducts = () => {

    return (
        <div className="container mt-5">

            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger className='text-md' value="Pizza">Pizza</TabsTrigger>
                    <TabsTrigger className='text-md' value="Beverages">Beverages</TabsTrigger>
                </TabsList>
            </Tabs>


            <div className="my-5 w-full grid grid-cols-4 gap-5">
                {
                    products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })
                }
            </div>

        </div>
    )
}

export default MainProducts


const products: Product[] = [
    {
        _id: '1',
        name: 'Paneer Pizza',
        description: 'This is the best pizza out there for your daily fukcing needs',
        price: 100,
        image: '/assets/pizza-main.png'
    },
    {
        _id: '2',
        name: 'Margherita Pizza',
        description: 'This is the best pizza out there for your daily fukcing needs',
        price: 150,
        image: '/assets/pizza-main.png'
    },
    {
        _id: '3',
        name: 'Margherita Pizza',
        description: 'This is the best pizza out there for your daily fukcing needs',
        price: 110,
        image: '/assets/pizza-main.png'
    },
    {
        _id: '4',
        name: 'Margherita Pizza',
        description: 'This is the best pizza out there for your daily fukcing needs',
        price: 190,
        image: '/assets/pizza-main.png'
    },
    {
        _id: '5',
        name: 'Margherita Pizza',
        description: 'This is the best pizza out there for your daily fukcing needs',
        price: 210,
        image: '/assets/pizza-main.png'
    },
    {
        _id: '6',
        name: 'Margherita Pizza',
        description: 'This is the best pizza out there for your daily fukcing needs',
        price: 130,
        image: '/assets/pizza-main.png'
    },
]


export interface Product {
    _id: string
    name: string,
    price: number,
    description: string,
    image: string
}
