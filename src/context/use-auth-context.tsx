"use client";
import { createContext, useContext, useState } from "react";

type InitialValuesProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const initialValues: InitialValuesProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const AuthContext = createContext(initialValues);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    initialValues.currentStep,
  );
  const value = {
    currentStep,
    setCurrentStep,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
