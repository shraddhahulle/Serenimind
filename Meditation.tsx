import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pause, Youtube, ExternalLink } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useMeditation } from '../contexts/MeditationContext';
import { toast } from '@/hooks/use-toast';

interface MeditationTrack {
  id: string;
  title: string;
  duration: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  youtubeUrl?: string;
}

const meditationCategories = [
  {
    id: 'stress-relief',
    title: 'Stress Relief',
    tracks: [
      {
        id: 'calm-mind',
        title: 'Calm Mind Meditation',
        duration: '10 min',
        description: 'A gentle meditation to help release stress and find inner calm.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_9bba74c53e.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
        youtubeUrl: 'https://www.youtube.com/embed/O-6f5wQXSu8'
      },
      {
        id: 'peaceful-presence',
        title: 'Peaceful Presence',
        duration: '15 min',
        description: 'Center yourself and find peace in the present moment.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_f1b4f4c49a.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
        youtubeUrl: 'https://www.youtube.com/embed/inpok4MKVLM'
      },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep',
    tracks: [
      {
        id: 'deep-sleep',
        title: 'Deep Sleep Journey',
        duration: '30 min',
        description: 'Drift into a peaceful sleep with this calming meditation.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_88297c6329.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
        youtubeUrl: 'https://www.youtube.com/embed/EEF_oa3MIR0'
      },
      {
        id: 'bedtime-relaxation',
        title: 'Bedtime Relaxation',
        duration: '20 min',
        description: 'Release tension and prepare your body and mind for sleep.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_d292bf4159.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
        youtubeUrl: 'https://www.youtube.com/embed/acLUWBuAvms'
      },
    ],
  },
  {
    id: 'focus',
    title: 'Focus',
    tracks: [
      {
        id: 'clear-focus',
        title: 'Clear Focus',
        duration: '12 min',
        description: 'Sharpen your concentration and mental clarity.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/08/audio_58c5d11c53.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
        youtubeUrl: 'https://www.youtube.com/embed/wruCWicGBA4'
      },
    ],
  },
  {
    id: 'anxiety',
    title: 'Anxiety',
    tracks: [
      {
        id: 'anxiety-relief',
        title: 'Anxiety Relief',
        duration: '15 min',
        description: 'Soothe anxiety and find a sense of calm and safety.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/23/audio_00cb9abb66.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        youtubeUrl: 'https://www.youtube.com/embed/lVx3mFxML80'
      },
    ],
  },
  {
    id: 'breathing',
    title: 'Breathing Exercises',
    tracks: [
      {
        id: 'box-breathing',
        title: 'Box Breathing',
        duration: '5 min',
        description: 'A simple breathing technique to reduce stress and improve focus.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/13/audio_afda966720.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        youtubeUrl: 'https://www.youtube.com/embed/tEmt1Znux58'
      },
      {
        id: '4-7-8-breathing',
        title: '4-7-8 Breathing',
        duration: '8 min',
        description: 'A breathing pattern that promotes relaxation and sleep.',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1c20c2779a.mp3',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        youtubeUrl: 'https://www.youtube.com/embed/YRPh_GaiL8s'
      },
    ],
  },
];

const Meditation = () => {
  const { playTrack, isPlaying, currentTrack, togglePlay } = useMeditation();
  const [selectedCategory, setSelectedCategory] = useState(meditationCategories[0].id);
  const [breathingState, setBreathingState] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [showYoutube, setShowYoutube] = useState<{id: string, url: string} | null>(null);
  const breathingTimerRef = useRef<number | null>(null);
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  const openYoutubeVideo = (track: MeditationTrack) => {
    if (track.youtubeUrl) {
      setShowYoutube({id: track.id, url: track.youtubeUrl});
      toast({
        title: "YouTube Video",
        description: `Opening ${track.title} meditation video.`,
      });
    }
  };
  
  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    runBreathingCycle();
    toast({
      title: "Breathing Exercise Started",
      description: "Follow the prompts for a guided breathing session.",
    });
  };
  
  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    if (breathingTimerRef.current) {
      window.clearTimeout(breathingTimerRef.current);
    }
    toast({
      title: "Breathing Exercise Stopped",
      description: "You've completed your breathing exercise.",
    });
  };
  
  const runBreathingCycle = () => {
    setBreathingState('inhale');
    
    breathingTimerRef.current = window.setTimeout(() => {
      setBreathingState('hold');
      
      breathingTimerRef.current = window.setTimeout(() => {
        setBreathingState('exhale');
        
        breathingTimerRef.current = window.setTimeout(() => {
          setBreathingState('rest');
          
          breathingTimerRef.current = window.setTimeout(() => {
            if (isBreathingActive) {
              runBreathingCycle();
            }
          }, 1000); // Rest
        }, 4000); // Exhale
      }, 7000); // Hold
    }, 4000); // Inhale
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Guided Meditation</h1>
      
      <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
        <TabsList className="grid grid-cols-5 mb-4">
          {meditationCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {meditationCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.tracks.map((track) => (
                <Card key={track.id} className="meditation-card overflow-hidden">
                  <div className="h-40 w-full overflow-hidden">
                    <img 
                      src={track.imageUrl} 
                      alt={track.title} 
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{track.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">{track.duration}</p>
                    <p className="text-sm mt-2">{track.description}</p>
                    
                    {showYoutube && showYoutube.id === track.id && (
                      <div className="mt-4 aspect-video">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={showYoutube.url} 
                          title={track.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {track.youtubeUrl && (
                      <Button 
                        variant="default"
                        onClick={() => openYoutubeVideo(track)}
                        className="flex items-center gap-2 bg-serenity-500 hover:bg-serenity-600"
                      >
                        <Youtube size={16} /> {showYoutube?.id === track.id ? 'Hide Video' : 'Watch Video'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {category.id === 'breathing' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Interactive Breathing Exercise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className={`h-40 w-40 rounded-full bg-serenity-100 border-4 border-serenity-200 flex items-center justify-center mb-4 transition-transform duration-1000 ${
                      breathingState === 'inhale' ? 'animate-breathe-in' : 
                      breathingState === 'exhale' ? 'animate-breathe-out' : ''
                    }`}>
                      <p className="text-lg font-medium text-serenity-700">
                        {breathingState === 'inhale' ? 'Inhale' : 
                         breathingState === 'hold' ? 'Hold' : 
                         breathingState === 'exhale' ? 'Exhale' : 'Rest'}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={isBreathingActive ? stopBreathingExercise : startBreathingExercise}
                      className={isBreathingActive ? 'bg-red-500 hover:bg-red-600' : 'bg-serenity-500 hover:bg-serenity-600'}
                    >
                      {isBreathingActive ? 'Stop Exercise' : 'Start Exercise'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Favorites Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meditationCategories[0].tracks.map((track) => (
            <Card key={track.id} className="flex items-center p-3 space-x-3">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={track.imageUrl} 
                  alt={track.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{track.title}</h3>
                <p className="text-xs text-gray-500">{track.duration}</p>
              </div>
              {track.youtubeUrl && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => openYoutubeVideo(track)}
                >
                  <Youtube size={16} />
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meditation;
