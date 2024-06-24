import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tenant } from '@/types';

type PropType = {
    selectedTenant: any;
    handleSelectTenant: (tenant: string) => void
    tenants: Tenant[]
}

const SelectTenant = ({ selectedTenant, handleSelectTenant, tenants }: PropType) => {
    return (
        <div className="flex items-center justify-start gap-1 animate-once animate-fade-up animate-duration-[2000]">
            <span className="text-sm">&#128994;</span>
            <Select onValueChange={(tenant) => handleSelectTenant(tenant)}>
                <SelectTrigger className="md:w-[180px] w-[120px] focus:ring-0 focus:ring-transparent focus:outline-none border-none bg-transparent focus:border-none">
                    <SelectValue placeholder={selectedTenant ? selectedTenant?.name : "Select Restaurant"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"null"}>Select Restaurant</SelectItem>
                    {tenants?.map((tenant: Tenant) => (
                        <SelectItem defaultChecked={tenant.id === selectedTenant?.id} key={tenant.id} value={tenant.id}>
                            {tenant.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectTenant
