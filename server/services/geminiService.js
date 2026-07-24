const { GoogleGenAI } = require('@google/genai');

/**
 * Initializes the Gemini API client.
 * Using Gemini 2.5 Flash as requested for fast, cost-effective generation.
 */
const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables.');
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

/**
 * Calls the Gemini API with the generated prompt.
 * 
 * @param {string} prompt - The strict instruction prompt containing the user's notes.
 * @returns {Promise<string>} The raw string response from the AI.
 */
const generateFromGemini = async (prompt) => {
  const ai = getGeminiClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
      config: {
        // We set responseMimeType to application/json to encourage JSON output
        responseMimeType: 'application/json',
      }
    });

    return response.text;
  } catch (error) {
    console.error('[Gemini Service Error]:', error);
    
    // Normalize errors for our error handler
    const customError = new Error('Failed to generate content from AI');
    customError.statusCode = 502; // Bad Gateway (Upstream error)
    customError.details = error.message;
    throw customError;
  }
};

module.exports = { generateFromGemini };
