import Image from 'next/image'
import React from 'react'
import OrderNowButton from './OrderNowButton'

const Hero = () => {
    return (
        <div className="hero_section">
            <div className="py-10 container">
                <div className="flex items-center justify-between">

                    <div className='animate-once animate-fade-right animate-duration-[2000ms] md:text-left text-center w-full md:block flex flex-col items-center justify-center'>
                        <Image src="/assets/pizza-main.png" className='block md:hidden mb-4' alt="Image Description" priority={false} height={120} width={120} />
                        <p className="block text-2xl sm:text-3xl font-extrabold text-gray-800 md:text-4xl xl:text-7xl lg:leading-tight tracking-tighter	"><span>Heavenly</span> delicious pizza in <br className='md:block hidden' /> <span className="text-primary">Just 40 minutes!</span></p>
                        <p className="md:text-lg mt-2 sm:text-base text-sm text-gray-800 md:mb-10">Enjoy a free meal if order takes more than 40 minutes.</p>

                        <OrderNowButton />
                    </div>

                    <Image src="/assets/pizza-main.png" className='animate-once animate-fade-left animate-animate-duration-[2000ms] lg:block hidden' alt="Image Description" priority={false} height={380} width={380} />
                    <Image src="/assets/pizza-main.png" className='animate-once animate-fade-left animate-animate-duration-[2000ms] hidden md:block lg:hidden' alt="Image Description" priority={false} height={200} width={200} />
                </div>
            </div>
        </div>
    )
}

export default Hero
