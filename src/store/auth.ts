import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, setAuthToken, updateCurrentUser } from '@/services/api';

export type UserRole = 'User' | 'Manager' | 'Admin';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<AuthUser, 'name' | 'email'>>) => Promise<boolean>;
  clearError: () => void;
}

const readAuthError = (error: unknown, fallback: string) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'error' in error.response.data &&
    typeof error.response.data.error === 'string'
  ) {
    return error.response.data.error;
  }

  return fallback;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        if (!email || !password) {
          set({ error: 'Email and password are required' });
          return false;
        }

        try {
          set({ isLoading: true, error: null });
          const { user, token } = await loginUser(email, password);
          setAuthToken(token);
          set({ user, token, isLoading: false });
          return true;
        } catch (error: unknown) {
          set({
            isLoading: false,
            error: readAuthError(error, 'Unable to login. Please try again.'),
          });
          return false;
        }
      },
      register: async (name, email, password) => {
        if (!name || !email || !password) {
          set({ error: 'Please fill all fields' });
          return false;
        }

        try {
          set({ isLoading: true, error: null });
          const { user, token } = await registerUser(name, email, password);
          setAuthToken(token);
          set({ user, token, isLoading: false });
          return true;
        } catch (error: unknown) {
          set({
            isLoading: false,
            error: readAuthError(error, 'Unable to create account. Please try again.'),
          });
          return false;
        }
      },
      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null, error: null });
      },
      updateProfile: async (updates) => {
        const token = get().token;
        if (!token) return false;

        try {
          set({ isLoading: true, error: null });
          setAuthToken(token);
          const user = await updateCurrentUser(updates);
          set({ user, isLoading: false });
          return true;
        } catch (error: unknown) {
          set({
            isLoading: false,
            error: readAuthError(error, 'Unable to update profile. Please try again.'),
          });
          return false;
        }
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: 'adnoviq-auth',
      onRehydrateStorage: () => (state) => {
        setAuthToken(state?.token || null);
      },
    },
  ),
);
