
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SupabaseContextProps {
  supabase: typeof supabase;
  isMockMode: boolean;
}

const SupabaseContext = createContext<SupabaseContextProps | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMockMode, setIsMockMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we're in mock mode by looking for environment variables
    const hasSupabaseConfig = Boolean(
      supabase
    );
    
    setIsMockMode(!hasSupabaseConfig);
    
    if (!hasSupabaseConfig) {
      console.log('Running in mock mode - using demo data');
      toast({
        title: "Database Connection Required",
        description: "Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect to a real database. See .env.example for format.",
        variant: "destructive",
        duration: 10000,
      });
    } else {
      console.log('Connected to Supabase database');
      toast({
        title: "Database Connected",
        description: "Successfully connected to Supabase database.",
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
