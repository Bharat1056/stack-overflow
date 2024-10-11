import React from 'react'
import { createClient } from "@/utils/supabase/server";
import Navbar from './Navbar';
import ErrorPage from '../Error/Error';
import checkTimeBetween from '@/helper/checkTimeGap'


const Nav = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    let isUser = true;
    let isNew = false;
    if (error || !data?.user) {
        isUser = false;
    }

    const { data: userData, error: userError } = await supabase.from("User").select().eq('email', data.user?.email)

    if (userError || !userData) {
        isUser = false;
        return (
            <Navbar loggedIn={isUser} isNew={false} />
        )
    }


    const databaseTime = userData[0]?.created_at
    const newUser = checkTimeBetween(databaseTime)

    if (newUser) {
        isNew = true;
    }

    return (
        <>
            <Navbar loggedIn={isUser} isNew={isNew} />
        </>
    )
}

export default Nav