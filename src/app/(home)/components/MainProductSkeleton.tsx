import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const MainProductSkeleton = () => {
    return (
        <div className='my-6 container'>
            <Skeleton className="h-10 my-3 w-full bg-[#e2e2e2]" />

            <div className="grid grid-cols-5 gap-5 w-full">
                {
                    [1, 2, 3, 4, 5].map((item) => {
                        return <div key={item} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl bg-[#e2e2e2]" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px] bg-[#e2e2e2]" />
                                <Skeleton className="h-4 w-[200px] bg-[#e2e2e2]" />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MainProductSkeleton
