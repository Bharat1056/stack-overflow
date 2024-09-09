import { create } from "zustand";
import { NavigationQuestionStateSchemaType } from "@/validation/question.validation";

const useQuestionNavigationData = create<NavigationQuestionStateSchemaType>(
  (set) => ({
    questionTitle: "",
    questionDescription: "",
    tags: [],
    totalVotes: 0,
    totalViews: 0,
    authorName: "",
    authorEmail: "",
    setQuestionTitle: (heading) => set({ questionTitle: heading }),
    setQuestionDescription: (description) =>
      set({ questionDescription: description }),
    setTotalVotes: (count) => set({ totalVotes: count }),
    setTotalViews: (count) => set({ totalViews: count }),
    setAuthorName: (name) => set({ authorName: name }),
    setAuthorEmail: (email) => set({ authorEmail: email }),
    setTags: (tags) => set({ tags: tags }),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
  })
);

export default useQuestionNavigationData;
