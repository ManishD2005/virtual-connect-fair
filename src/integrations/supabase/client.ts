
// This is a mock implementation of the Supabase client
// You can replace this with your own database implementation

const mockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    signUp: () => Promise.resolve({ data: null, error: null }),
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ 
      subscription: { unsubscribe: () => {} }
    }),
  },
  from: () => ({
    select: () => ({ 
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      order: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => ({ 
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      }) 
    }),
    update: () => ({ 
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      }) 
    }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    })
  },
  functions: {
    invoke: () => Promise.resolve({ data: null, error: null })
  }
};

export const supabase = mockClient;
