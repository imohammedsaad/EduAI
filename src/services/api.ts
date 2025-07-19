import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SummaryResponse {
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
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface RoadmapSection {
  title: string;
  description: string;
  videos: Array<{
    title: string;
    timestamp: string;
    duration: string;
    completed: boolean;
  }>
}

export const generateVideoSummary = async (videoUrl: string): Promise<SummaryResponse> => {
  try {
    const { data } = await api.post('/api/summary', { videoUrl });
    return data;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

export const generateQuizQuestions = async (videoUrl: string): Promise<QuizQuestion[]> => {
  try {
    const { data } = await api.post('/api/quiz', { videoUrl });
    return data;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

export const generateRoadmap = async (videoUrl: string): Promise<RoadmapSection[]> => {
  try {
    const { data } = await api.post('/api/roadmap', { videoUrl });
    return data;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};