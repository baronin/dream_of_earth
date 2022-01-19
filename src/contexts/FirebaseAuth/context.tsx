import React, { ReactNode, useContext, useEffect, useState } from "react";

import { auth } from "../../api/firebase";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();
  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
