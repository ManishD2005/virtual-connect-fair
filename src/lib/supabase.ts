
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Re-export the supabase client
export { supabase };

// Define types that match exactly what's in the database
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Booth = Database['public']['Tables']['booths']['Row'];
export type JobPosition = Database['public']['Tables']['job_positions']['Row'];
export type Application = Database['public']['Tables']['applications']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type EventRegistration = Database['public']['Tables']['event_registrations']['Row'];

// Create a simple environment.d.ts file for TypeScript to recognize the env variables
<lov-write file_path="src/env.d.ts">
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
