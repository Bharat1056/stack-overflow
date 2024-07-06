import React from 'react'
import { createClient } from "@/utils/supabase/server";
import Navbar from './Navbar';
import ErrorPage from '../Error/Error';

const checkTimeBetween = (databaseTime: string) => {

    const dbDate = new Date(databaseTime);

    const currentTime = Date.now();
    const timeDifference = currentTime - dbDate.getTime();

    const differenceInHours = timeDifference / (1000 * 60 * 60);

    const isWithin24Hours = differenceInHours <= 24;

    return isWithin24Hours

}

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
        return <ErrorPage status="500" errorMessage="Internal Server Error" errorDetails="There was a problem loading the data into the database." />
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