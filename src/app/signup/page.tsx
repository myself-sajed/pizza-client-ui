import getSession from "@/lib/session"
import { redirect } from "next/navigation"
import SignupForm from "./components/SignupForm"

const SignupPage = async ({ searchParams }: { searchParams: { redirectTo: string | undefined | null } }) => {

    const session = await getSession()

    if (session) {

        if (searchParams.redirectTo) {
            redirect(searchParams.redirectTo)
        }

        redirect('/')
    }

    return (
        <SignupForm />
    )
}


export default SignupPage
