import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Profile } from '@/lib/supabase';
import { useSupabase } from './SupabaseContext';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: AuthError | null;
  userProfile: Profile | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Mock user data for development without Supabase
const mockUserData = {
  id: 'mock-user-id',
  email: 'demo@example.com',
  created_at: new Date().toISOString(),
};

const mockProfileData: Profile = {
  id: 'mock-profile-id',
  user_id: 'mock-user-id',
  first_name: 'Demo',
  last_name: 'User',
  email: 'demo@example.com',
  role: 'jobseeker',
  job_title: 'Software Engineer',
  industry: 'Technology',
  location: 'Remote',
  bio: 'Mock user for development',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
  const { isMockMode } = useSupabase();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error && isMockMode) {
          console.log('Using mock auth data for development');
          return;
        }
        
        if (error) {
          console.error('Error getting session:', error.message);
          setError(error);
          return;
        }
        
        setSession(data.session);
        setUser(data.session?.user || null);
        
        // Get profile data if user is logged in
        if (data.session?.user) {
          await fetchUserProfile(data.session.user.id);
        }
      } catch (err) {
        console.error('Session error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth state changed:', event);
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        await fetchUserProfile(newSession.user.id);
      } else {
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, [isMockMode]);

  const fetchUserProfile = async (userId: string) => {
    try {
      if (isMockMode) {
        // Using mock profile in development
        setUserProfile(mockProfileData);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setIsLoading(true);
    try {
      if (isMockMode) {
        // Mock signup behavior
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Create mock user and session
        const mockUser = {
          ...mockUserData,
          email: email,
        };
        
        const mockProfile = {
          ...mockProfileData,
          email: email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
          job_title: userData.jobTitle || '',
          industry: userData.industry || '',
          company_name: userData.companyName || '',
        };
        
        // Set mock data in state
        setUser(mockUser as User);
        setUserProfile(mockProfile);
        setSession({ access_token: 'mock-token', refresh_token: 'mock-refresh-token', user: mockUser as User } as Session);
        
        toast({
          title: 'Registration successful',
          description: 'Demo mode: Your account has been created successfully.',
        });
        
        return;
      }
      
      // Real Supabase signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
          },
        },
      });

      if (error) {
        setError(error);
        toast({
          title: 'Registration failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        // Create a profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: email,
            role: userData.role,
            job_title: userData.jobTitle || '',
            industry: userData.industry || '',
            company_name: userData.companyName || '',
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          toast({
            title: 'Profile creation failed',
            description: profileError.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Registration successful',
            description: 'Your account has been created.',
          });
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast({
        title: 'Registration failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (isMockMode) {
        // Mock signin behavior
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Create mock user and session
        const mockUser = {
          ...mockUserData,
          email: email,
        };
        
        // Set mock data in state
        setUser(mockUser as User);
        setUserProfile(mockProfileData);
        setSession({ access_token: 'mock-token', refresh_token: 'mock-refresh-token', user: mockUser as User } as Session);
        
        toast({
          title: 'Login successful',
          description: 'Demo mode: Welcome back!',
        });
        
        return;
      }
      
      // Real Supabase signin
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error);
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
    } catch (err) {
      console.error('Signin error:', err);
      toast({
        title: 'Login failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (isMockMode) {
        // Mock signout behavior
        setUser(null);
        setSession(null);
        setUserProfile(null);
        
        toast({
          title: 'Signed out',
          description: 'Demo mode: You have been logged out successfully.',
        });
        
        return;
      }
      
      // Real Supabase signout
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error);
        toast({
          title: 'Sign out failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Signed out',
        description: 'You have been logged out successfully.',
      });
    } catch (err) {
      console.error('Signout error:', err);
      toast({
        title: 'Sign out failed',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signUp, 
      signIn, 
      signOut, 
      error,
      userProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
