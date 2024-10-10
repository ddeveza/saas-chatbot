import { AuthContextProvider } from "@/context/use-auth-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function SignupFormProvider({ children }: Props) {
  return (
    <AuthContextProvider>
      <FormProvider></FormProvider>
    </AuthContextProvider>
  );
}

export default SignupFormProvider;
