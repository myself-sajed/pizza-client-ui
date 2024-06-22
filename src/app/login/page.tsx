import getSession from "@/lib/session"
import LoginForm from "../checkout/components/LoginForm"
import { redirect } from "next/navigation"

const LoginPage = async () => {

    const session = await getSession()

    if (session) {
        redirect('/')
    }

    return (
        <LoginForm />
    )
}


export default LoginPage
