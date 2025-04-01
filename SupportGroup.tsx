
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, Heart, Users, Clock, Calendar, Send, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Sample support group data
const supportGroups = [
  {
    id: 'anxiety-management',
    name: 'Anxiety Management',
    description: 'A supportive space to share experiences and strategies for managing anxiety.',
    members: 187,
    nextMeeting: 'Tomorrow, 7:00 PM',
    isJoined: true,
    posts: [
      {
        id: 1,
        author: {
          name: 'Emily Chen',
          avatar: 'https://i.pravatar.cc/150?img=44',
        },
        content: "I've been trying deep breathing techniques whenever I feel anxious, and it really helps! Anyone else have breathing exercises they recommend?",
        time: '2 hours ago',
        likes: 15,
        comments: 8,
      },
      {
        id: 2,
        author: {
          name: 'David Thompson',
          avatar: 'https://i.pravatar.cc/150?img=12',
        },
        content: "I had a panic attack at work yesterday and had to leave early. I feel embarrassed and worried about what my colleagues think. Has anyone dealt with this before?",
        time: '1 day ago',
        likes: 23,
        comments: 12,
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Virtual Anxiety Support Session',
        date: 'Tomorrow',
        time: '7:00 PM - 8:30 PM',
        location: 'Zoom',
        attendees: 43,
      },
      {
        id: 2,
        title: 'Anxiety Management Workshop',
        date: 'Next Tuesday',
        time: '6:00 PM - 7:30 PM',
        location: 'Community Center & Virtual',
        attendees: 28,
      }
    ]
  },
  {
    id: 'mindfulness-practitioners',
    name: 'Mindfulness Practitioners',
    description: 'For those interested in developing and deepening their mindfulness practice.',
    members: 143,
    nextMeeting: 'Saturday, 10:00 AM',
    isJoined: false,
    posts: [
      {
        id: 1,
        author: {
          name: 'Sarah Williams',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
        content: "Just completed a 30-day meditation challenge! It was tough at first to find the time, but now it's become a part of my daily routine.",
        time: '3 hours ago',
        likes: 18,
        comments: 5,
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Saturday Morning Meditation',
        date: 'Saturday',
        time: '10:00 AM - 11:00 AM',
        location: 'City Park & Virtual',
        attendees: 35,
      }
    ]
  },
  {
    id: 'stress-burnout-recovery',
    name: 'Stress & Burnout Recovery',
    description: 'Support for professionals dealing with workplace stress and burnout.',
    members: 209,
    nextMeeting: 'Wednesday, 6:30 PM',
    isJoined: false,
    posts: [
      {
        id: 1,
        author: {
          name: 'Michael Roberts',
          avatar: 'https://i.pravatar.cc/150?img=15',
        },
        content: "After struggling with burnout for months, I finally took a two-week break. It's made a world of difference. If you're on the edge, I highly recommend taking time off if possible.",
        time: '1 day ago',
        likes: 27,
        comments: 9,
      }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Burnout Prevention Workshop',
        date: 'Wednesday',
        time: '6:30 PM - 8:00 PM',
        location: 'Virtual Only',
        attendees: 51,
      }
    ]
  }
];

const SupportGroup = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<any>(null);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);
  
  useEffect(() => {
    // Find the group by ID
    const foundGroup = supportGroups.find(g => g.id === groupId);
    
    if (foundGroup) {
      setGroup(foundGroup);
    } else {
      // If group not found, use the first group
      setGroup(supportGroups[0]);
    }
  }, [groupId]);
  
  if (!group) {
    return <div>Loading...</div>;
  }
  
  const handleCreatePost = () => {
    if (newPost.trim() === '') return;
    
    toast({
      title: "Post Shared",
      description: "Your post has been shared with the group.",
    });
    
    // In a real app, this would save to a database
    setGroup({
      ...group,
      posts: [
        {
          id: group.posts.length + 1,
          author: {
            name: 'Sarah Anderson',
            avatar: 'https://i.pravatar.cc/150?img=32',
          },
          content: newPost,
          time: 'Just now',
          likes: 0,
          comments: 0,
        },
        ...group.posts
      ]
    });
    
    setNewPost('');
  };
  
  const handleAddComment = (postId: number) => {
    if (newComment.trim() === '') return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the discussion.",
    });
    
    // In a real app, this would save to a database
    setGroup({
      ...group,
      posts: group.posts.map((post: any) => 
        post.id === postId
          ? { ...post, comments: post.comments + 1 }
          : post
      )
    });
    
    setNewComment('');
    setActivePostId(null);
  };
  
  const handleRsvp = (eventId: number) => {
    toast({
      title: "RSVP Confirmed",
      description: "You've been added to the attendee list for this event.",
    });
    
    // In a real app, this would update the event's attendee list
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/community')}
          className="p-2"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">{group.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Your profile" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts, questions, or experiences with the group..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end mt-3">
                      <Button 
                        onClick={handleCreatePost} 
                        disabled={newPost.trim() === ''}
                        className="bg-serenity-500 hover:bg-serenity-600"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {group.posts.map((post: any) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{post.author.name}</h3>
                        <p className="text-xs text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4">{post.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{post.likes} likes • {post.comments} comments</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" className="flex-1 text-sm">
                        <Heart size={16} className="mr-2" />
                        Like
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 text-sm"
                        onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Comment
                      </Button>
                    </div>
                    
                    {activePostId === post.id && (
                      <div className="mt-4 flex items-start gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Your profile" />
                          <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <div className="flex justify-end mt-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAddComment(post.id)}
                              disabled={newComment.trim() === ''}
                              className="bg-serenity-500 hover:bg-serenity-600"
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Group Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{group.description}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-gray-500" />
                <span>{group.members} members</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-500" />
                <span>Next meeting: {group.nextMeeting}</span>
              </div>
              
              <Button className="w-full bg-serenity-500 hover:bg-serenity-600">
                {group.isJoined ? 'Invite Friends' : 'Join Group'}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.upcomingEvents.map((event: any) => (
                <div key={event.id} className="border rounded-lg p-3">
                  <h3 className="font-medium text-sm">{event.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Calendar size={12} />
                    <span>{event.date}, {event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 mb-3">
                    <Users size={12} />
                    <span>{event.attendees} attending</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-serenity-500 hover:bg-serenity-600"
                    onClick={() => handleRsvp(event.id)}
                  >
                    RSVP
                  </Button>
                </div>
              ))}
              
              {group.upcomingEvents.length === 0 && (
                <p className="text-sm text-gray-500">No upcoming events scheduled.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportGroup;
