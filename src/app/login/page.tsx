"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import loginAction from "@/lib/actions/loginAction"
import { useFormState, useFormStatus } from "react-dom"
import { Loader } from "lucide-react"

const initialState = {
    status: '',
    message: ''
}

const LoginPage = () => {

    const [state, formAction] = useFormState(loginAction, initialState)

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
                        <SubmitButton />
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="underline">
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


export default LoginPage


const SubmitButton = () => {

    const { pending } = useFormStatus()

    return <Button disabled={pending} type="submit" className="w-full">
        {
            pending ? <span className="flex items-center gap-2"><Loader size={20} className="animate-spin" />Logging in...</span> : "Login"
        }
    </Button>
}