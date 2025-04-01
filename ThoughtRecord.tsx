
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThoughtRecord = () => {
  const navigate = useNavigate();
  const [situation, setSituation] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [emotions, setEmotions] = useState('');
  const [emotionIntensity, setEmotionIntensity] = useState([50]);
  const [evidence, setEvidence] = useState('');
  const [alternativeThoughts, setAlternativeThoughts] = useState('');
  const [outcome, setOutcome] = useState('');
  
  const handleSave = () => {
    toast({
      title: "Thought Record Saved",
      description: "Your thought record has been saved successfully.",
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
        <h1 className="text-2xl font-bold">CBT Thought Record</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Your Thoughts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Situation</h3>
            <p className="text-sm text-gray-500">Describe the situation that triggered your emotions</p>
            <Textarea 
              placeholder="What happened? When and where did it happen? Who was involved?"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Automatic Thoughts</h3>
            <p className="text-sm text-gray-500">What went through your mind?</p>
            <Textarea 
              placeholder="What thoughts or images went through your mind?"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Emotions</h3>
            <p className="text-sm text-gray-500">What emotions did you feel?</p>
            <Input 
              placeholder="Anxiety, sadness, anger, etc."
              value={emotions}
              onChange={(e) => setEmotions(e.target.value)}
            />
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-2">Intensity (0-100%)</p>
              <Slider
                min={0}
                max={100}
                step={1}
                value={emotionIntensity}
                onValueChange={setEmotionIntensity}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>{emotionIntensity[0]}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Evidence For and Against</h3>
            <p className="text-sm text-gray-500">Evaluate your thoughts objectively</p>
            <Textarea 
              placeholder="What facts support or contradict your automatic thoughts?"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Alternative Perspective</h3>
            <p className="text-sm text-gray-500">Generate more balanced thoughts</p>
            <Textarea 
              placeholder="What's another way to look at this situation?"
              value={alternativeThoughts}
              onChange={(e) => setAlternativeThoughts(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Outcome</h3>
            <p className="text-sm text-gray-500">How do you feel now?</p>
            <Textarea 
              placeholder="How do you feel after reflecting on this? Has your perspective changed?"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate('/resources')}>
            Cancel
          </Button>
          <Button className="bg-serenity-500 hover:bg-serenity-600" onClick={handleSave}>
            Save Thought Record
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThoughtRecord;
