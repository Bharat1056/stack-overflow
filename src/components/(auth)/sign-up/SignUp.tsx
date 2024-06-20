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

const SignUp = ({ authType }: Props) => {
  const schema = getSchema(authType);
  const defaultValues = getDefaultValues(authType);



  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  })


  function onSubmit(values: z.infer<typeof schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  function onReset() {
    form.reset()
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{authType === "sign-up" ? "Sign up" : "Sign in"}</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
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
                          <Input placeholder="alias1056" {...field} />
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
                      <Input placeholder="alias@gmail.com" {...field} />
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
                      <Input placeholder="∙∙∙∙∙∙∙∙" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button type="reset" variant="outline" onClick={onReset}>Reset</Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex-col">
            <Button className="w-full mb-2">Continue with Google</Button>
            <Button className="w-full">Continue with Github</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp