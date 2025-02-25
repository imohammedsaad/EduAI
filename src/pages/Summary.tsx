import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Youtube, Loader2, BookOpen, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateVideoSummary } from '@/services/gemini';
import AiAvatar from '@/components/AiAvatar';

interface SummaryPoint {
  heading: string;
  description: string;
  resources: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'course';
  }>;
}

interface SummaryContent {
  title: string;
  points: SummaryPoint[];
}

const Summary = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryContent | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a YouTube URL');
      return;
    }
  
    setLoading(true);
    try {
      console.log('Generating summary for URL:', url);
      const summaryPoints = await generateVideoSummary(url);
      console.log('Generated summary:', summaryPoints);
      setSummary(summaryPoints);
    } catch (error) {
      console.error('Summary generation error:', error);
      if (error instanceof Error) {
        toast.error(`Failed to generate summary: ${error.message}`);
      } else {
        toast.error('Failed to generate summary');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSummaryText = () => {
    if (!summary) return '';
    return `${summary.title}. ${summary.points.map((point, index) => 
      `Point ${index + 1}: ${point.heading}. ${point.description}`
    ).join('. ')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Video Summary Generator</h1>
        <p className="text-gray-400">
          Paste a YouTube video URL to get an AI-generated summary
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
                Processing
              </>
            ) : (
              'Generate Summary'
            )}
          </Button>
        </div>
      </form>

      {summary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">{summary.title}</h2>
          </div>

          {summary.points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700"
            
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 text-lg font-semibold">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-purple-400">{point.heading}</h3>
              </div>

              <div className="ml-11">
                <p className="text-gray-200 mb-6 whitespace-pre-wrap">{point.description}</p>

                {point.resources.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase">Additional Resources</h4>
                    <div className="grid gap-2">
                      {point.resources.map((resource, rIndex) => (
                        <a
                          key={rIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-md bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                        >
                          <LinkIcon className="h-4 w-4 text-purple-400" />
                          <span>{resource.title}</span>
                          <span className="ml-auto text-xs text-gray-400 px-2 py-1 rounded-full bg-gray-700">
                            {resource.type}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <AiAvatar text={getSummaryText()} />
        </motion.div>
      )}
    </div>
  );
};

export default Summary;