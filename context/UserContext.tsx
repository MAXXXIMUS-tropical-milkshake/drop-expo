import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { SignupRequest } from "@/repositories/AuthRepository";

const UserContext = createContext<{
  user: SignupRequest | null;
  setUser: (user: SignupRequest | null) => void;
}>({
  user: null,
  setUser: () => null,
});

export function useUserContext() {
  const value = useContext(UserContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SignupRequest | null>(null);
  const [validationDetails, setValidationDetails] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
