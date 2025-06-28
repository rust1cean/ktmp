import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types";

export * from "./types";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!
);
