import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional()
});

export type Env = z.infer<typeof EnvSchema>;

export function getEnv(): Env {
  return EnvSchema.parse(process.env);
}
