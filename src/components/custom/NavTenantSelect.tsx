"use client"

import { Tenant } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useAppDispatch } from "@/lib/redux/hooks"
import { selectTenant } from "@/lib/redux/slices/selectedTenantSlice"

interface NavTenantPropType {
    tenants: {
        data: {
            tenants: Tenant[]
        }
    }
}



const NavTenantSelect = ({ tenants }: NavTenantPropType) => {

    const dispatch = useAppDispatch()

    const handleSelectTenant = (tenant: string) => {
        dispatch(selectTenant(tenant))
    }

    return (
        <Select onValueChange={(tenant) => handleSelectTenant(tenant)} >
            <SelectTrigger className="w-[180px] focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Global (All)" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"null"}>Global (All)</SelectItem>
                {
                    tenants?.data.tenants?.map((tenant: Tenant) => {
                        return <SelectItem key={tenant.id} value={tenant.id}>{tenant.name}</SelectItem>
                    })
                }

            </SelectContent>
        </Select>
    )
}

export default NavTenantSelect
