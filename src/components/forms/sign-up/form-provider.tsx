"use client";

import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { FormProvider } from "react-hook-form";
import { Loader } from "@/components/loader";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function SignupFormProvider({ children }: Props) {
  const { methods, loading, onHandleSubmit } = useSignUpForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        {children}
        <form onSubmit={onHandleSubmit}>
          <div className="flex h-full flex-col justify-between gap-3">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
}

export default SignupFormProvider;
