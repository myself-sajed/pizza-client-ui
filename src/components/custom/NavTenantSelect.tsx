/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Tenant } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectTenant } from "@/lib/redux/slices/selectedTenantSlice";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface NavTenantPropType {
    tenants: {
        data: {
            tenants: Tenant[]
        }
    }
}

const NavTenantSelect = ({ tenants }: NavTenantPropType) => {
    const dispatch = useAppDispatch();
    const selectedTenant = useAppSelector((state) => state.tenant.selectedTenant);
    const router = useRouter();

    const restoParams = useSearchParams();
    const resto = restoParams.get('restaurant');
    const pathname = usePathname()

    useEffect(() => {
        const updateTenant = () => {
            const foundTenant = tenants.data.tenants.find((item) => item.id.toString() === (resto || selectedTenant?.id.toString()));
            if (foundTenant) {
                dispatch(selectTenant(foundTenant));
                if (selectedTenant) {
                    const params = new URLSearchParams(restoParams.toString());
                    params.set('restaurant', foundTenant.id.toString());
                    router.replace(`${pathname}?${params.toString()}`);
                }
            } else {
                dispatch(selectTenant({ id: "null", name: "Global (All)" }));
                if (selectedTenant) {
                    const params = new URLSearchParams(restoParams.toString());
                    params.set('restaurant', 'Global');
                    router.replace(`${pathname}?${params.toString()}`);
                }
            }
        };

        updateTenant();
    }, [resto, dispatch, tenants.data.tenants, pathname]);

    const handleSelectTenant = (tenant: string) => {
        const foundTenant = tenants.data.tenants.find((item) => item.id === tenant);
        if (foundTenant) {
            dispatch(selectTenant(foundTenant));
            const params = new URLSearchParams(restoParams.toString());
            params.set('restaurant', tenant);
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            dispatch(selectTenant({ id: "null", name: "Global (All)" }));
            const params = new URLSearchParams(restoParams.toString());
            params.set('restaurant', 'Global');
            router.replace(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <div className="flex items-center justify-start gap-1 animate-once animate-fade-up animate-delay-1000 animate-duration-[2000]">
            <span className="text-sm">&#128994;</span>
            <Select onValueChange={(tenant) => handleSelectTenant(tenant)}>
                <SelectTrigger className="md:w-[180px] w-[120px] focus:ring-0 focus:ring-transparent focus:outline-none border-none bg-transparent focus:border-none">
                    <SelectValue placeholder={selectedTenant ? selectedTenant?.name : "Global (All)"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"null"}>Global (All)</SelectItem>
                    {tenants?.data.tenants?.map((tenant: Tenant) => (
                        <SelectItem defaultChecked={tenant.id === selectedTenant?.id} key={tenant.id} value={tenant.id}>
                            {tenant.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default NavTenantSelect;
