
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart2, 
  Calendar, 
  Cloud, 
  Cog, 
  Heart, 
  Headphones, 
  Edit, 
  Bookmark, 
  Clock, 
  Users, 
  MessageCircle, 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  LogOut
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Profile = () => {
  // Tabs for the profile section
  const [activeTab, setActiveTab] = useState('profile');
  
  // Settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [reminders, setReminders] = useState(true);
  
  // Recent activity mock data
  const recentActivity = [
    {
      id: 1,
      type: 'meditation',
      title: 'Calm Mind Meditation',
      time: '2 hours ago',
      icon: <Headphones size={16} className="text-serenity-500" />,
    },
    {
      id: 2,
      type: 'mood',
      title: 'Logged mood: Happy',
      time: 'Yesterday',
      icon: <Heart size={16} className="text-pink-500" />,
    },
    {
      id: 3,
      type: 'post',
      title: 'Posted in Anxiety Support Group',
      time: '2 days ago',
      icon: <MessageCircle size={16} className="text-blue-500" />,
    },
    {
      id: 4,
      type: 'meditation',
      title: 'Deep Sleep Journey',
      time: '3 days ago',
      icon: <Headphones size={16} className="text-serenity-500" />,
    },
  ];
  
  // Saved items mock data
  const savedItems = [
    {
      id: 1,
      type: 'meditation',
      title: 'Anxiety Relief',
      category: 'Meditation',
      icon: <Headphones size={16} className="text-serenity-500" />,
    },
    {
      id: 2,
      type: 'article',
      title: 'Managing Work Stress',
      category: 'Self-Care',
      icon: <Cloud size={16} className="text-blue-500" />,
    },
    {
      id: 3,
      type: 'post',
      title: 'Benefits of Deep Breathing',
      category: 'Community Post',
      icon: <Users size={16} className="text-green-500" />,
    },
  ];
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Profile picture" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="mt-2 flex flex-col items-center">
                    <h2 className="text-xl font-bold">Sarah Anderson</h2>
                    <p className="text-sm text-gray-500">Member since Jan 2023</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 flex items-center gap-2">
                    <Edit size={14} />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="flex-1 w-full">
                  <h3 className="font-medium mb-4">Your Wellness Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-serenity-50 border-serenity-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="bg-serenity-100 p-2 rounded-full mb-2">
                          <Headphones size={20} className="text-serenity-600" />
                        </div>
                        <h4 className="font-medium text-sm">Meditation</h4>
                        <p className="text-2xl font-bold text-serenity-600">12</p>
                        <p className="text-xs text-gray-500">Sessions this month</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-50 border-blue-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="bg-blue-100 p-2 rounded-full mb-2">
                          <BarChart2 size={20} className="text-blue-600" />
                        </div>
                        <h4 className="font-medium text-sm">Mood</h4>
                        <p className="text-2xl font-bold text-blue-600">4.2</p>
                        <p className="text-xs text-gray-500">Average (out of 5)</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 border-green-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="bg-green-100 p-2 rounded-full mb-2">
                          <Calendar size={20} className="text-green-600" />
                        </div>
                        <h4 className="font-medium text-sm">Streak</h4>
                        <p className="text-2xl font-bold text-green-600">8</p>
                        <p className="text-xs text-gray-500">Days in a row</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="font-medium mt-6 mb-3">Recent Activity</h3>
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      {recentActivity.slice(0, 3).map(activity => (
                        <div key={activity.id} className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Clock size={12} className="mr-1" /> {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center">
                        <Button 
                          variant="link" 
                          className="text-serenity-600 p-0"
                          onClick={() => setActiveTab('activity')}
                        >
                          View All Activity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark size={16} fill="currentColor" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">Mindfulness Group Session</h3>
                    <Badge className="bg-serenity-100 text-serenity-700 hover:bg-serenity-200">
                      Group
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 flex items-center">
                    <Calendar size={12} className="mr-1" /> Tomorrow, 6:00 PM
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-serenity-500 hover:bg-serenity-600 text-xs">
                      Join
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Reschedule
                    </Button>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('calendar')}
                >
                  <Calendar size={16} className="mr-2" />
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="meditation">Meditation</TabsTrigger>
                  <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Clock size={14} className="mr-1" /> {activity.time}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor"></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Hide from Activity</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="meditation">
                  <div className="space-y-4">
                    {recentActivity
                      .filter(activity => activity.type === 'meditation')
                      .map(activity => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Clock size={14} className="mr-1" /> {activity.time}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Repeat
                          </Button>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="mood">
                  <div className="space-y-4">
                    {recentActivity
                      .filter(activity => activity.type === 'mood')
                      .map(activity => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Clock size={14} className="mr-1" /> {activity.time}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <BarChart2 size={16} />
                          </Button>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="community">
                  <div className="space-y-4">
                    {recentActivity
                      .filter(activity => activity.type === 'post')
                      .map(activity => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Clock size={14} className="mr-1" /> {activity.time}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog size={20} />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-serenity-500"
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications on your device</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                      className="data-[state=checked]:bg-serenity-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Email Updates</p>
                      <p className="text-sm text-gray-500">Receive weekly progress summaries</p>
                    </div>
                    <Switch
                      checked={emailUpdates}
                      onCheckedChange={setEmailUpdates}
                      className="data-[state=checked]:bg-serenity-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Daily Reminders</p>
                      <p className="text-sm text-gray-500">Get reminders for meditation and mood tracking</p>
                    </div>
                    <Switch
                      checked={reminders}
                      onCheckedChange={setReminders}
                      className="data-[state=checked]:bg-serenity-500"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy & Security</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Data Privacy Settings</p>
                      <p className="text-sm text-gray-500">Manage how your data is used and shared</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Lock size={16} className="mr-2" />
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Account Security</p>
                      <p className="text-sm text-gray-500">Update password and security settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Lock size={16} className="mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
