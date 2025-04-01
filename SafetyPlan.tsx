
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, Shield, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SafetyPlan = () => {
  const navigate = useNavigate();
  const [warningSignsStep, setWarningSignsStep] = useState('');
  const [copingStrategiesStep, setCopingStrategiesStep] = useState('');
  const [distractionsStep, setDistractionsStep] = useState('');
  const [supportPeopleStep, setSupportPeopleStep] = useState('');
  const [professionalHelpStep, setProfessionalHelpStep] = useState('');
  const [safeEnvironmentStep, setSafeEnvironmentStep] = useState('');
  
  const handleSave = () => {
    toast({
      title: "Safety Plan Saved",
      description: "Your personal safety plan has been saved successfully.",
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
        <h1 className="text-2xl font-bold">Personal Safety Plan</h1>
      </div>
      
      <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
        <p className="text-sm font-medium text-amber-800">
          A safety plan is a personalized tool to help you navigate difficult moments. Keep this plan accessible so you can refer to it when needed.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 text-serenity-600" size={20} />
            Create Your Safety Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Step 1: Warning Signs</h3>
              <p className="text-sm text-gray-500">What thoughts, feelings, or behaviors signal that a crisis might be developing?</p>
              <Textarea 
                placeholder="List the warning signs that indicate you might need to use your safety plan..."
                value={warningSignsStep}
                onChange={(e) => setWarningSignsStep(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 2: Internal Coping Strategies</h3>
              <p className="text-sm text-gray-500">What can you do by yourself to take your mind off problems?</p>
              <Textarea 
                placeholder="List activities, practices, or thoughts that help calm or comfort you..."
                value={copingStrategiesStep}
                onChange={(e) => setCopingStrategiesStep(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 3: Distractions</h3>
              <p className="text-sm text-gray-500">What places or social settings can help distract you?</p>
              <Textarea 
                placeholder="List people and places that can provide healthy distraction..."
                value={distractionsStep}
                onChange={(e) => setDistractionsStep(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 4: People Who Can Help</h3>
              <p className="text-sm text-gray-500">Who can you talk to when you need support?</p>
              <Textarea 
                placeholder="List trusted friends, family members, or others with their contact information..."
                value={supportPeopleStep}
                onChange={(e) => setSupportPeopleStep(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 5: Professional Help</h3>
              <p className="text-sm text-gray-500">Which professionals or agencies can you contact during a crisis?</p>
              <Textarea 
                placeholder="List mental health professionals, hotlines, or emergency services..."
                value={professionalHelpStep}
                onChange={(e) => setProfessionalHelpStep(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 6: Making the Environment Safe</h3>
              <p className="text-sm text-gray-500">What steps can you take to create a safe environment during a crisis?</p>
              <Textarea 
                placeholder="List actions to make your environment safer..."
                value={safeEnvironmentStep}
                onChange={(e) => setSafeEnvironmentStep(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <div className="bg-red-50 p-4 border border-red-100 rounded-lg space-y-2">
            <h3 className="font-medium text-red-900 flex items-center">
              <Phone className="mr-2" size={18} />
              Emergency Resources
            </h3>
            <p className="text-sm">988 Suicide & Crisis Lifeline: Call or text 988</p>
            <p className="text-sm">Crisis Text Line: Text HOME to 741741</p>
            <p className="text-sm">Emergency Services: Call 911</p>
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
            Save Safety Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SafetyPlan;
