"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

export default function CommentComponent() {
    const [ showReply, setShowReply ] = useState(false)
  return (
    <Card className="flex items-start gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/20">
          <ThumbsUpIcon className="w-5 h-5" />
          <span className="sr-only">Upvote</span>
        </Button>
        <div className="text-sm font-medium">23</div>
      </div>
      <div className="flex-1 grid gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="font-medium">Acme Inc</div>
          <div className="text-xs text-muted-foreground">2 hours ago</div>
        </div>
        <div className="text-sm">
          This is a beautifully designed comment card with all the necessary features. The layout and spacing are
          perfect, and the use of icons and buttons makes it very intuitive to use.
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/20">
            <MessageCircleIcon className="w-5 h-5" />
            <span className="sr-only">Reply</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/20">
            <PencilIcon className="w-5 h-5" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-500/20">
            <TrashIcon className="w-5 h-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        {
            showReply && (
                <CommentComponent /> 
            )
        }
      </div>
    </Card>
  )
}

function MessageCircleIcon(props: any) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function PencilIcon(props: any) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
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
      fill="none"
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


function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}