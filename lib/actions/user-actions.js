"use server";

import { supabase } from "@/db/supabase";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { PAGE_SIZE } from "../constants";
import { hash } from "../encrypt";
import { getSession } from "./auth-actions";

export async function getAllUsers(page = "1", page_size = PAGE_SIZE, role) {
  const from = (+page - 1) * page_size;
  const to = from + page_size - 1;

  const query = supabase.from("users").select("*", { count: "exact" });

  if (role) {
    query.in("role", role.split(","));
  }

  const {
    data: users,
    error,
    count,
  } = await query.order("created_at", { ascending: false }).range(from, to);

  if (error) throw new Error("Users could not be loaded");

  return {
    users,
    total: count,
    totalPages: count ? Math.ceil(count / page_size) : 1,
  };
}

export async function getSessionUser() {
  const session = await getSession();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, email, role, address, phone_number")
    .eq("email", session.user.email)
    .single();

  if (error) throw new Error("User not found");

  return {
    ...user,
    first_name: user.name.split(" ").at(0),
    last_name: user.name.split(" ").at(1),
    address:
      user.address && Object.keys(user.address).length > 0 ? user.address : {},
  };
}

export async function getUserByEmail(email) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) notFound();

  return data;
}

export async function createAdminUser(formData) {
  try {
    await getSession();

    const { first_name, last_name, email, password } = formData;

    const { data: userExist } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userExist) throw new Error("User with this email already exist");

    const hashedPassword = await hash(password);

    const { error: createError } = await supabase.from("users").insert({
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
      role: "admin",
    });

    if (createError) throw new Error("Failed to create new admin user");

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Admin user created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updateUser(formData) {
  try {
    const session = await getSession();

    const user = await getUserByEmail(session.user.email);
    if (!user) throw new Error("User not found");

    const { error } = await supabase
      .from("users")
      .update({ ...formData })
      .eq("id", user.id)
      .select();

    if (error) throw new Error("Failed to update user data");

    revalidatePath("/profile");

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteUser(userId) {
  try {
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) throw new Error("Failed to delete user");

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deleteUserAccount() {
  try {
    const session = await getSession();

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", session.user.id);

    if (error) throw new Error("Failed to delete user account");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
