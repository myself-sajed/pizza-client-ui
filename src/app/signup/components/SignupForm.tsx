"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom"
import { AlertCircle, Loader } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import signupAction from "@/lib/actions/signupAction"
import { SubmitButton } from "@/app/login/components/LoginForm"

const initialState = {
    status: '',
    message: ''
}

const SignupForm = () => {

    const [state, formAction] = useFormState(signupAction, initialState)
    const router = useRouter()

    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-full py-12">
            <div className="flex items-center justify-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold text-primary">Signup</h1>
                        <p className="text-balance text-muted-foreground">
                            {`You're`} just one signup away to get the best pizza...
                        </p>
                    </div>
                    {
                        state.status === "error" && <Alert variant="destructive" className="p-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle className="text-sm font-semibold ml-2">Error Occured</AlertTitle>
                            <AlertDescription className="ml-2">
                                {state.message}
                            </AlertDescription>
                        </Alert>
                    }
                    <form action={formAction} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Shaikh Sajed"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="cpassword">Password, again</Label>
                            </div>
                            <Input id="cpassword" name="cpassword" type="password" required />
                        </div>
                        <SubmitButton title="Register Now" loadingTitle="Registering" />
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex w-full h-full items-center justify-center">
                <Image
                    src="/assets/pizza-main.png"
                    alt="Image"
                    width="500"
                    height="800"
                    className="object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}


export default SignupForm


