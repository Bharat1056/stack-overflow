import { z } from 'zod';

const QuestionStateSchema = z.object({
  question_title: z.string(),
  question_description: z.string(),
  tags: z.array(z.string()),
  votes: z.number(),
  answers: z.array(z.string()),
  views: z.number(),
  setQuestionTitle: z.function().args(z.string()).returns(z.void()),
  setQuestionDescription: z.function().args(z.string()).returns(z.void()),
  setTags: z.function().args(z.array(z.string())).returns(z.void()),
  addTag: z.function().args(z.string()).returns(z.void()),
  removeTag: z.function().args(z.string()).returns(z.void()),
  incrementVotes: z.function().returns(z.void()),
  decrementVotes: z.function().returns(z.void()),
  setAnswers: z.function().args(z.string()).returns(z.void()),
  setViews: z.function().args(z.number()).returns(z.void())
});

export type QuestionStateSchemaType = z.infer<typeof QuestionStateSchema>;

export default QuestionStateSchema;

const publishQuestionSchema = z.object({
  question_title: z.string(),
  question_description: z.string(),
  tags: z.array(z.string()),
  user_id: z.string().uuid(),
});

export type publishQuestionSchemaType = z.infer<typeof publishQuestionSchema>;
export  { publishQuestionSchema }

const updateQuestionSchema = z.object({
  question_title: z.string(),
  question_description: z.string(),
  tags: z.array(z.string()),
});
export type updateQuestionSchemaType = z.infer<typeof updateQuestionSchema>;
export  { updateQuestionSchema }

const NavigationQuestionStateSchema = z.object({
  questionTitle: z.string(),
  questionDescription: z.string(),
  tags: z.array(z.string()),
  totalVotes: z.number(),
  totalViews: z.number(),
  authorName: z.string(),
  authorEmail: z.string(),
  setQuestionTitle: z.function().args(z.string()).returns(z.void()),
  setQuestionDescription: z.function().args(z.string()).returns(z.void()),
  setTotalVotes: z.function().args(z.number()).returns(z.void()),
  setTotalViews: z.function().args(z.number()).returns(z.void()),
  setAuthorName: z.function().args(z.string()).returns(z.void()),
  setAuthorEmail: z.function().args(z.string()).returns(z.void()),
  setTags: z.function().args(z.array(z.string())).returns(z.void()),
  addTag: z.function().args(z.string()).returns(z.void()),
  removeTag: z.function().args(z.string()).returns(z.void()),
});

export type NavigationQuestionStateSchemaType = z.infer<typeof NavigationQuestionStateSchema>;
export { NavigationQuestionStateSchema }
