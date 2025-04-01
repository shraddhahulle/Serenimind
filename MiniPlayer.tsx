
import React from 'react';
import { Play, Pause, Volume2, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useMeditation } from '../contexts/MeditationContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const MiniPlayer: React.FC = () => {
  const { 
    isPlaying, 
    currentTrack, 
    currentCategory, 
    volume, 
    progress, 
    duration, 
    togglePlay, 
    stopTrack, 
    setVolume,
    seekTo
  } = useMeditation();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleStop = () => {
    stopTrack();
    toast({
      title: "Meditation stopped",
      description: "Your meditation session has ended.",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 z-50">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          
          <div className="flex flex-col">
            <span className="font-medium text-sm">{currentTrack}</span>
            <span className="text-xs text-gray-500">{currentCategory}</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-center space-x-4 mx-4">
          <span className="text-xs text-gray-500 w-10">{formatTime(progress)}</span>
          <Slider
            value={[progress]}
            max={duration}
            step={0.1}
            className="w-full"
            onValueChange={handleProgressChange}
          />
          <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 w-32">
            <Volume2 size={16} className="text-gray-500" />
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="w-full"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleStop}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
