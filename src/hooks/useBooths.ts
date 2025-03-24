
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Booth } from '@/lib/supabase';

export const useBooths = () => {
  return useQuery({
    queryKey: ['booths'],
    queryFn: async (): Promise<Booth[]> => {
      const { data, error } = await supabase
        .from('booths')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    },
  });
};

export const useBoothById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['booth', id],
    queryFn: async (): Promise<Booth | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('booths')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
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
