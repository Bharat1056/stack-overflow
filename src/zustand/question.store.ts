import { create } from 'zustand'
import { QuestionStateSchemaType } from '@/validation/question.validation';

const useQuestion = create<QuestionStateSchemaType>((set) => ({
    question_title: '',
    question_description: '',
    tags: [],
    votes: 0,
    answers: 0,
    views: 0,
    setQuestionTitle: (heading) => set({ question_title: heading }),
    setQuestionDescription: (description) => set({ question_description: description }),
    setTags: (newTags) => set({ tags: newTags }),
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    incrementVotes: () => set((state) => ({ votes: state.votes + 1 })),
    decrementVotes: () => set((state) => ({ votes: state.votes - 1 })),
    setAnswers: (count) => set({ answers: count }),
    setViews: (count) => set({ views: count }),
}))

export default useQuestion;