
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, BarChart2, Headphones, BookOpen, Users, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentGreeting, setCurrentGreeting] = useState('How are you feeling today?');
  const username = 'Sarah';
  
  const quickMoods = [
    { emoji: '😊', label: 'Happy', color: 'bg-green-100' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100' },
    { emoji: '😓', label: 'Stressed', color: 'bg-orange-100' },
    { emoji: '😰', label: 'Anxious', color: 'bg-red-100' },
  ];
  
  const handleMoodClick = (mood: string) => {
    setCurrentGreeting(`Thanks for sharing that you're feeling ${mood.toLowerCase()}!`);
    // In a real app, this would save the mood to the user's profile/history
  };
  
  return (
    <div className="space-y-6">
      <section className="text-left">
        <h1 className="text-2xl font-bold text-gray-800">
          Hi {username},
        </h1>
        <p className="text-lg text-gray-600">{currentGreeting}</p>
        
        <div className="flex flex-wrap gap-3 my-4">
          {quickMoods.map((mood) => (
            <button
              key={mood.label}
              className={`${mood.color} emoji-btn`}
              onClick={() => handleMoodClick(mood.label)}
              aria-label={`Feeling ${mood.label}`}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/chat">
          <Card className="serenimind-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Chat Support</CardTitle>
              <MessageCircle className="h-6 w-6 text-serenity-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Chat with SereniMind for emotional support and guidance anytime.
              </p>
              <Button className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/mood-tracker">
          <Card className="serenimind-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Mood Tracking</CardTitle>
              <BarChart2 className="h-6 w-6 text-serenity-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Track your emotions over time and discover patterns in your mental wellbeing.
              </p>
              <Button className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600">
                Track Mood
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/meditation">
          <Card className="serenimind-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Guided Meditation</CardTitle>
              <Headphones className="h-6 w-6 text-serenity-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Experience calm and focus with guided meditations for different needs.
              </p>
              <Button className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600">
                Meditate Now
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/resources">
          <Card className="serenimind-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Self-Care Tips</CardTitle>
              <BookOpen className="h-6 w-6 text-serenity-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Explore self-care activities and wellness tips for daily mental health.
              </p>
              <Button className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600">
                View Resources
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/community">
          <Card className="serenimind-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Community Support</CardTitle>
              <Users className="h-6 w-6 text-serenity-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Connect with others, share experiences, and find support in our community.
              </p>
              <Button className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/calendar">
          <Card className="serenimind-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Calendar</CardTitle>
              <Calendar className="h-6 w-6 text-serenity-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Schedule your meditation sessions and track your mental health journey.
              </p>
              <Button className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </Link>
      </section>
      
      {/* Quick Access Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="serenimind-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Last Meditation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Calm Mind Meditation</p>
              <p className="text-xs text-gray-500">12 minutes • Yesterday</p>
              <Button variant="outline" size="sm" className="mt-2">
                Resume
              </Button>
            </CardContent>
          </Card>
          
          <Card className="serenimind-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Mood Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Your mood has been improving this week!</p>
              <div className="flex mt-2 space-x-1">
                <span className="emoji-btn bg-blue-100 text-xs">😔</span>
                <span className="emoji-btn bg-gray-100 text-xs">😐</span>
                <span className="emoji-btn bg-green-100 text-xs">😊</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
