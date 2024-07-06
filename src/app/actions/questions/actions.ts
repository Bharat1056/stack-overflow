"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { publishQuestionSchemaType } from "@/validation/question.validation";

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

// show all questions

// show question based on question-title

// increase views for an question

// decrase views for an question

// increase votes for an question

// decrease votes for an question
