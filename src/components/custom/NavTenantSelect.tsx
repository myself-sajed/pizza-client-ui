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
        if (resto || selectedTenant) {
            const foundTenant = tenants.data.tenants.find((item) => {
                return (item.id).toString() === (resto || (selectedTenant.id).toString())
            });
            if (foundTenant) {
                dispatch(selectTenant(foundTenant));
                selectedTenant && router.replace(`?restaurant=${foundTenant.id}`);
            } else {
                dispatch(selectTenant({ id: "null", name: "Global (All)" }));
                selectedTenant && router.replace(`?restaurant=Global`);
            }
        } else {
            dispatch(selectTenant({ id: "null", name: "Global (All)" }));
            selectedTenant && router.replace(`?restaurant=Global`);
        }
    }, [resto, dispatch, tenants.data.tenants, pathname]);

    const handleSelectTenant = (tenant: string) => {
        const foundTenant = tenants.data.tenants.find((item) => item.id === tenant);
        if (foundTenant) {
            dispatch(selectTenant(foundTenant));
            router.replace(`?restaurant=${tenant}`);
        } else {
            dispatch(selectTenant({ id: "null", name: "Global (All)" }));
            router.replace(`?restaurant=Global`);
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
