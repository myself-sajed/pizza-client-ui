/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Tenant } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectTenant } from "@/lib/redux/slices/selectedTenantSlice";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectTenant from "./SelectTenant";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";


export interface NavTenantPropType {
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
    const [open, setOpen] = useState(false)


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
                const localStorageTenant = JSON.parse(localStorage.getItem('selectedTenant') || "{}")
                if (localStorageTenant?.id) {
                    const foundTenant = tenants.data.tenants.find((item) => item.id.toString() === (resto || localStorageTenant?.id.toString()));
                    if (foundTenant) {
                        const params = new URLSearchParams(restoParams.toString());
                        params.set('restaurant', foundTenant.id.toString());
                        router.replace(`${pathname}?${params.toString()}`);
                    }
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
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!localStorage.getItem('selectedTenant')) {
            setOpen(true)
            toast.error("Please select a Restaurant")
            return
        }
        setOpen(isOpen)
    }

    useEffect(() => {
        if (!localStorage.getItem('selectedTenant')) {
            setOpen(true)
        }
    }, [pathname])

    const handleCloseDialog = () => {
        if (!localStorage.getItem('selectedTenant')) {
            toast.error("Please select a Restaurant")
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    return (
        <>
            <SelectTenant handleSelectTenant={handleSelectTenant} tenants={tenants?.data?.tenants} selectedTenant={selectedTenant} />
            <Dialog open={open} onOpenChange={handleOpenChange} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select a restaurant</DialogTitle>
                        <DialogDescription>
                            You need to select a restaurant to order food.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4">
                        <SelectTenant handleSelectTenant={handleSelectTenant} tenants={tenants?.data?.tenants} selectedTenant={selectedTenant} />
                    </div>
                    {
                        selectedTenant?.id && <DialogFooter>
                            <Button onClick={handleCloseDialog} type="submit">{`Let's`} Order</Button>
                        </DialogFooter>
                    }

                </DialogContent>
            </Dialog>
        </>
    );
};

export default NavTenantSelect;
