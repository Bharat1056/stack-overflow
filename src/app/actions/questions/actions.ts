"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import {
  publishQuestionSchemaType,
  updateQuestionSchemaType,
} from "@/validation/question.validation";

// publish an question
export async function publishQuestion(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }

  const dataUser: publishQuestionSchemaType = {
    question_title: formData.get("question_title") as string,
    question_description: formData.get("question_description") as string,
    tags: formData.getAll("tags") as string[],
    user_id: data.user?.id!,
  };


  // create data object in the database
  const { data: publishData, error: publishError } = await supabase
    .from("Questions")
    .insert({
      question_title: dataUser.question_title,
      question_description: dataUser.question_description,
      views: [],
      votes: [],
      tags: dataUser.tags,
      user_id: dataUser.user_id,
    });

  if (publishError) {
    return { success: false, message: publishError.message };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "Question Published", data: publishData };
}
// delete an question
export async function deleteQuestion(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }
  const dataUser = {
    question_id: formData.get("question_id") as string,
  };
  const { error: deleteError } = await supabase.auth.admin.deleteUser(
    dataUser.question_id
  );
  if (deleteError) {
    return { success: false, message: deleteError.message };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "Question Deleted" };
}
// update an question
export async function updateQuestion(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }
  const dataUser: updateQuestionSchemaType = {
    question_title: formData.get("question_title") as string,
    question_description: formData.get("question_description") as string,
    tags: formData.getAll("tags") as string[],
  };

  const { data: updateData, error: updateError } = await supabase
    .from("Questions")
    .update({
      question_title: dataUser.question_title,
      question_description: dataUser.question_description,
      tags: dataUser.tags,
    });

  if (updateError) {
    return { success: false, message: updateError.message };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "Question Published", data: updateData };
}
// show all questions
export async function showAllQuestions() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }
  const { data: showAllData, error: showAllError } = await supabase
    .from("Questions")
    .select("*");

  if (showAllError) {
    return { success: false, message: showAllError.message };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "Question Fetched", data: showAllData };
}
// show question based on question-title
export async function showQuestion(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }
  const dataUser = {
    question_title: formData.get("question_title") as string,
  };
  const { data: questionData, error: questionError } = await supabase
    .from("Questions")
    .select("*")
    .eq("question_title", dataUser.question_title);
  if (questionError) {
    return { success: false, message: questionError.message };
  }
  revalidatePath("/", "layout");
  return { success: true, message: "Question Fetched", data: questionData };
}
// update views for an question
export async function updateViews(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }

  const dataQuestion = {
    questionID: formData.get("questionID") as string
  }

  const { data: questionData, error: questionError } = await supabase
    .from("Questions")
    .select("*")
    .eq("id", dataQuestion.questionID);

  if (questionError) {
    return { success: false, message: questionError.message };
  }

  // check user already added in the views list or not
  let questionViewsArray = questionData[0].views;
  const isExist = questionViewsArray.includes(data.user.id)
  if (!isExist) {
    questionViewsArray.push(data.user.id);
  }

  const { data: increaViewsData, error: increaseViewsError } = await supabase
    .from("Questions")
    .update({
      views: questionViewsArray,
    });

  if (increaseViewsError) {
    return { success: false, message: increaseViewsError.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Views increased" };
}
// update votes for an question
export async function updateVotes(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      success: false,
      message: error?.message || "User not authenticated",
    };
  }

  const dataQuestion = {
    questionID: formData.get("questionID") as string
  }

  const { data: questionData, error: questionError } = await supabase
    .from("Questions")
    .select("*")
    .eq("id", dataQuestion.questionID);

  if (questionError) {
    return { success: false, message: questionError.message };
  }

  if (questionData[0].user_id == data.user.id) {
    return { success: false, message: "You can't vote for your own question" };
  }

  // check user already added in the vote list or not
  let questionVotesArray = questionData[0].votes;
  const isExist = questionVotesArray.includes(data.user.id)
  if (isExist) {
    questionVotesArray = questionVotesArray.filter((item: string) => item !== data.user.id);
  } else {
    questionVotesArray.push(data.user.id);
  }

  const { data: increaVotesData, error: increaseVotesError } = await supabase
    .from("Questions")
    .update({
      votes: questionVotesArray,
    });

  if (increaseVotesError) {
    return { success: false, message: increaseVotesError.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Votes increased" };
}