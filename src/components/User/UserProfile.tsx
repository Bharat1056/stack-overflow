import { useAnswerStore, useQuestionStore } from "@/app/store/appStore";
import Logo from "../Logo/Logo";
import dayjs from "dayjs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form } from "react-hook-form";


function AdminPanel() {

    const { questions, countLike } = useQuestionStore(
        (state) => ({
            questions: state.questions,
            countLike: state.countLike,

        })
    )

    const { answers, countLikes } = useAnswerStore(
        (state) => ({
            answers: state.answers,
            countLikes: state.countLikes
        })
    )

   

    useEffect(() => { }, [])

    // const author = user ? () : null


    return (
        <div>
            <div className="flex flex-row ">
                <div className="bg-red-500 w-32 h-32 text-center rounded-full p-12 my-1 mx-3 ">
                    Logo
                </div>
                <div className="flex flex-wrap flex-col">
                    <div>
                        <h1 className="font-bold text-3xl mx-5 my-2">User</h1>
                    </div>
                    <div className="mx-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, quod.
                    </div>
                </div>
            </div>

            <div className="flex flex-row mx-4 my-7">
                <div className="flex flex-wrap flex-col">
                    <h3 className="font-bold text-xl">Stats</h3>
                    <div className="border-black border-2 rounded p-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe.
                    </div>
                </div>
                <div className="flex flex-wrap flex-col mx-5">
                    <h3 className="font-bold text-xl">About</h3>
                    <div className="mx-7">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corrupti perferendis placeat quam quae, nulla, impedit, tenetur eum maxime dolorem blanditiis consequatur vitae doloribus deleniti. Magnam quaerat est expedita officia ut.
                    </div>
                </div>
            </div>

            <div className="mx-4 my-7">
                <h3 className="font-bold text-xl">Top posts</h3>
                <Tabs defaultValue="account" className="w-[1500px]">
                    <TabsList className="bg-blue text-black border-black border-2 ">
                        <TabsTrigger value="questions">Questions</TabsTrigger>
                        <TabsTrigger value="answers">Answers</TabsTrigger>
                        <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                    <TabsList className="bg-blue mx-3 text-black border-black border-2 ">
                        <TabsTrigger value="liked">Liked</TabsTrigger>
                        <TabsTrigger value="newest">Newest</TabsTrigger>
                    </TabsList>
                    <TabsContent value="questions">
                        <div className="border-black border-2 w-full rounded">
                            <Table>
                                <TableCaption>List of questions.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Likes</TableHead>
                                        <TableHead className="text-center">Question</TableHead>
                                        <TableHead className="text-right">Asked at</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        questions.map((question) => {
                                            countLike(question.id);

                                            return (
                                                <TableRow>
                                                    <TableCell >{ countLike(question.id) }</TableCell>
                                                    <TableCell >
                                                        <Link href={'#'}>{question.question}</Link>
                                                    </TableCell>
                                                    <TableCell >{dayjs(question.createdAt).format('MMM DD, YYYY hh:mm A')}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="answers">
                        <div className="border-black border-2 rounded">
                            <Table>
                                <TableCaption>List of answers.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Likes</TableHead>
                                        <TableHead className="text-center">Answer</TableHead>
                                        <TableHead className="text-right">Replied at</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        answers.map((answer) => {
                                            countLikes(answer.id)
                                            return (
                                                <TableRow>
                                                    <TableCell >{ countLike(answer.id) }</TableCell>
                                                    <TableCell >
                                                        <Link href={'#'}>{answer.answer}</Link>
                                                    </TableCell>
                                                    <TableCell >{dayjs(answer.createdAt).format('MMM DD, YYYY hh:mm A')}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="all">
                        <div className="border-black border-2 rounded">
                            <Table>
                                <TableCaption>List of all activities.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Likes</TableHead>
                                        <TableHead className="text-center">Post</TableHead>
                                        <TableHead className="text-right">Posted at</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium"></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="text-right"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="liked">
                        <div className="border-black border-2 rounded">
                            <Table>
                                <TableCaption>List of most liked post.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Likes</TableHead>
                                        <TableHead className="text-center">Post</TableHead>
                                        <TableHead className="text-right">Posted at</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="newest">
                        <div className="border-black border-2 rounded">
                            <Table>
                                <TableCaption>List of newest post.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Likes</TableHead>
                                        <TableHead className="text-center">Post</TableHead>
                                        <TableHead className="text-right">Posted at</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>


            </div>
        </div>
    )
}

export default AdminPanel;