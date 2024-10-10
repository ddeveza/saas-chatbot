import { ZodType, z } from "zod";

export type UserRegistrationProps = {
  otp: string;
  type: string;
  email: string;
  password: string;
  fullname: string;
  confirmEmail: string;
  confirmPassword: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    confirmPassword: z.string(),
    confirmEmail: z.string().email(),
    email: z.string().email({ message: "Incorrect email format" }),
    otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
    fullname: z
      .string()
      .min(4, { message: "your full name must be atleast 4 characters long" }),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers",
      ),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords do not match",
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    path: ["confirmEmail"],
    message: "Your emails not match",
  });
