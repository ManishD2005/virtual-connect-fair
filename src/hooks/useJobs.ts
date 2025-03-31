
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, JobPosition } from '@/lib/supabase';

// Extended job position type that includes booth name
type ExtendedJobPosition = JobPosition & {
  booth_name?: string;
};

// Mock job data for development when Supabase is not configured
const mockJobs: ExtendedJobPosition[] = [
  {
    id: '1',
    booth_id: '1',
    title: 'Senior Software Engineer',
    description: 'We are looking for a Senior Software Engineer to join our team. You will be responsible for designing, developing, and maintaining software applications. The ideal candidate should have experience with modern JavaScript frameworks, RESTful APIs, and database systems.',
    location: 'San Francisco, CA (Remote)',
    employment_type: 'Full-time',
    booth_name: 'TechGlobal Solutions',
    created_at: new Date(2023, 11, 10).toISOString(),
    updated_at: new Date(2023, 11, 10).toISOString(),
  },
  {
    id: '2',
    booth_id: '1',
    title: 'UX/UI Designer',
    description: 'TechGlobal Solutions is seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a portfolio that demonstrates their ability to create intuitive interfaces and solve complex design problems.',
    location: 'San Francisco, CA',
    employment_type: 'Full-time',
    booth_name: 'TechGlobal Solutions',
    created_at: new Date(2023, 11, 15).toISOString(),
    updated_at: new Date(2023, 11, 15).toISOString(),
  },
  {
    id: '3',
    booth_id: '2',
    title: 'Healthcare Data Analyst',
    description: 'Innovate Health is looking for a Data Analyst to join our growing team. You will analyze healthcare data to identify trends and insights that will help improve patient outcomes and optimize healthcare delivery. Strong SQL skills and experience with healthcare data are required.',
    location: 'Boston, MA (Hybrid)',
    employment_type: 'Full-time',
    booth_name: 'Innovate Health',
    created_at: new Date(2023, 11, 20).toISOString(),
    updated_at: new Date(2023, 11, 20).toISOString(),
  },
  {
    id: '4',
    booth_id: '3',
    title: 'Renewable Energy Engineer',
    description: 'Green Energy Dynamics is seeking a Renewable Energy Engineer to help design and implement sustainable energy solutions. The successful candidate will work on innovative projects related to solar, wind, and other renewable energy sources.',
    location: 'Austin, TX',
    employment_type: 'Full-time',
    booth_name: 'Green Energy Dynamics',
    created_at: new Date(2023, 11, 25).toISOString(),
    updated_at: new Date(2023, 11, 25).toISOString(),
  },
  {
    id: '5',
    booth_id: '4',
    title: 'Financial Analyst Intern',
    description: 'Financial Futures is offering a summer internship program for Financial Analyst positions. This is a great opportunity for finance students to gain hands-on experience in financial modeling, market analysis, and investment research.',
    location: 'New York, NY',
    employment_type: 'Internship',
    booth_name: 'Financial Futures',
    created_at: new Date(2023, 11, 30).toISOString(),
    updated_at: new Date(2023, 11, 30).toISOString(),
  },
  {
    id: '6',
    booth_id: '5',
    title: 'Graphic Designer',
    description: 'Creative Design Studio is looking for a talented Graphic Designer to join our team. You will create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, or captivate consumers.',
    location: 'Los Angeles, CA (Remote)',
    employment_type: 'Contract',
    booth_name: 'Creative Design Studio',
    created_at: new Date(2024, 0, 5).toISOString(),
    updated_at: new Date(2024, 0, 5).toISOString(),
  },
];

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async (): Promise<ExtendedJobPosition[]> => {
      try {
        const { data, error } = await supabase
          .from('job_positions')
          .select(`
            *,
            booths:booth_id (name)
          `)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching jobs:', error);
          // Return mock data in development if Supabase fetch fails
          return mockJobs;
        }
        
        // Transform the data to match the ExtendedJobPosition type
        const transformedData = data.map(job => ({
          ...job,
          booth_name: job.booths ? job.booths.name : undefined,
        }));
        
        return transformedData.length > 0 ? transformedData : mockJobs;
      } catch (error) {
        console.error('Error in useJobs:', error);
        return mockJobs;
      }
    },
  });
};

export const useJobById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async (): Promise<ExtendedJobPosition | null> => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from('job_positions')
          .select(`
            *,
            booths:booth_id (name)
          `)
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching job by ID:', error);
          // Return mock job that matches the ID if Supabase fetch fails
          const mockJob = mockJobs.find(job => job.id === id);
          return mockJob || null;
        }
        
        // Transform the data to match the ExtendedJobPosition type
        const transformedData = {
          ...data,
          booth_name: data.booths ? data.booths.name : undefined,
        };
        
        return transformedData || (mockJobs.find(job => job.id === id) || null);
      } catch (error) {
        console.error('Error in useJobById:', error);
        return mockJobs.find(job => job.id === id) || null;
      }
    },
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (jobData: Omit<JobPosition, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('job_positions')
        .insert(jobData)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
