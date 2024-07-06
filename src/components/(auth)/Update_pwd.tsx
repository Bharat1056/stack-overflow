"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { passwordUpdateScema, passwordUpdateScemaType } from "@/validation/schemaValidation"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/app/actions/auth/actions"
import { useSearchParams } from "next/navigation"

function UpdatePwd() {
    const params = useSearchParams()
    const code = params.get("code") as string
    const router = useRouter()
    const form = useForm<passwordUpdateScemaType>({
        resolver: zodResolver(passwordUpdateScema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false)

    const formData = new FormData()
    formData.append("password", form.getValues("password"))
    formData.append("code", code)

    async function onSubmit() {
        setLoading(true)
        const response = await updatePassword(formData)
        if (response.success) {
            toast({
                title: response.message,
            })
            form.reset()
            router.push("/Login")
        } else {
             toast({
                title: "Uh oh! Something went wrong.",
                description: response.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
        setLoading(false)
    }



    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Password Update</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="∙∙∙∙∙∙∙∙" type="password" {...field} onBlur={() => form.trigger("password")} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="∙∙∙∙∙∙∙∙" {...field} onBlur={() => form.trigger("confirmPassword")} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" >{loading ? (<span className="loading loading-dots loading-sm"></span>) : "Update"}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )

}

export default UpdatePwd