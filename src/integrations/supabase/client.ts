
// This is a mock implementation of the Supabase client
// You can replace this with your own database implementation

const mockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signUp: ({ email, password, options }: any) => Promise.resolve({ data: null, error: null }),
    signIn: ({ email, password }: any) => Promise.resolve({ data: null, error: null }),
    signInWithPassword: ({ email, password }: any) => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: (callback: Function) => {
      // Call the callback with initial state
      callback('INITIAL_SESSION', null);
      return { 
        data: { subscription: { unsubscribe: () => {} } },
        error: null
      };
    },
  },
  from: (table: string) => ({
    select: (columns?: string) => ({ 
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: (column: string, options: any) => ({
          eq: (column: string, value: any) => Promise.resolve({ data: [], error: null })
        }),
        maybeSingle: () => Promise.resolve({ data: null, error: null })
      }),
      order: (column: string, options: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: [], error: null })
      })
    }),
    insert: (data: any) => ({ 
      select: (columns?: string) => ({
        single: () => Promise.resolve({ data: null, error: null })
      }) 
    }),
    update: (data: any) => ({ 
      eq: (column: string, value: any) => ({
        select: (columns?: string) => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      }) 
    }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => Promise.resolve({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' }, error: null }),
    })
  },
  functions: {
    invoke: (name: string, options?: any) => Promise.resolve({ data: null, error: null })
  }
};

export const supabase = mockClient;
