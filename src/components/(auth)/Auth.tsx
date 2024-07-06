"use client"

import * as React from "react"
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchemaType, signInSchemaType, signInSchema, signUpSchema } from "@/validation/schemaValidation"
import { login, signup } from "@/app/actions/auth/actions"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "../ui/toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
  authType: 'sign-up' | 'sign-in';
}

const getSchema = (authType: Props['authType']): typeof signUpSchema | typeof signInSchema => {
  return authType === 'sign-up' ? signUpSchema : signInSchema;
};

const getDefaultValues = (authType: Props['authType']): signUpSchemaType | signInSchemaType => {
  return authType === 'sign-up'
    ? {
      username: "",
      email: "",
      password: "",
    }
    : {
      email: "",
      password: "",
    };
};

const Auth = ({ authType }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const { theme } = useTheme()
  const schema = getSchema(authType);
  const defaultValues = getDefaultValues(authType);

  const [honeyValue, setHoneyValue] = React.useState("")
  const [loading, setLoading] = React.useState(false);



  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  })


  async function onSubmit() {
    setLoading(true)
    if (honeyValue != "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Seems like a bot is trying to fill this form!!",
      })
      setLoading(false)
      return
    }



    const formData = new FormData()
    formData.append("email", form.getValues("email"))
    formData.append("password", form.getValues("password"))
    formData.append("username", form.getValues("username"))

    let response;

    if (authType === "sign-in") {
      response = await login(formData)

    } else {
      response = await signup(formData)
    }

    if (!response.success) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setLoading(false)
      router.push(`${authType === "sign-in" ? "/Login" : "/Signup"}`)
    } else {
      onReset()
      toast({
        title: `${authType === "sign-in" ? "Welcome💝" : "Registered✨"}`,
        description: `${authType === "sign-in" ? "Sign in successful" : "Sign up successful"}`,
      })
      setLoading(false)
      router.push(`${authType === "sign-in" ? "/" : "/Login"}`)
    }
  }


  function onReset() {
    form.reset()
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{authType === "sign-up" ? "Sign up" : "Sign in"}</CardTitle>
          <CardDescription>Welcome to our app</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* username */}

              {
                authType === "sign-up" && (
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="alias1056" {...field} onBlur={() => form.trigger("username")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }

              {/* email */}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="alias@gmail.com" {...field} onBlur={() => form.trigger("email")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="∙∙∙∙∙∙∙∙" {...field} type="password" onBlur={() => form.trigger("password")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {
                authType === "sign-in" && (
                  <div>
                    <Link className="text-blue-700 italic dark:text-white hover:underline" href={'/forget-pwd'}>Forget Password?</Link>
                  </div>
                )
              }

              {/* honey-pot */}
              <input className="hidden" type="text" value={honeyValue} onChange={(e) => setHoneyValue(e.target.value)} />

              <div className="flex justify-between">
                <Button type="reset" variant="outline" onClick={onReset}>Reset</Button>
                <Button type="submit">{loading ? (<span className="loading loading-dots loading-sm"></span>) : "Submit"}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex-col">
            <Button className="w-full mb-2 flex gap-2 items-center">
              <Image src={"/google.png"} alt="google-logo" width={20} height={20} loading="eager" />
              Continue with Google
            </Button>
            <Button className="w-full mb-2 flex gap-2 items-center">
              <Image src={theme === "light" ? "/github.png" : "/github-logo.png"} className="bg-transparent" alt="github-logo" width={22} height={22} loading="eager" />
              Continue with Github
            </Button>
            <p className="w-full text-center mt-2">{authType === "sign-up" ? "Already" : "Don't"} have an account <Link href={authType === "sign-in" ? "/SignUp" : "/Login"} className="text-blue-700 dark:text-green-500 hover:underline"  >{authType === "sign-in" ? "SignUp" : "SignIn"}</Link> </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Auth