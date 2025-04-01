
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Moon, Sun, Coffee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SleepJournal = () => {
  const navigate = useNavigate();
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [sleepQuality, setSleepQuality] = useState([5]);
  const [sleepNotes, setSleepNotes] = useState('');
  const [daytimeEnergy, setDaytimeEnergy] = useState([5]);
  const [caffeine, setCaffeine] = useState('');
  const [exercise, setExercise] = useState('');
  const [bedtimeRoutine, setBedtimeRoutine] = useState('');
  
  const handleSave = () => {
    toast({
      title: "Sleep Journal Saved",
      description: "Your sleep journal entry has been saved successfully.",
    });
    
    // In a real app, this would save to a database
    navigate('/resources');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/resources')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Sleep Journal</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Track Your Sleep</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Moon size={18} className="mr-2 text-indigo-500" />
                  Bedtime
                </h3>
                <Input 
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Sun size={18} className="mr-2 text-amber-500" />
                  Wake-up Time
                </h3>
                <Input 
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Sleep Quality (1-10)</h3>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={sleepQuality}
                  onValueChange={setSleepQuality}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor (1)</span>
                  <span>{sleepQuality[0]}</span>
                  <span>Excellent (10)</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Daytime Energy (1-10)</h3>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={daytimeEnergy}
                  onValueChange={setDaytimeEnergy}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low (1)</span>
                  <span>{daytimeEnergy[0]}</span>
                  <span>High (10)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <Coffee size={18} className="mr-2 text-brown-500" />
                  Caffeine Intake
                </h3>
                <Input 
                  placeholder="What caffeine did you consume and when?"
                  value={caffeine}
                  onChange={(e) => setCaffeine(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Exercise</h3>
                <Input 
                  placeholder="What exercise did you do and when?"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Bedtime Routine</h3>
                <Textarea 
                  placeholder="What did you do before bed?"
                  value={bedtimeRoutine}
                  onChange={(e) => setBedtimeRoutine(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Sleep Notes</h3>
                <Textarea 
                  placeholder="Any dreams, disturbances, or observations about your sleep?"
                  value={sleepNotes}
                  onChange={(e) => setSleepNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate('/resources')}>
            Cancel
          </Button>
          <Button 
            className="bg-serenity-500 hover:bg-serenity-600" 
            onClick={handleSave}
          >
            Save Journal Entry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SleepJournal;
