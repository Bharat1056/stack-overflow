import { z } from "zod";
import { emailRegex, passwordRegex } from "../constants/constants";

const signUpSchema = z
  .object({
    username: z.string().min(3, { message: "Username must be 2 characters" }),
    email: z
      .string()
      .min(5, { message: "Email must be required" })
      .regex(emailRegex, { message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password contains one uppercase, lowercase, number and special character",
      }),
  })
  .required();

export type signUpSchemaType = z.infer<typeof signUpSchema>;

const signInSchema = z
  .object({
    email: z
      .string()
      .min(5, { message: "Email must be required" })
      .regex(emailRegex, { message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message: "Password contains one uppercase, lowercase, and number",
      }),
  })
  .required();

export type signInSchemaType = z.infer<typeof signInSchema>;

const passwordUpdateScema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message: "Password contains one uppercase, lowercase, and number ",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message: "Password contains one uppercase, lowercase, and number ",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type passwordUpdateScemaType = z.infer<typeof passwordUpdateScema>;

const emailSentSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be required" })
    .regex(emailRegex, { message: "Please enter a valid email address" }),
});

export type emailSentSchemaType = z.infer<typeof emailSentSchema>;

export { signInSchema, signUpSchema, passwordUpdateScema, emailSentSchema };
