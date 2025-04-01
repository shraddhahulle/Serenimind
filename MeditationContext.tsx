
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface MeditationContextProps {
  isPlaying: boolean;
  currentTrack: string | null;
  currentCategory: string | null;
  volume: number;
  progress: number;
  duration: number;
  togglePlay: () => void;
  playTrack: (track: string, category: string, audioUrl: string) => void;
  stopTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  audioUrl: string | null;
}

const MeditationContext = createContext<MeditationContextProps | undefined>(undefined);

export const MeditationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      });
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          console.log("Audio loaded, duration:", audioRef.current.duration);
        }
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        toast({
          title: "Track Ended",
          description: "Your meditation track has finished playing."
        });
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        toast({
          title: "Audio Error",
          description: "There was an error playing the audio. Please try again.",
          variant: "destructive"
        });
      });

      audioRef.current.crossOrigin = "anonymous";
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      console.log("Volume set to:", volume);
    }
  }, [volume]);
  
  const togglePlay = () => {
    if (audioRef.current && audioUrl) {
      console.log("Toggle play, current state:", isPlaying);
      if (isPlaying) {
        audioRef.current.pause();
        toast({
          title: "Paused",
          description: `${currentTrack} has been paused.`
        });
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio started playing successfully");
            })
            .catch(error => {
              console.error("Error playing audio:", error);
              toast({
                title: "Playback Error",
                description: "Unable to play this track. Please try again.",
                variant: "destructive"
              });
            });
        }
        toast({
          title: "Playing",
          description: `Now playing ${currentTrack} from ${currentCategory}.`
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("Cannot toggle play: audio element or URL not available");
    }
  };
  
  const playTrack = (track: string, category: string, url: string) => {
    console.log("Playing track:", track, "URL:", url);
    if (audioRef.current) {
      if (currentTrack === track && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        toast({
          title: "Paused",
          description: `${track} has been paused.`
        });
        return;
      }
      
      setCurrentTrack(track);
      setCurrentCategory(category);
      setAudioUrl(url);
      
      audioRef.current.src = url;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Audio started playing successfully");
            toast({
              title: "Now Playing",
              description: `Playing ${track} from ${category}.`
            });
          })
          .catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
            toast({
              title: "Playback Error",
              description: "Unable to play this track. Please try again.",
              variant: "destructive"
            });
          });
      }
    } else {
      console.error("Audio element not initialized");
    }
  };
  
  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      toast({
        title: "Stopped",
        description: "Meditation track has been stopped."
      });
    }
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current && !isNaN(time)) {
      audioRef.current.currentTime = time;
      setProgress(time);
      console.log("Seeking to:", time);
    }
  };
  
  return (
    <MeditationContext.Provider 
      value={{
        isPlaying,
        currentTrack,
        currentCategory,
        volume,
        progress,
        duration,
        togglePlay,
        playTrack,
        stopTrack,
        setVolume,
        seekTo,
        audioUrl,
      }}
    >
      {children}
    </MeditationContext.Provider>
  );
};

export const useMeditation = () => {
  const context = useContext(MeditationContext);
  if (context === undefined) {
    throw new Error('useMeditation must be used within a MeditationProvider');
  }
  return context;
};
