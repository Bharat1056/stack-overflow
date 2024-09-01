"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  const dataUser = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(dataUser);

  if (error) {
    return { success: false, message: error.message };
  }

  const { data: selectData, error: selectError } = await supabase
    .from("User")
    .select("*")
    .eq("id", data.user.id);

  if (selectError) {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      return { success: false, message: signOutError.message };
    }
    return { success: false, message: selectError.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Login Successfull", data: selectData };
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const dataUser = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        username: formData.get("username") as string,
      },
    },
  };


  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
    dataUser
  );

  if (signUpError) {
    return { success: false, message: signUpError.message };
  }

  const { data: userData, error: userError } = await supabase
    .from("User")
    .insert({
      id: signUpData.user?.id,
      email: dataUser.email,
      username: dataUser.options.data.username,
    });

  if (userError) {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      signUpData.user?.id!
    )
    if (deleteError) {
      return { success: false, message: deleteError.message };
    }
    return { success: false, message: userError.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Signup Successfull", data: userData };
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient();
  const dataUser = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(dataUser.email, {
    redirectTo: "http://localhost:3000/update-pwd",
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Email sent successfully" };
}

export async function updatePassword(formData: FormData) {
  const supabase = createClient();

  const dataUser = {
    password: formData.get("password") as string,
    code: formData.get("code") as string,
  };

  const { error: exchangeError, data: sessionData } =
    await supabase.auth.exchangeCodeForSession(dataUser.code);

  if (exchangeError) {
    return { success: false, message: exchangeError.message };
  }

  if (!sessionData || !sessionData.session.access_token) {
    return { success: false, message: "Failed to establish a session." };
  }

  const { error } = await supabase.auth.updateUser({
    password: dataUser.password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");

  await supabase.auth.signOut();

  return { success: true, message: "Password update successful." };
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: "Logout Successful" };
}
