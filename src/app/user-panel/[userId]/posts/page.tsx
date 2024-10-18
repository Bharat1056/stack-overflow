import { Allpost } from "@/components/admin-panel/posts";

const Page = async({ params }: { params: { userId: string} }) => {
    return (
        <>
        <Allpost/>
        </>
    )
}

export default Page;