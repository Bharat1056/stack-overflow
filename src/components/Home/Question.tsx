
"use client"

import { useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Copy } from "lucide-react"
import ShareBtn from "../Utils/ShareBtn"
import { Toast } from 'primereact/toast';


export default function QuestionBox() {
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
      }).catch(err => {
        showError()
      });
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="flex flex-col gap-1">
            <Link
              href="#"
              className="group inline-flex items-center justify-start gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:underline focus:outline-none"
              prefetch={false}
            >
              <CardTitle>How do I create a responsive layout with Tailwind CSS?</CardTitle>
            </Link>
            <Separator className="my-2" />
            <CardDescription>
              Tailwind CSS is a utility-first CSS framework that makes it easy to create responsive layouts for your
              website. By using a combination of responsive breakpoints and utility classes, you can quickly build layouts
              that adapt to different screen sizes. Some key tips include using the responsive variants of Tailwind's
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <EyeIcon className="w-4 h-4" />
              <span>1.2K views</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <AnswerIcon className="w-4 h-4" />
              <span>1.2K answered</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Button
                variant="ghost"
                size="icon"
                className={`w-4 h-4 ${liked ? "text-primary" : "text-muted-foreground"}`}
                onClick={() => setLiked((prev) => !prev)}
              >
                <ThumbsUpIcon className="w-4 h-4" />
                <span className="sr-only">Upvote</span>
              </Button>
              <span className={` ${liked ? "text-primary" : "text-muted-foreground"}`}>342 votes</span>
            </div>
          </div>
          <div className="flex justify-end text-muted-foreground text-sm">Asked 2 days ago</div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row items-center md:justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">@acme</div>
              <div className="text-xs text-muted-foreground">acme@example.com</div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setLiked((prev) => !prev)}>
              <ThumbsUpIcon className="w-4 h-4" liked={liked} />
              <span className="sr-only">Upvote</span>
            </Button>
            <Dialog>
              <Toast ref={toast} position="top-center" />
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ShareIcon className="w-4 h-4" />
                  <span className="sr-only">Share</span>
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
            <Button variant="ghost" size="icon" onClick={() => setBookmark((prev) => !prev)}>
              <BookmarkIcon className="w-4 h-4" bookmark={bookmark} />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
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
      fill={!props.liked ? "none" : "currentColor"}
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

