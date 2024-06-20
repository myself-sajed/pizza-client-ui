"use client"

import logoutAction from "@/lib/actions/logoutAction"
import { Button } from "../ui/button"

const Logout = () => {
    const handleLogout = async () => {
        await logoutAction()
    }

    return (
        <Button onClick={handleLogout} size="sm">Logout</Button>
    )
}


export default Logout