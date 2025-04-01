
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReframingExercise = () => {
  const navigate = useNavigate();
  const [negativeThought, setNegativeThought] = useState('');
  const [reframedThought, setReframedThought] = useState('');
  
  const examples = [
    {
      negative: "I'm never going to get better at this. I'm a failure.",
      reframed: "I'm still learning this skill. Everyone struggles when learning something new."
    },
    {
      negative: "Nobody wants to be around me. I'm too boring.",
      reframed: "Some people enjoy my company. Not everyone has to like me, and that's okay."
    },
    {
      negative: "This is going to be a disaster. Everything will go wrong.",
      reframed: "Some things might go wrong, but I can handle challenges as they come."
    }
  ];
  
  const handleSaveReframe = () => {
    toast({
      title: "Reframing Saved",
      description: "Your reframed thought has been saved successfully.",
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
        <h1 className="text-2xl font-bold">Thought Reframing Exercise</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Reframe Negative Thoughts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm">
            Reframing helps you challenge negative thought patterns and replace them with more balanced, helpful perspectives.
            Follow these steps to practice reframing:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
            <li>Write down your negative or unhelpful thought</li>
            <li>Identify the thinking pattern (catastrophizing, black-and-white thinking, etc.)</li>
            <li>Challenge the thought by looking for evidence for and against it</li>
            <li>Create a more balanced, realistic thought</li>
          </ol>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-medium">Your Negative Thought</h3>
              <Textarea 
                placeholder="Write down the negative thought you'd like to reframe..."
                value={negativeThought}
                onChange={(e) => setNegativeThought(e.target.value)}
                className="min-h-[100px] bg-red-50 border-red-100"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Your Reframed Thought</h3>
              <Textarea 
                placeholder="Rewrite the thought in a more balanced, helpful way..."
                value={reframedThought}
                onChange={(e) => setReframedThought(e.target.value)}
                className="min-h-[100px] bg-green-50 border-green-100"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="font-medium mb-2">Examples</h3>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="p-3 bg-red-50 border-b">
                    <h4 className="text-sm font-medium text-red-700">Negative Thought</h4>
                    <p className="text-sm">{example.negative}</p>
                  </div>
                  
                  <div className="p-3 bg-green-50">
                    <h4 className="text-sm font-medium text-green-700">Reframed Thought</h4>
                    <p className="text-sm">{example.reframed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate('/resources')}>
            Cancel
          </Button>
          <Button 
            className="bg-serenity-500 hover:bg-serenity-600" 
            onClick={handleSaveReframe}
            disabled={!negativeThought || !reframedThought}
          >
            Save Reframing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReframingExercise;
