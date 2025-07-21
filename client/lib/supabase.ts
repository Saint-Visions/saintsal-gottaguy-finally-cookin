import { createClient } from "@supabase/supabase-js";

// ✅ Use Next.js-compatible env vars (client-safe)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🛡️ Create a fallback mock client if envs are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "⚠️ Supabase environment variables missing. Running in mock/dev mode."
    );

    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signIn: () => Promise.resolve({ data: { user: null }, error: null }),
        signUp: () => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: null } }),
      },
            from: () => ({
              select: () => Promise.resolve({ data: [], error: null })
            }),
          };
        }
        return createClient(supabaseUrl, supabaseAnonKey);
      };
      
      export default createSupabaseClient;
