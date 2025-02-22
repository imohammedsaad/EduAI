import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Youtube, Loader2, Clock, Play, CheckCircle, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPlaylistVideos } from '@/services/youtube';
import VideoPlayer from '@/components/VideoPlayer';

interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  position: number;
}

const Roadmap = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<PlaylistItem[]>([]);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error('Please enter a YouTube playlist URL');
      return;
    }

    setLoading(true);
    try {
      const playlistVideos = await getPlaylistVideos(url);
      setVideos(playlistVideos);
    } catch (error) {
      toast.error('Failed to fetch playlist data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVideoComplete = (videoId: string) => {
    setCompletedVideos(prev => {
      const updated = new Set(prev);
      if (updated.has(videoId)) {
        updated.delete(videoId);
      } else {
        updated.add(videoId);
      }
      return updated;
    });
  };

  const progress = videos.length > 0 
    ? Math.round((completedVideos.size / videos.length) * 100) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Learning Roadmap</h1>
        <p className="text-gray-400">
          Generate an interactive roadmap from any YouTube playlist
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Youtube className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="url"
              placeholder="Enter YouTube Playlist URL"
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
                Loading Playlist
              </>
            ) : (
              'Create Roadmap'
            )}
          </Button>
        </div>
      </form>

      {videos.length > 0 && (
        <div className="flex gap-8">
          {/* Left side: Video list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 space-y-4"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  completedVideos.has(video.id)
                    ? 'bg-purple-500/10 border-purple-500/50'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className="flex gap-4">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-48 rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVideoComplete(video.id)}
                        className={`${
                          completedVideos.has(video.id)
                            ? 'text-purple-400'
                            : 'text-gray-400'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {video.duration}
                      </span>
                      <Button
  variant="ghost"
  size="sm"
  onClick={() => setActiveVideoId(video.id)}
  className="flex items-center text-purple-400 hover:text-purple-300"
>
  <Play className="h-4 w-4 mr-1" />
  Play Video
</Button>

                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side: Progress tracking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 h-fit sticky top-24"
          >
            <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Progress Tracker</h2>
              
              {/* Circular progress indicator */}
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-700 stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-purple-500 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    strokeDasharray={`${progress * 2.827}, 282.7`}
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    className="text-2xl font-bold"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="currentColor"
                  >
                    {progress}%
                  </text>
                </svg>
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-400">
                  {completedVideos.size} of {videos.length} videos completed
                </p>
              </div>

              {/* Video completion stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span className="text-purple-400">{completedVideos.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span className="text-gray-400">
                    {videos.length - completedVideos.size}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Videos</span>
                  <span>{videos.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {activeVideoId && (
  <VideoPlayer
    videoId={activeVideoId}
    onClose={() => setActiveVideoId(null)}
  />
)}
    </div>
  );
};

export default Roadmap;