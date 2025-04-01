import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Brain, Moon, Coffee, BookOpen, PhoneCall, Users } from 'lucide-react';
import { resourceService } from '@/services/resourceService';

const Resources = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Self-Care Resources</h1>
      
      <Tabs defaultValue="self-care">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="self-care">Self-Care Tips</TabsTrigger>
          <TabsTrigger value="cbt">CBT Techniques</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Hygiene</TabsTrigger>
          <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="self-care">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="serenimind-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Physical Self-Care</CardTitle>
                <Heart className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Get 7-9 hours of sleep per night</li>
                  <li>Stay hydrated throughout the day</li>
                  <li>Take a 15-minute walk outside</li>
                  <li>Stretch for 5 minutes every hour</li>
                  <li>Prepare a nutritious meal</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-serenity-600"
                  onClick={() => resourceService.learnMore("Physical Self-Care")}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="serenimind-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Mental Self-Care</CardTitle>
                <Brain className="h-5 w-5 text-serenity-500" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Practice mindfulness for 10 minutes</li>
                  <li>Read a book for pleasure</li>
                  <li>Take breaks from screens</li>
                  <li>Learn something new</li>
                  <li>Do a puzzle or brain game</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-serenity-600"
                  onClick={() => resourceService.learnMore("Mental Self-Care")}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="serenimind-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Emotional Self-Care</CardTitle>
                <Heart className="h-5 w-5 text-pink-500" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Journal about your feelings</li>
                  <li>Practice gratitude - list 3 things</li>
                  <li>Connect with a supportive friend</li>
                  <li>Allow yourself to feel emotions</li>
                  <li>Say positive affirmations</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-serenity-600"
                  onClick={() => resourceService.learnMore("Emotional Self-Care")}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="serenimind-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Social Self-Care</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Schedule time with friends</li>
                  <li>Join a community group</li>
                  <li>Have a meaningful conversation</li>
                  <li>Set healthy boundaries</li>
                  <li>Ask for help when needed</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-serenity-600"
                  onClick={() => resourceService.learnMore("Social Self-Care")}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="serenimind-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Spiritual Self-Care</CardTitle>
                <Moon className="h-5 w-5 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Spend time in nature</li>
                  <li>Practice meditation</li>
                  <li>Reflect on personal values</li>
                  <li>Engage in meaningful activities</li>
                  <li>Express gratitude</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-serenity-600"
                  onClick={() => resourceService.learnMore("Spiritual Self-Care")}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
            
            <Card className="serenimind-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Practical Self-Care</CardTitle>
                <Coffee className="h-5 w-5 text-amber-500" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Declutter your space</li>
                  <li>Create a daily routine</li>
                  <li>Take small breaks during work</li>
                  <li>Manage your time effectively</li>
                  <li>Prepare meals in advance</li>
                </ul>
                <Button 
                  variant="link" 
                  className="p-0 mt-2 h-auto text-serenity-600"
                  onClick={() => resourceService.learnMore("Practical Self-Care")}
                >
                  Learn more
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-serenity-50 rounded-lg border border-serenity-100">
            <h3 className="font-medium mb-2 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-serenity-600" />
              Daily Self-Care Challenge
            </h3>
            <p className="text-sm mb-3">
              Try incorporating one small self-care activity each day this week. Start with just 5 minutes!
            </p>
            <Button 
              className="bg-serenity-500 hover:bg-serenity-600"
              onClick={() => resourceService.learnMore("Daily Self-Care Challenge")}
            >
              Start Challenge
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="cbt">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="serenimind-card">
              <CardHeader>
                <CardTitle>Identifying Negative Thoughts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  CBT works by identifying and challenging negative thought patterns that contribute to emotional distress.
                </p>
                
                <div className="p-3 bg-serenity-50 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Common Thought Distortions:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>All-or-nothing thinking</li>
                    <li>Overgeneralization</li>
                    <li>Mental filtering</li>
                    <li>Catastrophizing</li>
                    <li>Personalization</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-serenity-50 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Thought Record Exercise:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Identify the situation</li>
                    <li>Note your emotions and their intensity</li>
                    <li>Identify automatic thoughts</li>
                    <li>Find evidence for and against</li>
                    <li>Develop balanced thoughts</li>
                  </ol>
                </div>
                
                <Button 
                  className="w-full bg-serenity-500 hover:bg-serenity-600"
                  onClick={resourceService.startThoughtRecord}
                >
                  Start Thought Record
                </Button>
              </CardContent>
            </Card>
            
            <Card className="serenimind-card">
              <CardHeader>
                <CardTitle>Reframing Techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Reframing helps you develop more balanced and helpful perspectives on difficult situations.
                </p>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-3 bg-red-50 border-b">
                    <h3 className="text-sm font-medium text-red-700">Negative Thought</h3>
                    <p className="text-sm">"I completely failed that presentation, I'm terrible at public speaking."</p>
                  </div>
                  
                  <div className="p-3 bg-green-50">
                    <h3 className="text-sm font-medium text-green-700">Reframed Thought</h3>
                    <p className="text-sm">"The presentation had some challenges, but also some strengths. I can learn from this experience to improve next time."</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-3 bg-red-50 border-b">
                    <h3 className="text-sm font-medium text-red-700">Negative Thought</h3>
                    <p className="text-sm">"My friend didn't reply to my message. They must be mad at me."</p>
                  </div>
                  
                  <div className="p-3 bg-green-50">
                    <h3 className="text-sm font-medium text-green-700">Reframed Thought</h3>
                    <p className="text-sm">"There could be many reasons why my friend hasn't replied yet. They might be busy or haven't seen my message."</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-serenity-500 hover:bg-serenity-600"
                  onClick={resourceService.practiceReframing}
                >
                  Practice Reframing
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sleep">
          <Card className="serenimind-card">
            <CardHeader>
              <CardTitle>Healthy Sleep Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-3 bg-serenity-50 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Before Bed Routine:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Dim lights 1-2 hours before bedtime</li>
                      <li>Avoid screens 30-60 minutes before sleep</li>
                      <li>Keep bedroom cool (65-68°F/18-20°C)</li>
                      <li>Use white noise or sleep sounds if helpful</li>
                      <li>Practice relaxation techniques</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-serenity-50 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Daily Habits:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Maintain consistent sleep schedule</li>
                      <li>Get natural light exposure during the day</li>
                      <li>Limit caffeine after 2pm</li>
                      <li>Exercise regularly (but not right before bed)</li>
                      <li>Avoid large meals before bedtime</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-serenity-50 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Bedtime Relaxation:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Progressive muscle relaxation</li>
                      <li>Deep breathing exercises</li>
                      <li>Gentle stretching or yoga</li>
                      <li>Bedtime meditation</li>
                      <li>Sleep stories or calming audio</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-serenity-50 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Environment Optimization:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Use blackout curtains to block light</li>
                      <li>Keep bedroom for sleep and intimacy only</li>
                      <li>Invest in a comfortable mattress and pillows</li>
                      <li>Reduce noise disruptions</li>
                      <li>Consider aromatherapy (lavender, chamomile)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button 
                  className="flex-1 bg-serenity-500 hover:bg-serenity-600"
                  onClick={resourceService.trySleepMeditation}
                >
                  Try Sleep Meditation
                </Button>
                <Button 
                  className="flex-1 bg-serenity-500 hover:bg-serenity-600"
                  onClick={resourceService.startSleepJournal}
                >
                  Start Sleep Journal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crisis">
          <Card className="border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Crisis Support Resources</CardTitle>
              <p className="text-sm text-red-600 font-medium">
                If you're experiencing a mental health emergency, please reach out for help immediately.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <h3 className="font-medium flex items-center mb-2">
                    <PhoneCall className="h-5 w-5 mr-2 text-red-500" />
                    Emergency Helplines
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex flex-col">
                      <span className="font-medium">988 Suicide & Crisis Lifeline</span>
                      <span>Call or text 988</span>
                      <span className="text-xs text-gray-500">24/7 support for anyone in distress</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Crisis Text Line</span>
                      <span>Text HOME to 741741</span>
                      <span className="text-xs text-gray-500">24/7 text support with a crisis counselor</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Emergency Services</span>
                      <span>Call 911</span>
                      <span className="text-xs text-gray-500">For immediate emergency situations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h3 className="font-medium flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-amber-500" />
                    Specialized Support
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex flex-col">
                      <span className="font-medium">Veterans Crisis Line</span>
                      <span>Call 1-800-273-8255 and Press 1</span>
                      <span className="text-xs text-gray-500">Support for veterans and their loved ones</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Trans Lifeline</span>
                      <span>Call 1-877-565-8860</span>
                      <span className="text-xs text-gray-500">Support for transgender people</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">The Trevor Project</span>
                      <span>Call 1-866-488-7386</span>
                      <span className="text-xs text-gray-500">Support for LGBTQ+ young people</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium mb-2">When to Seek Emergency Help:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Thoughts of harming yourself or others</li>
                  <li>Hearing voices or experiencing hallucinations</li>
                  <li>Feeling completely overwhelmed or out of control</li>
                  <li>Unable to perform basic self-care</li>
                  <li>Experiencing a panic attack that doesn't subside</li>
                </ul>
              </div>
              
              <div className="p-4 bg-serenity-50 rounded-lg border border-serenity-100 text-center">
                <h3 className="font-medium mb-2">Create Your Personal Safety Plan</h3>
                <p className="text-sm mb-3">
                  A safety plan helps you identify warning signs, coping strategies, and resources to use during a crisis.
                </p>
                <Button 
                  className="bg-serenity-500 hover:bg-serenity-600"
                  onClick={resourceService.createSafetyPlan}
                >
                  Create Safety Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
