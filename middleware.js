import NextAuth from "next-auth";
import { authConfig } from "./authConfig";

export const { auth: middleware } = NextAuth(authConfig);
