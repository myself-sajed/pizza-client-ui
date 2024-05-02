import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import OrderNowButton from './OrderNowButton'

const Hero = () => {
    return (
        <div className="bg-white">
            <div className="py-10 container">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="block text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-7xl lg:leading-tight tracking-tighter	"><span className='underline underline-offset-8 decoration-8 decoration-primary'>Heavenly</span> delicous pizza in <br /> <span className="text-primary">Just 40 minutes!</span></p>
                        <p className="text-lg text-gray-800 ">Enjoy a free meal if order takes more than 45 minutes.</p>

                        <OrderNowButton />
                    </div>

                    <Image src="/assets/pizza-main.png" alt="Image Description" priority={false} height={380} width={380} />
                </div>
            </div>
        </div>
    )
}

export default Hero
