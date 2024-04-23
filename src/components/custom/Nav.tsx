import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"
import { Phone, ShoppingBasket } from "lucide-react"
import { Button } from "../ui/button"
import { getTenants } from "@/app/(home)/js"
import { Tenant } from "@/types"
import { Badge } from "../ui/badge"

const Nav = async () => {
    const tenants = await getTenants()

    return (
        <header className="bg-white">
            <nav className="flex items-center justify-between text-sm container py-3">
                <div className="left flex items-center gap-3">
                    <svg width="93" height="23" viewBox="0 0 93 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.322 9.63C40.322 10.434 40.136 11.166 39.764 11.826C39.392 12.474 38.84 12.99 38.108 13.374C37.388 13.758 36.512 13.95 35.48 13.95H33.896V18H29.9V5.256H35.48C37.04 5.256 38.234 5.652 39.062 6.444C39.902 7.236 40.322 8.298 40.322 9.63ZM35.03 10.8C35.858 10.8 36.272 10.41 36.272 9.63C36.272 8.85 35.858 8.46 35.03 8.46H33.896V10.8H35.03ZM45.5855 5.256V18H41.5895V5.256H45.5855ZM51.8182 14.814H56.9302V18H47.3902V14.994L52.4302 8.424H47.3902V5.256H56.9302V8.262L51.8182 14.814ZM63.1561 14.814H68.2681V18H58.7281V14.994L63.7681 8.424H58.7281V5.256H68.2681V8.262L63.1561 14.814ZM78.238 16.074H73.99L73.36 18H69.166L73.828 5.256H78.436L83.08 18H78.868L78.238 16.074ZM77.266 13.068L76.114 9.522L74.962 13.068H77.266Z" fill="#484848" />
                        <circle cx="11" cy="11" r="7.5" stroke="#F65F42" strokeWidth="7" />
                    </svg>
                    {
                        tenants?.status ? <Select>
                            <SelectTrigger className="w-[180px] focus:ring-0 focus:outline-none">
                                <SelectValue placeholder="Select Restaurant" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    tenants?.data.tenants?.map((tenant: Tenant) => {
                                        return <SelectItem key={tenant.id} value={tenant.id}>{tenant.name}</SelectItem>
                                    })
                                }

                            </SelectContent>
                        </Select> : <Badge variant="destructive">Error Occured</Badge>
                    }


                </div>
                <div className="right">
                    <ul className="flex items-center gap-4 font-semibold">
                        <li className="hover:text-primary">
                            <Link href={"/"}>Menu</Link>
                        </li>
                        <li className="hover:text-primary">
                            <Link href={"/"}>Orders</Link>
                        </li>
                        <li>
                            <div className="cursor-pointer relative hover:text-primary">
                                <ShoppingBasket />
                                <span className="sr-only">Notifications</span>
                                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary border-2 border-white rounded-full -top-3 p-2 -end-2 dark:border-gray-900">4</div>
                            </div>
                        </li>
                        <li className="flex gap-2 ml-5">
                            <Phone size={20} /> <span>91-91-91-9191</span>
                        </li>
                        <li>
                            <Button size={"sm"} >Logout</Button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Nav
