import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { authConfig } from "./authConfig";
import { supabase } from "./db/supabase";
import { getCartFromCookies } from "./lib/actions/cart-actions";
import { getUserByEmail } from "./lib/actions/user-actions";
import { compare } from "./lib/encrypt";

export const config = {
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_KEY,
  }),
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        const user = await getUserByEmail(credentials.email);

        if (user && user.password) {
          const isMatch = await compare(credentials.password, user.password);

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;

        if (trigger === "signIn" || trigger === "signUp") {
          const sessionCartId = (await cookies()).get("sessionCartId")?.value;

          if (sessionCartId) {
            const sessionCart = await getCartFromCookies(sessionCartId);

            if (sessionCart) {
              // Delete current user cart
              await supabase
                .schema("public")
                .from("carts")
                .delete()
                .eq("user_id", user.id);

              // Assign new cart (If there were some cookie cart items, merge them into the user's cart in Supabase)
              await supabase
                .schema("public")
                .from("carts")
                .update({
                  user_id: user.id,
                })
                .eq("session_cart_id", sessionCart.session_cart_id);
            }
          }
        }
      }

      // Handle session updates
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    async session({ session, user, trigger, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(config);
