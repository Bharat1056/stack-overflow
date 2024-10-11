import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { NavigationQuestionStateSchemaType } from "@/validation/question.validation";

const useQuestionNavigationData = create<NavigationQuestionStateSchemaType>()(
  devtools(
    persist(
      (set) => ({
        questionTitle: "",
        questionDescription: "",
        tags: [] as string[],
        totalVotes: 0,
        totalViews: 0,
        authorName: "",
        authorEmail: "",
        setQuestionTitle: (heading: string) => set({ questionTitle: heading }),
        setQuestionDescription: (description: string) =>
          set({ questionDescription: description }),
        setTotalVotes: (count: number) => set({ totalVotes: count }),
        setTotalViews: (count: number) => set({ totalViews: count }),
        setAuthorName: (name: string) => set({ authorName: name }),
        setAuthorEmail: (email: string) => set({ authorEmail: email }),
        setTags: (tags: string[]) => set({ tags }),
        addTag: (tag: string) =>
          set((state) => ({ tags: [...state.tags, tag] })),
        removeTag: (tag: string) =>
          set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
      }),
      { name: "question-navigation-data" }
    )
  )
);

export default useQuestionNavigationData;
