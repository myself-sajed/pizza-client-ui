import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className="bg-white">
            <div className="py-10 container">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="block text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-7xl lg:leading-tight tracking-tighter	">Heavenly delicous pizza in <br /> <span className="text-primary">Just 40 minutes!</span></p>
                        <p className="text-lg text-gray-800 ">Enjoy a free meal if order takes more than 45 minutes.</p>

                        <div className="mt-10 grid gap-3 w-full sm:inline-flex">
                            <Button className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white  " >
                                Order Now
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </Button>
                        </div>


                    </div>

                    <Image src="/assets/pizza-main.png" alt="Image Description" priority={false} height={380} width={380} />
                </div>
            </div>
        </div>
    )
}

export default Hero
