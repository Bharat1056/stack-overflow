"use client"
import React from "react";
import { publishQuestion } from "../actions/questions/actions"
import QuestionBox from "@/components/Home/Question";
import QuestionDetails from "@/components/Home/QuestionDetails";
import EditorText from "@/components/Text-Editor/EditorText";

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
            <QuestionDetails />
            {/* <QuestionBox /> */}
            {/* <EditorText /> */}
        </>
    )
}

export default page