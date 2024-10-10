import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useToast } from "../use-toast";

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setActive, isLoaded, signUp } = useSignUp();
  const router = useRouter();
  const methods = useForm();
  return;
};
