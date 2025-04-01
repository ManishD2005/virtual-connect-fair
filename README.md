
# VirtualConnect - Virtual Career Fair Platform

## Database Setup

This application uses Supabase for its backend database and authentication. To connect to a real database:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Once your project is created, go to Project Settings -> API
4. Copy your project URL and anon/public key
5. Create a `.env` file in the root of your project with these values:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Database Schema

The following tables need to be created in your Supabase project:

### profiles
- id (uuid, primary key)
- user_id (uuid, references auth.users.id)
- first_name (text)
- last_name (text)
- email (text)
- role (text, enum: 'jobseeker', 'employer')
- job_title (text)
- industry (text)
- company_name (text, nullable)
- location (text, nullable)
- bio (text, nullable)
- resume_url (text, nullable)
- created_at (timestamp with timezone)
- updated_at (timestamp with timezone)

### booths
- id (uuid, primary key)
- name (text)
- description (text, nullable)
- logo (text)
- cover_image (text)
- location (text)
- industry (text)
- employee_count (text)
- owner_id (uuid, references auth.users.id)
- created_at (timestamp with timezone)
- updated_at (timestamp with timezone)

### job_positions
- id (uuid, primary key)
- booth_id (uuid, references booths.id)
- title (text)
- description (text)
- location (text)
- employment_type (text)
- created_at (timestamp with timezone)
- updated_at (timestamp with timezone)

### applications
- id (uuid, primary key)
- job_position_id (uuid, references job_positions.id)
- user_id (uuid, references auth.users.id)
- status (text, enum: 'pending', 'reviewing', 'accepted', 'rejected')
- resume_url (text, nullable)
- cover_letter (text, nullable)
- created_at (timestamp with timezone)
- updated_at (timestamp with timezone)

### events
- id (uuid, primary key)
- name (text)
- description (text)
- start_date (timestamp with timezone)
- end_date (timestamp with timezone)
- location (text, nullable)
- created_at (timestamp with timezone)
- updated_at (timestamp with timezone)

### event_registrations
- id (uuid, primary key)
- event_id (uuid, references events.id)
- user_id (uuid, references auth.users.id)
- created_at (timestamp with timezone)

## Running the Application

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open your browser to the URL shown in the terminal