function AnswerIcon(props: any) {
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

      <path d="M14.8686 4.13134L14.1615 3.42423L14.1615 3.42423L14.8686 4.13134ZM7.81459 7.48152L8.08931 8.44304L7.81459 7.48152ZM5.57564 9.83884L6.55004 10.0637V10.0637L5.57564 9.83884ZM3 21L2.02561 20.7751C1.94808 21.1111 2.04909 21.4633 2.29289 21.7071C2.5367 21.9509 2.8889 22.0519 3.22486 21.9744L3 21ZM14.1611 18.4243L13.9363 17.4499L13.9363 17.4499L14.1611 18.4243ZM16.5185 16.1854L15.5569 15.9107L16.5185 16.1854ZM19.8686 9.13134L20.5757 9.83845V9.83845L19.8686 9.13134ZM19.8686 6.8686L19.1615 7.57571H19.1615L19.8686 6.8686ZM17.1314 4.13134L17.8385 3.42423V3.42423L17.1314 4.13134ZM20.5368 8.30899L19.5858 7.99997L20.5368 8.30899ZM20.5368 7.69095L19.5858 7.99997L20.5368 7.69095ZM15.4404 18.0251L15.9601 18.8794H15.9601L15.4404 18.0251ZM16.0539 17.4424L16.8804 18.0054L16.8804 18.0054L16.0539 17.4424ZM6.55756 7.94607L7.12056 8.77253L7.12056 8.77253L6.55756 7.94607ZM5.97487 8.55957L6.82922 9.07928L6.82922 9.07928L5.97487 8.55957ZM15.691 3.46313L15.382 2.51207L15.691 3.46313ZM16.309 3.46313L16.618 2.51207L16.618 2.51207L16.309 3.46313ZM9.14645 16.2676C9.53697 15.8771 9.53697 15.2439 9.14644 14.8534C8.75591 14.4629 8.12275 14.4629 7.73223 14.8534L9.14645 16.2676ZM10 14.5C10 14.7761 9.77614 15 9.5 15V17C10.8807 17 12 15.8807 12 14.5H10ZM9.5 15C9.22386 15 9 14.7761 9 14.5H7C7 15.8807 8.11929 17 9.5 17V15ZM9 14.5C9 14.2238 9.22386 14 9.5 14V12C8.11929 12 7 13.1193 7 14.5H9ZM9.5 14C9.77614 14 10 14.2238 10 14.5H12C12 13.1193 10.8807 12 9.5 12V14ZM14.1615 3.42423L12.2929 5.29286L13.7071 6.70708L15.5757 4.83845L14.1615 3.42423ZM12.7253 5.03845L7.53987 6.51999L8.08931 8.44304L13.2747 6.96149L12.7253 5.03845ZM4.60125 9.61398L2.02561 20.7751L3.97439 21.2248L6.55004 10.0637L4.60125 9.61398ZM3.22486 21.9744L14.386 19.3987L13.9363 17.4499L2.77514 20.0256L3.22486 21.9744ZM17.48 16.4601L18.9615 11.2747L17.0385 10.7252L15.5569 15.9107L17.48 16.4601ZM18.7071 11.7071L20.5757 9.83845L19.1615 8.42424L17.2929 10.2929L18.7071 11.7071ZM20.5757 6.16149L17.8385 3.42423L16.4243 4.83845L19.1615 7.57571L20.5757 6.16149ZM20.5757 9.83845C20.7621 9.65211 20.9449 9.47038 21.0858 9.30446C21.2342 9.12961 21.3938 8.90772 21.4879 8.618L19.5858 7.99997C19.6057 7.93858 19.6292 7.92986 19.5611 8.01011C19.4854 8.09928 19.3712 8.21456 19.1615 8.42424L20.5757 9.83845ZM19.1615 7.57571C19.3712 7.78538 19.4854 7.90066 19.5611 7.98984C19.6292 8.07008 19.6057 8.06136 19.5858 7.99997L21.4879 7.38194C21.3938 7.09222 21.2342 6.87033 21.0858 6.69548C20.9449 6.52957 20.7621 6.34783 20.5757 6.16149L19.1615 7.57571ZM21.4879 8.618C21.6184 8.21632 21.6184 7.78362 21.4879 7.38194L19.5858 7.99997V7.99997L21.4879 8.618ZM14.386 19.3987C14.988 19.2598 15.5141 19.1507 15.9601 18.8794L14.9207 17.1708C14.8157 17.2346 14.6727 17.28 13.9363 17.4499L14.386 19.3987ZM15.5569 15.9107C15.3493 16.6373 15.2966 16.7778 15.2274 16.8794L16.8804 18.0054C17.1743 17.574 17.3103 17.0541 17.48 16.4601L15.5569 15.9107ZM15.9601 18.8794C16.3257 18.6571 16.6395 18.359 16.8804 18.0054L15.2274 16.8794C15.1471 16.9973 15.0426 17.0966 14.9207 17.1708L15.9601 18.8794ZM7.53987 6.51999C6.94585 6.68971 6.426 6.82571 5.99457 7.11961L7.12056 8.77253C7.22213 8.70334 7.36263 8.65066 8.08931 8.44304L7.53987 6.51999ZM6.55004 10.0637C6.71998 9.32729 6.76535 9.18427 6.82922 9.07928L5.12053 8.03986C4.84922 8.48586 4.74017 9.01202 4.60125 9.61398L6.55004 10.0637ZM5.99457 7.11961C5.64092 7.36052 5.34291 7.67429 5.12053 8.03986L6.82922 9.07928C6.90334 8.95742 7.00268 8.85283 7.12056 8.77253L5.99457 7.11961ZM15.5757 4.83845C15.7854 4.62878 15.9007 4.51459 15.9899 4.43889C16.0701 4.37076 16.0614 4.39424 16 4.41418L15.382 2.51207C15.0922 2.60621 14.8704 2.76578 14.6955 2.91421C14.5296 3.05506 14.3479 3.2379 14.1615 3.42423L15.5757 4.83845ZM17.8385 3.42423C17.6521 3.23789 17.4704 3.05506 17.3045 2.91421C17.1296 2.76578 16.9078 2.60621 16.618 2.51207L16 4.41418C15.9386 4.39424 15.9299 4.37077 16.0101 4.43889C16.0993 4.51459 16.2146 4.62877 16.4243 4.83845L17.8385 3.42423ZM16 4.41418H16L16.618 2.51207C16.2163 2.38156 15.7837 2.38156 15.382 2.51207L16 4.41418ZM12.2929 6.70708L17.2929 11.7071L18.7071 10.2929L13.7071 5.29286L12.2929 6.70708ZM7.73223 14.8534L2.29289 20.2929L3.70711 21.7071L9.14645 16.2676L7.73223 14.8534Z" />


    </svg>
  )
}