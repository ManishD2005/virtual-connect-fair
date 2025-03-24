
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Booth } from '@/lib/supabase';

// Mock booth data for development when Supabase is not configured
const mockBooths: Booth[] = [
  {
    id: '1',
    name: 'TechGlobal Solutions',
    description: 'Leading provider of enterprise technology solutions for businesses of all sizes.',
    logo: 'https://ui-avatars.com/api/?name=TechGlobal&background=0D8ABC&color=fff&bold=true&font-size=0.5',
    cover_image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094',
    location: 'San Francisco, CA',
    industry: 'Technology',
    employee_count: '1000-5000',
    owner_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Innovate Health',
    description: 'Revolutionizing healthcare through innovative technology and patient-centered solutions.',
    logo: 'https://ui-avatars.com/api/?name=Innovate+Health&background=1D976C&color=fff&bold=true&font-size=0.5',
    cover_image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7',
    location: 'Boston, MA',
    industry: 'Healthcare',
    employee_count: '500-1000',
    owner_id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Green Energy Dynamics',
    description: 'Sustainable energy solutions for a cleaner, greener future.',
    logo: 'https://ui-avatars.com/api/?name=Green+Energy&background=2E8B57&color=fff&bold=true&font-size=0.5',
    cover_image: 'https://images.unsplash.com/photo-1518731001547-1524ae4kf2Cc',
    location: 'Austin, TX',
    industry: 'Renewable Energy',
    employee_count: '100-500',
    owner_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Financial Futures',
    description: 'Innovative financial technology solutions for modern banking and investment.',
    logo: 'https://ui-avatars.com/api/?name=Financial+Futures&background=1B4F72&color=fff&bold=true&font-size=0.5',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    location: 'New York, NY',
    industry: 'Finance',
    employee_count: '500-1000',
    owner_id: '4',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Creative Design Studio',
    description: 'Award-winning creative agency specializing in branding, UX/UI design, and digital marketing.',
    logo: 'https://ui-avatars.com/api/?name=Creative+Design&background=FF5722&color=fff&bold=true&font-size=0.5',
    cover_image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094',
    location: 'Los Angeles, CA',
    industry: 'Design',
    employee_count: '50-100',
    owner_id: '5',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'EduTech Innovators',
    description: 'Transforming education through accessible and engaging digital learning solutions.',
    logo: 'https://ui-avatars.com/api/?name=EduTech&background=3F51B5&color=fff&bold=true&font-size=0.5',
    cover_image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    location: 'Chicago, IL',
    industry: 'Education Technology',
    employee_count: '100-500',
    owner_id: '6',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const useBooths = () => {
  return useQuery({
    queryKey: ['booths'],
    queryFn: async (): Promise<Booth[]> => {
      try {
        const { data, error } = await supabase
          .from('booths')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching booths:', error);
          // Return mock data in development if Supabase fetch fails
          return mockBooths;
        }
        
        return data && data.length > 0 ? data : mockBooths;
      } catch (error) {
        console.error('Error in useBooths:', error);
        return mockBooths;
      }
    },
  });
};

export const useBoothById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['booth', id],
    queryFn: async (): Promise<Booth | null> => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from('booths')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching booth by ID:', error);
          // Return mock booth that matches the ID if Supabase fetch fails
          const mockBooth = mockBooths.find(booth => booth.id === id);
          return mockBooth || null;
        }
        
        return data || (mockBooths.find(booth => booth.id === id) || null);
      } catch (error) {
        console.error('Error in useBoothById:', error);
        return mockBooths.find(booth => booth.id === id) || null;
      }
    },
    enabled: !!id,
  });
};

export const useCreateBooth = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (boothData: Omit<Booth, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('booths')
        .insert(boothData)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booths'] });
    },
  });
};

export const useUpdateBooth = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Booth> & { id: string }) => {
      const { data, error } = await supabase
        .from('booths')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['booths'] });
      queryClient.invalidateQueries({ queryKey: ['booth', variables.id] });
    },
  });
};
