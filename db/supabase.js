import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    db: {
      schema: "next_auth",
    },
    cookieOptions: {
      secure: true,
      sameSite: "none",
    },
  }
);
