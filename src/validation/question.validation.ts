import { z } from 'zod';

const QuestionStateSchema = z.object({
  question_title: z.string(),
  question_description: z.string(),
  tags: z.array(z.string()),
  votes: z.number(),
  answers: z.number(),
  views: z.number(),
  setQuestionTitle: z.function().args(z.string()).returns(z.void()),
  setQuestionDescription: z.function().args(z.string()).returns(z.void()),
  setTags: z.function().args(z.array(z.string())).returns(z.void()),
  addTag: z.function().args(z.string()).returns(z.void()),
  removeTag: z.function().args(z.string()).returns(z.void()),
  incrementVotes: z.function().returns(z.void()),
  decrementVotes: z.function().returns(z.void()),
  setAnswers: z.function().args(z.number()).returns(z.void()),
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
