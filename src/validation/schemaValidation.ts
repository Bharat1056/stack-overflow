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
        message:
          "Password contains one uppercase, lowercase, number and special character",
      }),
  })
  .required();

export type signInSchemaType = z.infer<typeof signInSchema>;

export { signInSchema, signUpSchema };
