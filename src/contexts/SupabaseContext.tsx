
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface SupabaseContextProps {
  supabase: any;
  isMockMode: boolean;
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMockMode, setIsMockMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we're in mock mode by looking for environment variables
    const hasSupabaseConfig = Boolean(
      import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
    );
    
    setIsMockMode(!hasSupabaseConfig);
    
    if (!hasSupabaseConfig) {
      console.log('Running in mock mode - using demo data');
      toast({
        title: "Demo Mode Active",
        description: "Running with mock data. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect to a real database.",
      });
    }
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
