import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { SignupRequest } from '@/repositories/AuthRepository';
import { ValidationDetails } from '@/repositories/Response';


const UserContext = createContext<{
  user: SignupRequest | null;
  setUser: (user: SignupRequest | null) => void;
  validationDetails: ValidationDetails | null;
  setValidationDetails: (validationDetails: ValidationDetails | null) => void;
}>({
  user: null,
  setUser: () => null,
  validationDetails: null,
  setValidationDetails: () => null,
});

export function useUserContext() {
  const value = useContext(UserContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SignupRequest | null>(null);
  const [validationDetails, setValidationDetails] = useState<any>(null);

  return (
    <UserContext.Provider
      value={{user, setUser, validationDetails, setValidationDetails}}>
      {children}
    </UserContext.Provider>
  );
}

