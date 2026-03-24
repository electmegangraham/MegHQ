import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "../env.js";

let cachedClient: SupabaseClient | null = null;

export function getDbClient(): SupabaseClient {
  if (cachedClient) {
    return cachedClient;
  }

  const env = getEnv();

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  cachedClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return cachedClient;
}
