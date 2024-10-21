import { Newpost } from "@/components/admin-panel/posts";

const Page = async({ params }: { params: { userId: string; } }) => {
    return (
        <>
       <Newpost/>
        </>
    )
}

export default Page;