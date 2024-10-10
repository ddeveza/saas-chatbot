import { createContext, useContext } from "react";

type InitialValuesProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
};

const AuthContext = createContext();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
