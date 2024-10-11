import { emailRegex } from '@/constants/constants';
import { any, z } from 'zod';
import { User, Session, AuthError } from '@supabase/supabase-js';
// import { Session } from 'inspector';

const SessionSchema = z.object({
  // Define the expected properties of a Session object based on Supabase's Session type
  // Example:
  access_token: z.string(),
  user: z.object({})
});

const AuthErrorSchema = z.object({
  // Define the expected properties of an AuthError object based on Supabase's AuthError type
  message: z.string(),
  status: z.number().optional(),
});

const userStateSchema = z.object({
  username: z.string(),
  password: z.string(),
  isVerified: z.boolean(),
  tags: z.array(z.string()),
  views: z.number(),
  linkedIn: z.string().url(),
  email: z.string().min(5, { message: "Email must be required" }).regex(emailRegex, { message: "Please enter a valid email address" }),
  PersonalWebsite: z.string().url(),
  twitter: z.string().url(),
  session: z.union([z.string(), SessionSchema]),
  hydrated: z.boolean(),

  setHydrated: z.function().returns(z.void()),

  verifySession: z.function().args(z.object({
    access_token: z.string(),
    user: z.object({})
  })).returns(z.promise(z.void())),

  login: z.function().args(
    z.object({ username: z.string(), password: z.string() })
  ).returns(
    z.promise(
      z.object({
        success: z.boolean(),
        error: z.union([z.boolean(), z.number().optional(), AuthErrorSchema.optional()]).optional(),
      })
    )
  ),

  createAccount: z.function().args(
    z.object({
      username: z.string(),
      password: z.string(),
      email: z.string()
    })
  ).returns(
    z.promise(
      z.object({
        success: z.boolean(),
        error: z.union([z.boolean(), z.number().optional(), AuthErrorSchema.optional()]).optional(),
      })
    )
  ),

  logout: z.function().returns(z.promise(z.void())),
});


export type UserStateSchemaType = z.infer<typeof userStateSchema>;
export type sessionStateSchemaType = z.infer<typeof SessionSchema>;

export default { userStateSchema, SessionSchema };


const updateUserProfileSchema = z.object({

});
export type updateQuestionSchemaType = z.infer<typeof updateUserProfileSchema>;
export { updateUserProfileSchema }