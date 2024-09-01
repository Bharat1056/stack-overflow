"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"
import { Copy } from "lucide-react"
import ShareBtn from "../Utils/ShareBtn"
import { Toast } from "primereact/toast"
import CommentComponent from "./Comment"
import { QuestionDetailsType } from '@/types/types'
import formatNumber from "@/helper/fomatNumber"

export default function QuestionDetails({ questionTitle, questionDescription, totalVotes, totalViews, authorName }: QuestionDetailsType) {

    const [liked, setLiked] = useState(false)
    const [bookmark, setBookmark] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const toast = useRef<Toast>(null)

    const showSuccess = () => {
        toast.current?.show({ summary: '', detail: 'Copied to clipboard', life: 500, className: "bg-transparent text-white p-4 rounded" });
    };

    const showError = () => {
        toast.current?.show({ summary: '', detail: 'Error in Copy', life: 500, className: "bg-transparent text-white p-4 rounded" });
    };

    const handleCopy = () => {
        if (inputRef.current) {
            const inputValue = inputRef.current.value;
            navigator.clipboard.writeText(inputValue).then(() => {
                showSuccess()
            }).catch((err) => {
                showError()
            });
        }
    };

    return (
        <>
            <div className="w-full max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">
                <div className="grid gap-6 md:gap-8">
                    <div className="grid gap-4">
                        <h1 className="text-3xl font-bold md:text-4xl">
                            {questionTitle}
                        </h1>
                        <div className="h-px bg-muted" />
                        <div className="grid gap-4 text-sm leading-relaxed md:text-base">
                            <p>
                                {questionDescription}
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>{(authorName.slice(0, 1)).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <p className="text-sm font-medium">@{authorName}</p>
                                    <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <EyeIcon className="w-4 h-4" />
                                    <span>{formatNumber(totalViews)} views</span>
                                </div>
                                <div className="flex items-center gap-1 justify-center">
                                    <ThumbsUpIcon className="w-4 h-4" />
                                    <span className="pt-1">{formatNumber(totalVotes)} votes</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setBookmark((prev) => !prev)} variant="outline" size="sm">
                                <BookmarkIcon className="w-4 h-4 mr-2" bookmark={bookmark} />
                                Bookmark
                            </Button>
                            <Button onClick={() => setLiked((prev) => !prev)} variant="outline" size="sm">
                                <ThumbsUpIcon className="w-4 h-4 mr-2" like={liked} />
                                Vote
                            </Button>
                            <Dialog>
                                <Toast ref={toast} position="top-center" />
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <ShareIcon className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Share link</DialogTitle>
                                        <DialogDescription>
                                            Anyone who has this link will be able to view this.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex items-center space-x-2">
                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="link" className="sr-only">
                                                Link
                                            </Label>
                                            <Input
                                                id="link"
                                                defaultValue="https://ui.shadcn.com/docs/installation"
                                                readOnly
                                                ref={inputRef}
                                            />
                                        </div>
                                        <Button type="submit" size="sm" className="px-3" onClick={handleCopy} >
                                            <span className="sr-only">Copy</span>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary" className="mt-2 md:mt-0">
                                                Close
                                            </Button>
                                        </DialogClose>

                                        <ShareBtn url="https://bharatpanigrahi.cloud" description="description" title="title" />

                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <h2 className="text-2xl font-bold">Comments</h2>
                        <div className="grid gap-4">
                            <CommentComponent />
                            <CommentComponent />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Add Comment</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add a Comment</DialogTitle>
                                    <DialogDescription>Share your thoughts on the WhimsiMug.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Title
                                        </Label>
                                        <Input id="title" placeholder="Enter a title" className="col-span-3" />
                                    </div>
                                    <div className="grid items-start grid-cols-4 gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Description
                                        </Label>
                                        <Textarea id="description" placeholder="Write your comment" className="col-span-3 min-h-[100px]" />
                                    </div>
                                    <div className="grid items-center grid-cols-4 gap-4">
                                        <Label htmlFor="file" className="text-right">
                                            File
                                        </Label>
                                        <Input id="file" type="file" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    )
}

interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
    bookmark?: boolean;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ bookmark = false, ...props }) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={!bookmark ? "none" : "currentColor"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
    )
}


function EyeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function ShareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}


interface ThumbsUpIconProps extends React.SVGProps<SVGSVGElement> {
    like?: boolean;
}

const ThumbsUpIcon: React.FC<ThumbsUpIconProps> = ({ like = false, ...props }) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={like ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
    );
};
