import SignupFormProvider from "@/components/forms/sign-up/form-provider";
import React from "react";

type Props = {};

function Signup({}: Props) {
  return (
    <div className="debug-green w-full flex-1 py-36 md:px-16">
      <div className="flex h-full flex-col gap-3">
        <SignupFormProvider>Test</SignupFormProvider>
      </div>
    </div>
  );
}

export default Signup;
