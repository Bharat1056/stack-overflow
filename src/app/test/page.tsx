"use client"
import React from "react";
import { publishQuestion } from "../actions/questions/actions"
import QuestionBox from "@/components/Home/Question";
import QuestionDetails from "@/components/Home/QuestionDetails";
import EditorText from "@/components/Text-Editor/EditorText";
import testing_array from "./test";

const page = () => {
    // const [loading, setLoading] = React.useState(false)
    // async function handleSubmit() {
    //     setLoading(true)
    //     try {
    //         const formData = new FormData();
    //         formData.append("question_title", "title");
    //         formData.append("question_description", "description");

    //         const tags = ["hi", "bye"];
    //         tags.forEach(tag => formData.append("tags", tag));

    //         const response = await publishQuestion(formData);
    //         console.log(response);
    //     } catch (error: any) {
    //         console.log(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }



    return (
        <>
            <QuestionDetails
                questionTitle={'Introducing the WhimsiMug: A Delightful Companion for Your Daily Sips of Joy'} questionDescription={'The WhimsiMug is a truly unique and captivating creation that will transform your daily coffee or tea routine into a whimsical and enchanting experience. Crafted with the utmost care and attention to detail, this mug is a true work of art, featuring a burst of vibrant colors and playful patterns that dance across its surface, telling a story of wonder and creativity. The WhimsiMug is a truly unique and captivating creation that will transform your daily coffee or tea routine into a whimsical and enchanting experience. Crafted with the utmost care and attention to detail, this mug is a true work of art, featuring a burst of vibrant colors and playful patterns that dance across its surface, telling a story of wonder and creativity.'}
                authorName={'acme'}
                totalVotes={12000}
                totalViews={12000}
            />
            {/* {
                testing_array.map((question, index) => (
                    <>
                        <QuestionBox
                            key={index}
                            questionTitle={question.questionTitle}
                            questionDescription={question.questionDescription}
                            totalViews={question.totalViews}
                            totalAnswer={question.totalAnswer}
                            totalVotes={question.totalVotes}
                            authorName={question.authorName}
                            authorEmail={question.authorEmail}
                        />
                    </>
                ))
            } */}
            {/* <EditorText /> */}
        </>
    )
}

export default page