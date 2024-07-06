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
import { emailSentSchema, emailSentSchemaType } from "@/validation/schemaValidation"
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
import { resetPassword } from "@/app/actions/auth/actions"

const ForgetPwd = () => {
    const router = useRouter()
    const form = useForm<emailSentSchemaType>({
        resolver: zodResolver(emailSentSchema),
        defaultValues: {
            email: ""
        },
    })

    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false)

    const formData = new FormData()
    formData.append("email", form.getValues("email"))
    

    async function onSubmit() {
        setLoading(true)
        
        console.log(form)
        const response = await resetPassword(formData)
        if (!response.success) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: response.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } else {
            toast({
                title: response.message,
            })
            form.reset()
            router.push("/Login")
        }
        
        setLoading(false)
    }

    return (
        <>
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="∙∙∙∙∙∙∙∙" type="text" {...field} onBlur={() => form.trigger("email")} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" >{loading ? (<span className="loading loading-dots loading-sm"></span>) : "Send"}</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default ForgetPwd