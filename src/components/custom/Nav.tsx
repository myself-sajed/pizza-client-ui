import Link from "next/link"
import { Menu, Phone } from "lucide-react"
import { Button } from "../ui/button"
import { getTenants } from "@/app/(home)/js"
import { Badge } from "../ui/badge"
import NavCart from "./NavCart"
import NavTenantSelect from "./NavTenantSelect"
import LogoutAndLogin from "./LogoutAndLogin"

const Nav = async () => {
    const tenants = await getTenants()

    return (
        <header className="hero_section">
            <nav className="flex items-center justify-between text-sm container py-3">
                <div className="left flex items-center gap-3 animate-once animate-fade-down animate-duration-[2000]">
                    <Link href="/">
                        <svg width="93" height="23" viewBox="0 0 93 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.322 9.63C40.322 10.434 40.136 11.166 39.764 11.826C39.392 12.474 38.84 12.99 38.108 13.374C37.388 13.758 36.512 13.95 35.48 13.95H33.896V18H29.9V5.256H35.48C37.04 5.256 38.234 5.652 39.062 6.444C39.902 7.236 40.322 8.298 40.322 9.63ZM35.03 10.8C35.858 10.8 36.272 10.41 36.272 9.63C36.272 8.85 35.858 8.46 35.03 8.46H33.896V10.8H35.03ZM45.5855 5.256V18H41.5895V5.256H45.5855ZM51.8182 14.814H56.9302V18H47.3902V14.994L52.4302 8.424H47.3902V5.256H56.9302V8.262L51.8182 14.814ZM63.1561 14.814H68.2681V18H58.7281V14.994L63.7681 8.424H58.7281V5.256H68.2681V8.262L63.1561 14.814ZM78.238 16.074H73.99L73.36 18H69.166L73.828 5.256H78.436L83.08 18H78.868L78.238 16.074ZM77.266 13.068L76.114 9.522L74.962 13.068H77.266Z" fill="#484848" />
                            <circle cx="11" cy="11" r="7.5" stroke="#F65F42" strokeWidth="7" />
                        </svg>
                    </Link>
                    {
                        tenants?.status ? <NavTenantSelect tenants={tenants} /> : <Badge variant="destructive">Error Occured</Badge>
                    }


                </div>
                <div className="right md:block hidden animate-once animate-fade-left animate-duration-[2000ms]">
                    <ul className="flex items-center gap-4 font-semibold">
                        <li className="hover:text-primary">
                            <Link href={"/#menu"}>Menu</Link>
                        </li>
                        <li className="hover:text-primary">
                            <Link href={"/my-orders"}>Orders</Link>
                        </li>
                        <li>
                            <NavCart />
                        </li>
                        <li className="flex gap-2 ml-5">
                            <Phone size={20} /> <span>91-91-91-9191</span>
                        </li>
                        <li>
                            <LogoutAndLogin />
                        </li>
                    </ul>
                </div>
                <div className="block md:hidden cursor-pointer animate-once animate-fade-left animate-duration-[2000ms]">
                    <Menu className="text-primary" />
                </div>
            </nav>
        </header>
    )
}

export default Nav


