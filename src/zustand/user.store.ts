import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { UserStateSchemaType } from '@/validation/user.validation'
import { Html } from 'next/document'
import { object, z } from 'zod'
import { useToast } from '@/components/ui/use-toast'

// type UserStateSchemaType = z.infer<typeof UserStateSchema>;


const useUserStore = create<UserStateSchemaType>()(
    devtools(
        persist(
            immer((set) => ({
                username: '',
                password: '',
                isVerified: false,
                tags: [],
                views: 0,
                linkedIn: '',
                email: '',
                PersonalWebsite: '',
                twitter: '',
                session: {
                    access_token: '',
                    user: {},
                },
                hydrated: false,

                setHydrated: () => set({ hydrated: true }),
                verifySession: async (sessionData: { access_token: string, user: any }) => {
                    const { toast } = useToast()
                    try {
                        const { access_token, user } = sessionData;

                        // sessionStateSchemaType.parse(sessionData);

                        set((state) => ({
                            ...state,
                            session: {
                                access_token: access_token,
                                user: { ...user },
                            }

                        }))

                        toast({
                            variant: 'default',
                            description: 'session state updated successfully'
                        })
                    } catch (error) {
                        console.log(error);
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: "Session state is not updated",
                        })

                    }
                },


                login: async (credentials: { username: string, password: string }) => {

                    const { toast } = useToast()
                    try {
                        const { username, password } = credentials;
                        set({ username: username, password: password, isVerified: true })

                        if (!username || !password) {
                            toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong",
                                description: "login state is not updated"
                            })
                            return {
                                success: false,
                                error: {
                                    message: "Failed to update login state",
                                    status: 401
                                }
                            }
                        }

                        toast({
                            variant: 'default',
                            description: 'login state updated successfully'
                        })
                        return {
                            success: true,
                            error: false
                        }
                    } catch (error: any) {
                        console.log(error);
                        toast({
                            variant: "destructive",
                            description: "There is something went wrong!!"
                        })

                        return {
                            success: false,
                            error: {
                                message: error.message || "Unwanted error",
                                status: 500
                            }
                        }
                    }
                },

                createAccount: async (accountData: { username: string, password: string, email: string }) => {
                    const { toast } = useToast();
                    try {
                        // Implement create account logic here
                        const { username, password, email } = accountData;

                        set({ username: username, password: password, email: email, isVerified: true })

                        if (!email || !password) {
                            toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong",
                                description: "login state is not updated"
                            })
                            return {
                                success: false,
                                error: {
                                    message: "Failed to update createAccount state",
                                    status: 401
                                }
                            }
                        }

                        toast({
                            variant: 'default',
                            description: 'createAccount state updated successfully'
                        })
                        return {
                            success: true,
                            error: false,
                        }
                    } catch (error: any) {
                        console.log(error);
                        toast({
                            variant: "destructive",
                            description: "Something went wrong!!"
                        })

                        return {
                            success: false,
                            error: {
                                message: error.message || "Unwanted error occured",
                                status: 500
                            }
                        }
                    }
                },

                logout: async () => {
                    const { toast } = useToast()
                    try {
                        set((state) => ({
                            ...state,
                            session: {
                                access_token: '',
                                user: {}
                            },
                            username: '',
                            email: '',
                            password: '',
                            isVerified: false
                        }));

                        toast({
                            variant: "default",
                            description: "Logout state updated successfully"
                        })
                    } catch (error) {
                        console.log(error);
                        toast({
                            variant: "destructive",
                            description: "Something went wrong!!"
                        })
                    }
                },

            })), {
            name: 'userStore',
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.setHydrated()
                }
            }
        }
        )
    )
);

export { useUserStore };
