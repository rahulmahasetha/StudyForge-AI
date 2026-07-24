/**
 * Generates the strict prompt for the Gemini AI.
 * We explicitly instruct the AI to return ONLY valid JSON matching our schema.
 * 
 * @param {string} notes - The study topic or notes provided by the user.
 * @param {string} difficulty - The requested difficulty level (Easy, Medium, Hard).
 * @returns {string} The formatted prompt.
 */
const generateStudyPrompt = (notes, difficulty = 'Medium') => `
You are an educational assistant.
Generate study material from the following notes.
The target difficulty level for the content is: ${difficulty}. Adjust vocabulary and conceptual depth accordingly.

Return ONLY valid JSON.
Do not include markdown.
Do not explain your reasoning.
Use this schema exactly.

{
  "flashcards": [
    {
      "id": 1,
      "question": "",
      "answer": ""
    }
  ],
  "quiz": [
    {
      "id": 1,
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": 0
    }
  ]
}

Generate exactly 5 flashcards.
Generate exactly 5 quiz questions.

Notes:
"""
${notes}
"""
`;

module.exports = { generateStudyPrompt };
