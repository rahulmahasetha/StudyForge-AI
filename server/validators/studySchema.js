const { z } = require('zod');

/**
 * Zod schema for validating the AI response.
 * This guarantees the frontend only receives the exact shape it expects.
 */
const flashcardSchema = z.object({
  id: z.number(),
  question: z.string().min(1, 'Question cannot be empty'),
  answer: z.string().min(1, 'Answer cannot be empty'),
});

const quizSchema = z.object({
  id: z.number(),
  question: z.string().min(1, 'Question cannot be empty'),
  options: z.array(z.string()).length(4, 'Quiz must have exactly 4 options'),
  correctAnswer: z.number().min(0).max(3, 'Correct answer must be an index between 0 and 3'),
});

const studyMaterialSchema = z.object({
  flashcards: z.array(flashcardSchema).length(5, 'Must generate exactly 5 flashcards'),
  quiz: z.array(quizSchema).length(5, 'Must generate exactly 5 quiz questions'),
});

module.exports = {
  studyMaterialSchema,
};
