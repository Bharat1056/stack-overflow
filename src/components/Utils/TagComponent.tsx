import { Button } from "@/components/ui/button"

export default function TagComponent({ tags }: { tags: string[] }) {
    return (
        <div className="w-fit max-w-full">
            <div className="flex gap-2 overflow-x-auto pb-4">
                {
                    tags.map((tag, index) => (
                        <>
                            <Button
                                key={index}
                                variant="outline"
                                className="whitespace-nowrap rounded-full bg-muted/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted select-none"
                            >
                                {tag}
                            </Button>
                        </>
                    ))
                }
            </div>
        </div>
    )
}