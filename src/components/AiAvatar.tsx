import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RobotModel from './RobotModel';

interface AiAvatarProps {
  text: string;
}

const AiAvatar = ({ text }: AiAvatarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [speed, setSpeed] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentPositionRef = useRef<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 3);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.onboundary = (event) => {
        currentPositionRef.current = event.charIndex;
      };
    }
  }, [utteranceRef.current]);

  const speak = (e?: React.MouseEvent) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utteranceRef.current = utterance;
      
      utterance.text = text;
      utterance.rate = speed;
      utterance.pitch = 1;
      utterance.onend = () => {
        setIsPlaying(false);
        setAnimationFrame(0);
        currentPositionRef.current = 0;
      };

      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const toggleSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    
    setSpeed(nextSpeed);
    
    if (isPlaying) {
      const currentPosition = currentPositionRef.current;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(currentPosition));
      utteranceRef.current = utterance;
      utterance.rate = nextSpeed;
      utterance.pitch = 1;
      utterance.onend = () => {
        setIsPlaying(false);
        setAnimationFrame(0);
        currentPositionRef.current = 0;
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      currentPositionRef.current = 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 flex flex-col items-center gap-4"
    >
      <div className="relative">
        <RobotModel isPlaying={isPlaying} />
      </div>

      <div className="flex gap-2 p-2 rounded-full bg-gray-800/50 backdrop-blur-lg border border-gray-700">
        <Button
          onClick={speak}
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-gray-700/50 rounded-full"
          disabled={isMuted}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-purple-400" />
          ) : (
            <Play className="h-4 w-4 text-purple-400" />
          )}
        </Button>
        <Button
          onClick={toggleSpeed}
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-gray-700/50 rounded-full relative group"
        >
          <FastForward className="h-4 w-4 text-purple-400" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {speed}x
          </span>
        </Button>
        <Button
          onClick={toggleMute}
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-gray-700/50 rounded-full"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-red-400" />
          ) : (
            <Volume2 className="h-4 w-4 text-purple-400" />
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default AiAvatar; 