"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import loginAction from "@/lib/actions/loginAction"
import { useFormState, useFormStatus } from "react-dom"
import { AlertCircle, Loader } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

const initialState = {
    status: '',
    message: ''
}

const LoginForm = () => {

    const [state, formAction] = useFormState(loginAction, initialState)
    const router = useRouter()

    return (
        <div className="w-full lg:grid lg:grid-cols-2 h-full py-12">
            <div className="flex items-center justify-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold text-primary">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
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
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <SubmitButton title="Login" loadingTitle="Logging in" />
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
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


export default LoginForm


export const SubmitButton = ({ title, loadingTitle }: { title: string, loadingTitle: string }) => {

    const { pending } = useFormStatus()

    return <Button disabled={pending} type="submit" className="w-full">
        {
            pending ? <span className="flex items-center gap-2"><Loader size={20} className="animate-spin" />{loadingTitle}...</span> : title
        }
    </Button>
}