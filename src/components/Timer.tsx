import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Settings, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Timer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('25');
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setShowNotification(true);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(parseInt(customMinutes) * 60);
    setShowNotification(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && parseInt(value) <= 120) {
      setCustomMinutes(value);
    }
  };

  const applyCustomTime = () => {
    const minutes = parseInt(customMinutes) || 25;
    setTime(minutes * 60);
    setShowSettings(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setShowSettings(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg bg-gray-800/50 backdrop-blur-lg border border-gray-700 text-center ${
        isMinimized ? 'w-auto' : 'w-48'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold">Focus Timer</h3>
        <div className="flex gap-2">
          <Button
            onClick={toggleMinimize}
            variant="ghost"
            className="h-9 w-9 p-0 hover:bg-gray-700/50"
          >
            {isMinimized ? (
              <Maximize2 className="h-5 w-5" />
            ) : (
              <Minimize2 className="h-5 w-5" />
            )}
          </Button>
          {!isMinimized && (
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              className="h-9 w-9 p-0 hover:bg-gray-700/50"
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {!isMinimized && showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4"
        >
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              max="120"
              value={customMinutes}
              onChange={handleTimeChange}
              className="w-20"
            />
            <Button onClick={applyCustomTime} className="bg-purple-500 hover:bg-purple-600">
              Set
            </Button>
          </div>
        </motion.div>
      )}

      <div className="text-2xl font-mono mb-3 text-purple-400">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {!isMinimized && (
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleTimer}
            className="bg-purple-500 hover:bg-purple-600 h-8 w-8 p-0"
          >
            {isActive ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={resetTimer}
            className="bg-gray-700 hover:bg-gray-600 h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!isMinimized && showNotification && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-green-400"
        >
          Time's up! Take a break.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Timer; 