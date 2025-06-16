"use server";

import { auth, signIn, signOut } from "@/auth";
import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { compare, hash } from "../encrypt";
import { getUserByEmail } from "./user-actions";

export async function getSession() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  return session;
}

export async function getOAuthProvider() {
  const session = await getSession();

  const { data: account } = await supabase
    .from("accounts")
    .select("provider")
    .eq("userId", session.user.id)
    .single();

  return account?.provider || null;
}

export async function signInWithCredentials(prevState, formData) {
  try {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

export async function signUpWithCredentials(prevState, formData) {
  try {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const user = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      password,
    };

    const userExists = await getUserByEmail(user.email);
    if (userExists)
      throw new Error("User with this email address already exists");

    const plainPassword = user.password;

    // Hash user's password before inserting user to database
    user.password = await hash(user.password);

    const { data, error } = await supabase
      .from("users")
      .insert({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        password: user.password,
      })
      .select("*")
      .single();

    if (error) throw new Error("Failed to register a new user");

    await signIn("credentials", {
      email: data.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "Signed up successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
}

export async function updateUserPassword(prevState, formData) {
  try {
    const session = await getSession();

    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      throw new Error("Password does not match");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user || !user.password) throw new Error("User does not exist");

    const isMatch = await compare(password, user.password);

    if (isMatch)
      throw new Error(
        "Looks like you're trying to reuse your old password. Please pick something new to keep your account secure."
      );

    // Hash new password
    const newPassword = await hash(password);

    const { error } = await supabase
      .from("users")
      .update({ password: newPassword })
      .eq("id", session.user.id);

    if (error) throw new Error("Failed to update password");

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
