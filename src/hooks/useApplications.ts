
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Application } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useUploadResume } from '@/hooks/useProfile';

// Extended application type with job details
type ExtendedApplication = Application & {
  job_title?: string;
  company_name?: string;
};

export const useApplications = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['applications', user?.id],
    queryFn: async (): Promise<ExtendedApplication[]> => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            job_positions:job_position_id (
              title,
              booth_id,
              booths:booth_id (name)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching applications:', error);
          return [];
        }
        
        // Transform the data to match the ExtendedApplication type
        return data.map(app => ({
          ...app,
          job_title: app.job_positions?.title,
          company_name: app.job_positions?.booths?.name,
        }));
      } catch (error) {
        console.error('Error in useApplications:', error);
        return [];
      }
    },
    enabled: !!user,
  });
};

export const useApplyForJob = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const uploadResumeMutation = useUploadResume();
  
  return useMutation({
    mutationFn: async ({ 
      jobPositionId, 
      coverLetter, 
      resumeFile 
    }: { 
      jobPositionId: string; 
      coverLetter: string; 
      resumeFile: File | null;
    }) => {
      if (!user) throw new Error('No authenticated user');
      
      let resumeUrl = '';
      
      // If a resume file is provided, upload it first
      if (resumeFile) {
        resumeUrl = await uploadResumeMutation.mutateAsync(resumeFile);
      }
      
      // Create the application
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_position_id: jobPositionId,
          user_id: user.id,
          status: 'pending',
          resume_url: resumeUrl,
          cover_letter: coverLetter,
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications', user?.id] });
    },
  });
};

export const useApplicationById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: async (): Promise<ExtendedApplication | null> => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            job_positions:job_position_id (
              title,
              booth_id,
              booths:booth_id (name)
            )
          `)
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching application by ID:', error);
          return null;
        }
        
        // Transform the data to match the ExtendedApplication type
        return {
          ...data,
          job_title: data.job_positions?.title,
          company_name: data.job_positions?.booths?.name,
        };
      } catch (error) {
        console.error('Error in useApplicationById:', error);
        return null;
      }
    },
    enabled: !!id,
  });
};
