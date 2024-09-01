"use client"
import React, { useState } from 'react'
import { ModeToggle } from '../Toggle'
// import { createClient } from '@/utils/supabase/client'
import { logout } from '@/app/actions/auth/actions'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'
import { useRouter } from 'next/navigation'


const Navbar = ({ loggedIn, isNew }: { loggedIn: Boolean, isNew: Boolean }) => {
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        setLoading(false)
    })

    const handlelogout = async () => {
        setLoading(true)
        const response = await logout();
        if (!response.success) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: response.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            setLoading(false)
        } else {
            toast({
                title: "Logout successful",
            })
            setLoading(false)
            router.push("/Login")
        }
    }
    const handlelogin = () => {
        router.push("/Login")
    }
    return (
        <>
                    <>
                        <div className="navbar bg-transparent ">
                            <div className="flex-1 cursor-pointer select-none">
                                <a className="m-2 text-xl font-semibold">Fix Overflow</a>
                            </div>
                            <div className="flex-none gap-2">
                                <div className="form-control">
                                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-transparent" />
                                </div>
                                <ModeToggle />

                                <div className="dropdown dropdown-end">

                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="User Logo"
                                                src="https://ui-avatars.com/api/?name=Bharat+Panigrahi" />
                                        </div>
                                    </div>


                                    <div>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content bg-transparent rounded-box z-[1] mt-3 w-52 p-2 shadow">

                                            <li>
                                                <a className="justify-between text-black dark:text-white">
                                                    Profile
                                                    <span className="bg-transparent text-black dark:text-white">{isNew ? "New" : ""}</span>
                                                </a>
                                            </li>

                                            <li className='text-black dark:text-white'><a>Settings</a></li>

                                            <li className='text-black dark:text-white'>
                                                <a className={`justify-between ${loading ? 'opacity-50 cursor-not-allowed' : ""}`} onClick={loggedIn ? handlelogout : handlelogin}>
                                                    {loggedIn ? (
                                                        <>
                                                            Logout
                                                            {loading && <span className="loading loading-spinner loading-xs"></span>}
                                                        </>
                                                    ) : (
                                                        "SignIn"
                                                    )}
                                                </a>

                                            </li>

                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </>

        </>
    )
}

export default Navbar