import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../useStorageState';
import { LoginRequest, LoginResponse, AuthRepository } from '@/repositories/AuthRepository'
import { Result } from '@/repositories/Response';


const AuthContext = createContext<{
  signIn: (props: LoginRequest) => Promise<boolean>;
  signOut: () => void;
  accessToken?: string | null;
  refreshToken?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(false),
  signOut: () => null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoadingAccessToken, accessToken], setAccessToken] = useStorageState('accessToken');
  const [[isLoadingRefreshToken, refreshToken], setRefreshToken] = useStorageState('refreshToken');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (props: LoginRequest): Promise<boolean> => {
          const loginResult = await AuthRepository.login(props);

          if (loginResult.success) {
            setAccessToken(loginResult.data.accessToken);
            setRefreshToken(loginResult.data.refreshToken);
            return true;
          }
          return false;
        },
        signOut: () => {
          setAccessToken(null);
          setRefreshToken(null);
        },
        accessToken,
        refreshToken,
        isLoading: isLoadingAccessToken && isLoadingRefreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

