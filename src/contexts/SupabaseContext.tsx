
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupabaseContextProps {
  supabase: typeof supabase;
  isMockMode: boolean;
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use mock mode since we've removed Supabase integration
  const [isMockMode, setIsMockMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Running in mock mode - using demo data');
    toast({
      title: "Offline Mode Active",
      description: "The application is running with mock data. You can implement your own database solution.",
      duration: 10000,
    });
  }, [toast]);

  return (
    <SupabaseContext.Provider value={{ supabase, isMockMode }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
