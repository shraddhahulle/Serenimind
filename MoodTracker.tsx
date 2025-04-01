
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for the mood chart
const moodData = [
  { day: 'Mon', mood: 3, energy: 4, focus: 2 },
  { day: 'Tue', mood: 2, energy: 3, focus: 2 },
  { day: 'Wed', mood: 4, energy: 4, focus: 3 },
  { day: 'Thu', mood: 3, energy: 2, focus: 3 },
  { day: 'Fri', mood: 5, energy: 4, focus: 4 },
  { day: 'Sat', mood: 4, energy: 5, focus: 4 },
  { day: 'Sun', mood: 4, energy: 3, focus: 3 },
];

const moodEmojis = [
  { value: 1, emoji: '😞', label: 'Very bad' },
  { value: 2, emoji: '😔', label: 'Bad' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😊', label: 'Very good' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [timeframe, setTimeframe] = useState('weekly');
  
  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };
  
  const handleMoodSubmit = () => {
    if (selectedMood === null) return;
    
    // In a real app, this would save the mood to the user's history
    alert(`Mood logged: ${moodEmojis.find(m => m.value === selectedMood)?.label}`);
    
    // Reset form
    setSelectedMood(null);
    setNotes('');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mood Tracker</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Mood Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Your Mood Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip 
                  formatter={(value, name) => {
                    const emoji = name === 'mood' ? moodEmojis[Number(value) - 1]?.emoji : '';
                    return [`${value} ${emoji}`, name];
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Mood"
                />
                <Line type="monotone" dataKey="energy" stroke="#82ca9d" name="Energy" />
                <Line type="monotone" dataKey="focus" stroke="#ffc658" name="Focus" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Log Mood Section */}
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling right now?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-6">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                className={`emoji-btn text-2xl ${
                  selectedMood === mood.value ? 'ring-2 ring-serenity-500 scale-110' : ''
                }`}
                onClick={() => handleMoodSelect(mood.value)}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Add notes (optional)</p>
            <Textarea
              placeholder="What's contributing to your mood today?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleMoodSubmit} 
            disabled={selectedMood === null}
            className="w-full bg-serenity-500 hover:bg-serenity-600"
          >
            Log Mood
          </Button>
        </CardContent>
      </Card>
      
      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-serenity-50 rounded-lg border border-serenity-100">
              <h3 className="font-medium mb-2">Weekly Summary</h3>
              <p className="text-sm text-gray-600">
                Your mood has been improving over the week. The highest point was on Friday!
              </p>
            </div>
            
            <div className="p-4 bg-serenity-50 rounded-lg border border-serenity-100">
              <h3 className="font-medium mb-2">Pattern Detected</h3>
              <p className="text-sm text-gray-600">
                Your energy levels seem to affect your overall mood. Consider activities that boost your energy.
              </p>
            </div>
            
            <div className="p-4 bg-serenity-50 rounded-lg border border-serenity-100">
              <h3 className="font-medium mb-2">Suggestion</h3>
              <p className="text-sm text-gray-600">
                Try our "Energy Boost" meditation today to help maintain your positive trend.
              </p>
              <Button variant="link" className="p-0 h-auto text-serenity-600">
                Go to meditation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
