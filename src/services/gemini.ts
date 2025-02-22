import { GoogleGenerativeAI } from '@google/generative-ai';
import { getVideoDetails } from './youtube';
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateVideoSummary(videoUrl: string): Promise<{
  title: string;
  points: Array<{
    heading: string;
    description: string;
    resources: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'course'
    }>
  }>
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const videoDetails = await getVideoDetails(videoUrl);
  
  const prompt = `Create a comprehensive educational summary of this YouTube video:

  Title: ${videoDetails.title}
  Channel: ${videoDetails.channelTitle}
  Description: ${videoDetails.description}

  Format your response as a valid JSON object with this exact structure:
  {
    "title": "Main topic of the video",
    "points": [
      {
        "heading": "Key point as a clear heading",
        "description": "Detailed explanation with examples and key takeaways",
        "resources": [
          {
            "title": "Resource name",
            "url": "URL to learn more",
            "type": "article|video|course"
          }
        ]
      }
    ]
  }

  Guidelines:
  - Include exactly 10 main points covering all aspects of the video
  - Each description should be 4-5 paragraphs with clear examples
  - Include 2-3 relevant learning resources per point
  - Resources should be from reputable educational sites
  - Focus on practical understanding and applications
  - Make sure points flow logically from basic to advanced concepts`;

  try {
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    try {
      const cleanedText = text
        .replace(/^```json\s*/, '')
        .replace(/```$/, '')
        .trim();
      
      const parsed = JSON.parse(cleanedText);
      
      // Update validation to check for 10 points
      if (!parsed.title || !Array.isArray(parsed.points) || parsed.points.length !== 10) {
        throw new Error('Invalid response structure - expected 10 points');
      }
      
      return parsed;
    } catch (parseError) {
      console.error('Failed to parse response:', text);
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export async function generateQuizQuestions(videoUrl: string): Promise<{
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const videoDetails = await getVideoDetails(videoUrl);
  
  const prompt = `Create an educational quiz based on this YouTube video:
  
  Title: ${videoDetails.title}
  Channel: ${videoDetails.channelTitle}
  Description: ${videoDetails.description}

  Create 10 multiple-choice questions that test understanding of the key concepts.
  Format your response as a valid JSON array exactly like this example:
  [
    {
      "id": 1,
      "text": "Question text here?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": 0
    }
  ]

  Guidelines:
  - Create exactly 10 questions
  - Each question should have 4 options
  - Make questions progressively more challenging
  - Include a mix of concept understanding and application questions
  - Ensure correctAnswer is the index (0-3) of the correct option
  - Make all options plausible but only one correct
  - Do not include any additional text or formatting in the response`;

  try {
    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    const response = await result.response;
    const text = response.text().trim();
    console.log('Raw quiz response:', text);
    
    try {
      const cleanedText = text
        .replace(/^```json\s*/, '')
        .replace(/```$/, '')
        .trim();
      
      console.log('Cleaned quiz text:', cleanedText);
      const parsed = JSON.parse(cleanedText);
      
      if (!Array.isArray(parsed)) {
        throw new Error('Response is not an array');
      }

      if (parsed.length !== 10) {
        throw new Error(`Expected 10 questions, got ${parsed.length}`);
      }

      // Validate each question's structure
      parsed.forEach((question, index) => {
        if (!question.id || !question.text || !Array.isArray(question.options) || 
            question.options.length !== 4 || typeof question.correctAnswer !== 'number' ||
            question.correctAnswer < 0 || question.correctAnswer > 3) {
          throw new Error(`Invalid question structure at index ${index}`);
        }
      });

      return parsed;
    } catch (parseError: unknown) {
        console.error('Failed to parse quiz response:', parseError);
        const errorMessage = parseError instanceof Error ? parseError.message : 'Invalid JSON format';
        throw new Error(`Failed to parse quiz response: ${errorMessage}`);
      }
    } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}

export const generateRoadmap = async (url: string) => {
  // TODO: Implement actual roadmap generation
  return [
    {
      title: "Getting Started",
      description: "Introduction to the basics",
      videos: [
        {
          title: "Introduction",
          timestamp: "0:00",
          duration: "5:30",
          completed: false
        }
      ]
    }
  ];
}; 