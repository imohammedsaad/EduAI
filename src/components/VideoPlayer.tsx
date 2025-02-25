import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string;
  onClose: () => void;
}

const VideoPlayer = ({ videoId, onClose }: VideoPlayerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <div className="relative w-full max-w-4xl">
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-12 right-0 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="relative pb-[56.25%]">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="absolute inset-0 h-full w-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer; 