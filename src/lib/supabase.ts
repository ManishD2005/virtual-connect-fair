
import { supabase } from '@/integrations/supabase/client';

// Re-export the supabase client
export { supabase };

// Types for our database tables
export type Profile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'jobseeker' | 'employer';
  job_title: string | null;
  industry: string | null;
  company_name?: string | null;
  location?: string | null;
  bio?: string | null;
  resume_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type Booth = {
  id: string;
  name: string;
  description?: string | null;
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
  resume_url?: string | null;
  cover_letter?: string | null;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string | null;
  created_at: string;
  updated_at: string;
};

export type EventRegistration = {
  id: string;
  event_id: string;
  user_id: string;
  created_at: string;
};
