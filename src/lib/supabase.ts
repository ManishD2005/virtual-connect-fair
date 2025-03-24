
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types for our database tables
export type Profile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'jobseeker' | 'employer';
  job_title: string;
  industry: string;
  company_name?: string;
  location?: string;
  bio?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
};

export type Booth = {
  id: string;
  name: string;
  description?: string;
  logo: string;
  cover_image: string;
  location: string;
  industry: string;
  employee_count: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export type JobPosition = {
  id: string;
  booth_id: string;
  title: string;
  description: string;
  location: string;
  employment_type: string;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  job_position_id: string;
  user_id: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  resume_url?: string;
  cover_letter?: string;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  created_at: string;
  updated_at: string;
};

export type EventRegistration = {
  id: string;
  event_id: string;
  user_id: string;
  created_at: string;
};
