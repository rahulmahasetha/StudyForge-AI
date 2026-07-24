const { generateFromGemini } = require('../services/geminiService');
const { generateStudyPrompt } = require('../utils/prompt');
const { studyMaterialSchema } = require('../validators/studySchema');

/**
 * Controller to handle POST /api/generate
 * 
 * Flow:
 * 1. Validate incoming request
 * 2. Generate strict prompt
 * 3. Call Gemini API
 * 4. Sanitize and Parse AI Response
 * 5. Validate JSON against Zod schema
 * 6. Return sanitized JSON to client
 */
const generateStudyMaterial = async (req, res, next) => {
  try {
    const { notes, difficulty = 'Medium' } = req.body;

    // 1. Basic validation
    if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
      const error = new Error('Notes are required and must be a non-empty string.');
      error.statusCode = 400;
      throw error;
    }

    // 2. Generate prompt
    const prompt = generateStudyPrompt(notes, difficulty);

    // 3. Call Gemini & Track Time
    const startTime = performance.now();
    const rawAiResponse = await generateFromGemini(prompt);
    const endTime = performance.now();
    const generationTimeMs = endTime - startTime;

    // 4. Extract and parse JSON
    // The AI might occasionally wrap JSON in markdown (e.g., ```json ... ```) even if told not to.
    let jsonString = rawAiResponse.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```/, '').replace(/```$/, '').trim();
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('[JSON Parse Error]:', parseError);
      console.error('[Raw Output]:', rawAiResponse);
      const error = new Error('Failed to parse AI response into valid JSON. Please try again.');
      error.statusCode = 500;
      throw error;
    }

    // 5. Validate using Zod
    // This is the most crucial step. It ensures we NEVER send malformed data to the React frontend.
    const validationResult = studyMaterialSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error('[Zod Validation Error]:', validationResult.error.format());
      const error = new Error('AI generated malformed data that failed schema validation. Please try again.');
      error.statusCode = 500;
      error.details = validationResult.error.format();
      throw error;
    }

    // 6. Success! Return the strictly typed, validated data + metadata
    res.status(200).json({
      success: true,
      data: validationResult.data,
      metadata: {
        generationTimeMs,
        provider: 'Google Gemini Flash',
        difficulty
      }
    });

  } catch (error) {
    // Pass errors to our global error handler
    next(error);
  }
};

module.exports = { generateStudyMaterial };
