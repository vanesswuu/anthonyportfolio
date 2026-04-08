import { createClient } from '@supabase/supabase-js';

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supaUrl, supaKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
