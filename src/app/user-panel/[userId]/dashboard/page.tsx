import Dashboard from "@/components/admin-panel/dashboard";

const  Page = async({ params }: { params: { userId: string; } }) => {
    return(
       <Dashboard/>
    )
}

export default Page;