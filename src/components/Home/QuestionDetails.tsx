"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import { Copy } from "lucide-react"
import ShareBtn from "../Utils/ShareBtn"
import { Toast } from "primereact/toast"
import CommentComponent from "./Comment"

export default function QuestionDetails() {
    const [liked, setLiked] = useState(false)
    const [bookmark, setBookmark] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useRef<Toast>(null);

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
            <>
                <div className="w-full max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">
                    <div className="grid gap-6 md:gap-8">
                        <div className="grid gap-4">
                            <h1 className="text-3xl font-bold md:text-4xl">
                                Introducing the WhimsiMug: A Delightful Companion for Your Daily Sips of Joy
                            </h1>
                            <div className="h-px bg-muted" />
                            <div className="grid gap-4 text-sm leading-relaxed md:text-base">
                                <p>
                                    The WhimsiMug is a truly unique and captivating creation that will transform your daily coffee or tea
                                    routine into a whimsical and enchanting experience. Crafted with the utmost care and attention to detail,
                                    this mug is a true work of art, featuring a burst of vibrant colors and playful patterns that dance across
                                    its surface, telling a story of wonder and creativity.
                                </p>
                                <p>
                                    Imagine sipping your morning brew from a mug that transports you to a world of imagination and delight.
                                    The WhimsiMug is more than just a vessel for your favorite hot beverage; it's a canvas for your senses,
                                    inviting you to indulge in the simple pleasures of life and embrace the magic that can be found in the
                                    everyday.
                                </p>
                                <p>
                                    Whether you're enjoying a cozy moment at home, sharing a conversation with friends, or seeking a moment of
                                    respite during a hectic day, the WhimsiMug will be your constant companion, infusing each sip with a touch
                                    of whimsy and wonder. Its unique design and captivating aesthetic make it a true conversation piece, sure
                                    to delight and inspire all who experience it.
                                </p>
                                {/* <img src="/placeholder.svg" alt="WhimsiMug" width={600} height={400} className="rounded-lg border" /> */}
                                <div className="grid gap-4 text-sm leading-relaxed md:text-base">
                                    <p>
                                        Crafted with the utmost care and attention to detail, the WhimsiMug is a true work of art, designed to
                                        elevate your daily routine and bring a touch of magic to your life. Its vibrant colors and whimsical
                                        patterns are sure to captivate and inspire, making it a must-have for anyone who appreciates the beauty
                                        of the extraordinary in the ordinary.
                                    </p>
                                    <p>
                                        So why settle for a plain, boring mug when you can indulge in the enchanting world of the WhimsiMug?
                                        Treat yourself or a loved one to this delightful companion and experience the joy of sipping in style
                                        and magic.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src="/placeholder-user.jpg" />
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-0.5">
                                        <p className="text-sm font-medium">Acme Inc</p>
                                        <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>1.2K views</span>
                                    </div>
                                    <div className="flex items-center gap-1 justify-center">
                                        <ThumbsUpIcon className="w-4 h-4" />
                                        <span className="pt-1">120 votes</span>
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
                                {/* <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-0.5">
                                            <p className="text-sm font-medium">John Doe</p>
                                            <p className="text-sm text-muted-foreground">2 days ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm leading-relaxed">
                                            This mug is absolutely stunning! I can't wait to get one for myself and my friends. The vibrant colors
                                            and whimsical patterns are so captivating.
                                        </p>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50">
                                            <ThumbsUpIcon className="w-4 h-4" />
                                            <span className="sr-only">Like</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback>JS</AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-0.5">
                                            <p className="text-sm font-medium">Jane Smith</p>
                                            <p className="text-sm text-muted-foreground">1 day ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm leading-relaxed">
                                            I just ordered the WhimsiMug and I can't wait for it to arrive! The design is so unique and fun, it's
                                            going to be the perfect addition to my morning routine.
                                        </p>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50">
                                            <ThumbsUpIcon className="w-4 h-4" />
                                            <span className="sr-only">Like</span>
                                        </Button>
                                    </div>
                                </div> */}
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
        </>
    )
}

function BookmarkIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={!props.bookmark ? "none" : "currentColor"}
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


function ThumbsUpIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={!props.like ? "none" : "currentColor"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
    )
}