"use client"

import { Tenant } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
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
    const selectedTenant = useAppSelector((state) => state.tenant.selectedTenant)

    const handleSelectTenant = (tenant: string) => {
        const foundTenant = tenants.data.tenants.find((item) => item.id === tenant)
        if (foundTenant) {
            dispatch(selectTenant(foundTenant))
        } else {
            dispatch(selectTenant({ id: "null", name: "Global (All)" }))
        }
    }
    return (
        <div className="flex items-center justify-start gap-1">
            <span className="text-sm">&#128994;</span>
            <Select defaultValue={selectedTenant?.id || "null"} onValueChange={(tenant) => handleSelectTenant(tenant)} >
                <SelectTrigger className="md:w-[180px] w-[120px] focus:ring-0 focus:ring-transparent focus:outline-none border-none bg-transparent focus:border-none">
                    <SelectValue placeholder={selectedTenant ? selectedTenant?.name : "Global (All)"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"null"}>Global (All)</SelectItem>
                    {
                        tenants?.data.tenants?.map((tenant: Tenant) => {
                            return <SelectItem defaultChecked={tenant.id === selectedTenant?.id} key={tenant.id} value={tenant.id}>{tenant.name}</SelectItem>
                        })
                    }

                </SelectContent>
            </Select>
        </div>
    )
}

export default NavTenantSelect
