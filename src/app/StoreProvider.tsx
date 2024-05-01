'use client'
import { updateCart } from '@/lib/redux/slices/cartSlice'
import { selectTenant } from '@/lib/redux/slices/selectedTenantSlice'
import { AppStore, makeStore } from '@/lib/redux/store'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {

    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        // set initial cartItems and selectedTenant on initial render
        if (typeof window !== 'undefined' && window.localStorage && storeRef.current) {
            try {
                const localStorageCartItems = window.localStorage.getItem('cartItems')
                const localStorageSelectedTenant = window.localStorage.getItem('selectedTenant')

                if (localStorageCartItems) {
                    const cartItems = JSON.parse(localStorageCartItems)
                    storeRef.current.dispatch(updateCart(cartItems))
                }

                if (localStorageSelectedTenant) {
                    const selectedTenanant = JSON.parse(localStorageSelectedTenant)
                    storeRef.current.dispatch(selectTenant(selectedTenanant))
                }

            } catch (error) {
                console.log('Local storage has been modified:', error)
            }
        }
    }, [storeRef])

    return <Provider store={storeRef.current}>{children}</Provider>
}