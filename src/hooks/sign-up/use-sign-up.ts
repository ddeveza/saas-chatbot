"use client";

import {
  UserRegistrationSchema,
  UserRegistrationProps,
} from "@/schemas/auth.schema";
import { onCompleteUserRegistration } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useToast } from "../use-toast";

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    mode: "onChange",
    defaultValues: {
      type: "owner",
    },
    resolver: zodResolver(UserRegistrationSchema),
  });

  const onGenerateOtp = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        password: password,
        emailAddress: email,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      onNext((prev) => prev + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors[0].longMessage,
      });
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;
      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });
        if (completeSignUp.status !== "complete") {
          return { message: "Something went wrong" };
        }

        if (completeSignUp.status === "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.type,
          );
          if (registered?.status === 200 && registered?.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });
            setLoading(false);
            router.push("/dashboard");
          }

          if (registered?.status === 400) {
            toast({
              title: "Error",
              description: "Something went wrong",
            });
          }
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.errors[0].lonMmessage,
        });
      }
    },
  );

  return {
    methods,
    loading,
    onGenerateOtp,
    onHandleSubmit,
  };
};
