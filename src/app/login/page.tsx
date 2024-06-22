import getSession from "@/lib/session"
import LoginForm from "./components/LoginForm"
import { redirect } from "next/navigation"

const LoginPage = async ({ searchParams }: { searchParams: { redirectTo: string | undefined | null } }) => {

    const session = await getSession()

    if (session) {

        if (searchParams.redirectTo) {
            redirect(searchParams.redirectTo)
        }

        redirect('/')
    }

    return (
        <LoginForm />
    )
}


export default LoginPage
