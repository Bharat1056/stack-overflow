import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { QuestionStateSchemaType } from '@/validation/question.validation';

const useQuestionStore = create<QuestionStateSchemaType>()(
    devtools(
        persist(
            immer(
                (set, get) => ({
            question_title: '',
            question_description: '',
            tags: [],
            votes: 0,
            answers: [],
            views: 0,
            setQuestionTitle: (heading) => set({ question_title: heading }),
            setQuestionDescription: (description) => set({ question_description: description }),
            setTags: (newTags) => set({ tags: newTags }),
            addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
            removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t : any) => t !== tag) })),
            incrementVotes: () => set((state) => ({ votes: state.votes + 1 })),
            decrementVotes: () => set((state) => ({ votes: state.votes - 1 })),
            setAnswers: (answer) => set((state) => ({answers : [...state.answers , answer]})),
            setViews: (count) => set((state) => ({views: state.views + 1})),
        })),
            { name: 'questions' }
        )
    )
);


export { useQuestionStore};