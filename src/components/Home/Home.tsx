"use client"
import { useSearchParams } from "next/navigation"
import ErrorPage from "../Error/Error";

const HomePage = ({ email }: { email: string }) => {
    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length > 0) {
        return (
            <>
                <div className="h-screen flex justify-center items-center">
                    <ErrorPage status={params.error_code} errorMessage={"No such page founds"} errorDetails={"Some extra params are there"} />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <h1 className="text-2xl">Welcome {email} </h1>
            </div>
        </>
    )
}

export default HomePage