import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Youtube, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateQuizQuestions } from '@/services/gemini';
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const Quiz = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a YouTube URL');
      return;
    }
  
    setLoading(true);
    try {
      console.log('Generating quiz for URL:', url);
      const quizQuestions = await generateQuizQuestions(url);
      console.log('Generated quiz questions:', quizQuestions);
      setQuestions(quizQuestions);
      setShowResults(false);
      setUserAnswers({});
      setShowFeedback({});
    } catch (error) {
      console.error('Quiz generation error:', error);
      if (error instanceof Error) {
        toast.error(`Failed to generate quiz: ${error.message}`);
      } else {
        toast.error('Failed to generate quiz');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
    setShowFeedback(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Interactive Quiz Generator</h1>
        <p className="text-gray-400">
          Generate an AI-powered quiz from any educational YouTube video
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Youtube className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="url"
              placeholder="Enter YouTube URL"
              className="pl-10"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz
              </>
            ) : (
              'Create Quiz'
            )}
          </Button>
        </div>
      </form>

      {questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {questions.map((question, qIndex) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: qIndex * 0.1 }}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700"
            >
              <h3 className="text-xl font-medium mb-4">
                {qIndex + 1}. {question.text}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(question.id, oIndex)}
                    disabled={showFeedback[question.id]}
                    className={`w-full p-3 text-left rounded-md transition-all ${
                      userAnswers[question.id] === oIndex
                        ? question.correctAnswer === oIndex
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-red-500/20 border-red-500'
                        : 'bg-gray-700/50 hover:bg-gray-700/70'
                    } border ${
                      showFeedback[question.id] && question.correctAnswer === oIndex
                        ? 'border-green-500'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback[question.id] && (
                        <>
                          {question.correctAnswer === oIndex && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                          {userAnswers[question.id] === oIndex &&
                            question.correctAnswer !== oIndex && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}

          {Object.keys(userAnswers).length === questions.length && !showResults && (
            <Button
              onClick={() => setShowResults(true)}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              Submit Answers
            </Button>
          )}

          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700 text-center"
            >
              <h3 className="text-2xl font-bold mb-2">
                Your Score: {calculateScore()} / {questions.length}
              </h3>
              <p className="text-gray-400 mb-4">
                {calculateScore() === questions.length
                  ? 'Perfect score! Excellent work! 🎉'
                  : calculateScore() > questions.length / 2
                  ? 'Good job! Keep learning! 👍'
                  : 'Keep practicing! You can do better! 💪'}
              </p>
              <Button
                onClick={handleSubmit}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Try Another Quiz
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;