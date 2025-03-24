
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Event } from '@/lib/supabase';

// Mock event data for development when Supabase is not configured
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Virtual Career Fair 2024',
    description: 'Connect with top employers from around the world. Explore job opportunities, attend workshops, and network with industry professionals.',
    start_date: new Date(2024, 6, 15, 10, 0).toISOString(), // July 15, 2024, 10:00 AM
    end_date: new Date(2024, 6, 16, 16, 0).toISOString(), // July 16, 2024, 4:00 PM
    location: 'Virtual Event',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Tech Networking Mixer',
    description: 'Join us for a virtual networking event focused on connecting professionals in the tech industry. Meet peers, mentors, and potential collaborators.',
    start_date: new Date(2024, 5, 5, 18, 0).toISOString(), // June 5, 2024, 6:00 PM
    end_date: new Date(2024, 5, 5, 20, 0).toISOString(), // June 5, 2024, 8:00 PM
    location: 'Zoom Webinar',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Resume Workshop',
    description: 'Get expert feedback on your resume from industry professionals. Learn how to highlight your skills and experiences to stand out to recruiters.',
    start_date: new Date(2024, 4, 20, 13, 0).toISOString(), // May 20, 2024, 1:00 PM
    end_date: new Date(2024, 4, 20, 15, 0).toISOString(), // May 20, 2024, 3:00 PM
    location: 'Virtual Workshop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Healthcare Industry Panel',
    description: 'Join our panel of healthcare professionals as they discuss current trends and opportunities in the healthcare industry.',
    start_date: new Date(2024, 3, 10, 11, 0).toISOString(), // April 10, 2024, 11:00 AM
    end_date: new Date(2024, 3, 10, 13, 0).toISOString(), // April 10, 2024, 1:00 PM
    location: 'Virtual Panel',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Startup Funding Workshop',
    description: 'Learn about different funding options for startups, from bootstrapping to venture capital. Experts will share insights and answer questions.',
    start_date: new Date(2023, 11, 5, 15, 0).toISOString(), // Dec 5, 2023, 3:00 PM
    end_date: new Date(2023, 11, 5, 17, 0).toISOString(), // Dec 5, 2023, 5:00 PM
    location: 'Virtual Workshop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Diversity in Tech Conference',
    description: 'A day-long virtual conference focused on promoting diversity and inclusion in the tech industry. Features keynote speakers, panel discussions, and networking opportunities.',
    start_date: new Date(2023, 9, 15, 9, 0).toISOString(), // Oct 15, 2023, 9:00 AM
    end_date: new Date(2023, 9, 15, 17, 0).toISOString(), // Oct 15, 2023, 5:00 PM
    location: 'Virtual Conference',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async (): Promise<Event[]> => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('start_date', { ascending: true });
        
        if (error) {
          console.error('Error fetching events:', error);
          // Return mock data in development if Supabase fetch fails
          return mockEvents;
        }
        
        return data && data.length > 0 ? data : mockEvents;
      } catch (error) {
        console.error('Error in useEvents:', error);
        return mockEvents;
      }
    },
  });
};

export const useEventById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async (): Promise<Event | null> => {
      if (!id) return null;
      
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching event by ID:', error);
          // Return mock event that matches the ID if Supabase fetch fails
          const mockEvent = mockEvents.find(event => event.id === id);
          return mockEvent || null;
        }
        
        return data || (mockEvents.find(event => event.id === id) || null);
      } catch (error) {
        console.error('Error in useEventById:', error);
        return mockEvents.find(event => event.id === id) || null;
      }
    },
    enabled: !!id,
  });
};

export const useRegisterForEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId, userId }: { eventId: string; userId: string }) => {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert({ event_id: eventId, user_id: userId })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event_registrations'] });
    },
  });
};
