import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ThumbsUp, 
  Clock, 
  Users, 
  Video, 
  CalendarDays
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { communityService } from '@/services/communityService';
import { toast } from '@/hooks/use-toast';

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Emily Chen',
      username: 'em_chen',
      avatar: 'https://i.pravatar.cc/150?img=44',
    },
    content: "I've been using the breathing exercises for a week now and my anxiety has decreased significantly. So grateful for this community and all the support! 💜",
    likes: 24,
    comments: 5,
    shares: 2,
    time: '2 hours ago',
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: 'Mark Johnson',
      username: 'mark_j',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    content: "Does anyone have tips for managing work stress? I've been feeling overwhelmed lately and could use some advice from others who've been there.",
    likes: 13,
    comments: 8,
    shares: 0,
    time: '5 hours ago',
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: 'Aisha Khan',
      username: 'aisha_k',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    content: "Just finished a great meditation session! Feeling so much more centered and ready to tackle the day. Highly recommend trying it out if you haven't already! 🧘‍♀️",
    likes: 32,
    comments: 12,
    shares: 5,
    time: '8 hours ago',
    isLiked: false,
  },
  {
    id: 4,
    author: {
      name: 'Ricardo Gomez',
      username: 'ricardo_g',
      avatar: 'https://i.pravatar.cc/150?img=52',
    },
    content: "I'm new to this community and looking for resources on managing social anxiety. Any suggestions would be greatly appreciated!",
    likes: 18,
    comments: 3,
    shares: 1,
    time: '1 day ago',
    isLiked: false,
  },
];

// Mock data for mental health professionals
const professionals = [
  {
    id: 1,
    name: 'Dr. Jennifer Adams',
    title: 'Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    avatar: 'https://i.pravatar.cc/150?img=25',
    rating: 4.9,
    reviews: 78,
  },
  {
    id: 2,
    name: 'Dr. Michael Brown',
    title: 'Psychiatrist',
    specialties: ['Bipolar Disorder', 'Schizophrenia', 'ADHD'],
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 4.7,
    reviews: 63,
  },
  {
    id: 3,
    name: 'Dr. Sarah Lee',
    title: 'Licensed Therapist',
    specialties: ['Relationship Issues', 'Grief', 'Stress'],
    avatar: 'https://i.pravatar.cc/150?img=30',
    rating: 4.8,
    reviews: 55,
  },
];

// Mock data for support groups
const supportGroups = [
  {
    id: 1,
    name: 'Anxiety Support Group',
    description: 'A safe space to share experiences and coping strategies for anxiety.',
    members: 45,
    nextMeeting: 'Wednesday at 7:00 PM',
    isJoined: true,
  },
  {
    id: 2,
    name: 'Depression Support Group',
    description: 'A supportive community for individuals dealing with depression.',
    members: 32,
    nextMeeting: 'Thursday at 6:30 PM',
    isJoined: false,
  },
  {
    id: 3,
    name: 'Grief Support Group',
    description: 'A compassionate group for those who have experienced loss.',
    members: 28,
    nextMeeting: 'Friday at 5:00 PM',
    isJoined: false,
  },
];

// Sample comments for demo
const sampleComments = [
  {
    id: 1,
    postId: 1,
    author: {
      name: 'David Lee',
      username: 'david_l',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    content: "The breathing exercises helped me too! Have you tried the 4-7-8 technique yet?",
    time: '1 hour ago',
  },
  {
    id: 2,
    postId: 1,
    author: {
      name: 'Sarah Williams',
      username: 'sarahw',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: "So happy to hear that! Which exercise did you find most helpful?",
    time: '30 minutes ago',
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [newPostContent, setNewPostContent] = useState('');
  const [localPosts, setLocalPosts] = useState(communityPosts);
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState<number | null>(null);
  const [comments, setComments] = useState(sampleComments);
  const [showComments, setShowComments] = useState<number | null>(null);
  
  const handleCreatePost = () => {
    if (newPostContent.trim() === '') return;
    
    const newPost = {
      id: localPosts.length + 1,
      author: {
        name: 'Sarah Anderson',
        username: 'sarah_a',
        avatar: 'https://i.pravatar.cc/150?img=32',
      },
      content: newPostContent,
      likes: 0,
      comments: 0,
      shares: 0,
      time: 'Just now',
      isLiked: false,
    };
    
    setLocalPosts([newPost, ...localPosts]);
    setNewPostContent('');
    toast({
      title: "Post Created",
      description: "Your post has been published to the community.",
    });
  };
  
  const handleLikePost = (postId: number) => {
    setLocalPosts(localPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };
  
  const handleAddComment = (postId: number) => {
    if (newComment.trim() === '') return;
    
    const newCommentObj = {
      id: comments.length + 1,
      postId,
      author: {
        name: 'Sarah Anderson',
        username: 'sarah_a',
        avatar: 'https://i.pravatar.cc/150?img=32',
      },
      content: newComment,
      time: 'Just now',
    };
    
    setComments([...comments, newCommentObj]);
    
    setLocalPosts(localPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        };
      }
      return post;
    }));
    
    setNewComment('');
    setShowCommentInput(null);
    toast({
      title: "Comment Posted",
      description: "Your comment has been added to the discussion.",
    });
  };
  
  const handleSharePost = (postId: number) => {
    toast({
      title: "Post Shared",
      description: "This post has been shared to your profile.",
    });
    
    setLocalPosts(localPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1,
        };
      }
      return post;
    }));
  };
  
  const toggleShowComments = (postId: number) => {
    setShowComments(showComments === postId ? null : postId);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Community</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="posts">Community Posts</TabsTrigger>
          <TabsTrigger value="doctors">Talk to Doctors</TabsTrigger>
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          {/* Create post */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Your profile" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your thoughts, experiences, or ask a question..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end mt-3">
                    <Button 
                      onClick={handleCreatePost} 
                      disabled={newPostContent.trim() === ''}
                      className="bg-serenity-500 hover:bg-serenity-600"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Community posts */}
          {localPosts.map((post) => (
            <Card key={post.id} className="mb-4">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{post.author.name}</h3>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" /> {post.time}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-0">
                <p className="whitespace-pre-line">{post.content}</p>
              </CardContent>
              <CardFooter className="pt-3 pb-3 flex flex-col space-y-3">
                <div className="flex items-center justify-between w-full text-sm text-gray-500">
                  <span>{post.likes} likes • {post.comments} comments • {post.shares} shares</span>
                </div>
                
                <div className="flex justify-between w-full border-t border-b py-1 text-sm">
                  <Button
                    variant="ghost"
                    onClick={() => handleLikePost(post.id)}
                    className={`flex gap-2 items-center ${post.isLiked ? 'text-serenity-600' : ''}`}
                  >
                    <ThumbsUp size={18} />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => toggleShowComments(post.id)}
                    className="flex gap-2 items-center"
                  >
                    <MessageCircle size={18} />
                    Comments
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleSharePost(post.id)}
                    className="flex gap-2 items-center"
                  >
                    <Share2 size={18} />
                    Share
                  </Button>
                </div>
                
                {showComments === post.id && (
                  <div className="w-full space-y-3">
                    {comments
                      .filter(comment => comment.postId === post.id)
                      .map(comment => (
                        <div key={comment.id} className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-gray-50 p-2 rounded-lg">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">{comment.author.name}</h4>
                              <span className="text-xs text-gray-500">{comment.time}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                      
                    <div className="flex items-start gap-2 w-full pt-2">
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
                  </div>
                )}
                
                {!showComments && showCommentInput === post.id && (
                  <div className="flex items-start gap-2 w-full pt-2">
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
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="doctors">
          <h2 className="text-xl font-semibold mb-4">Licensed Mental Health Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professionals.map((pro) => (
              <Card key={pro.id} className="serenimind-card">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={pro.avatar} alt={pro.name} />
                      <AvatarFallback>{pro.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-medium">{pro.name}</h3>
                      <p className="text-sm text-gray-500">{pro.title}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pro.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center mt-2 text-sm">
                        <span className="flex items-center text-amber-500">
                          {Array.from({ length: Math.floor(pro.rating) }).map((_, i) => (
                            <Heart key={i} size={14} fill="currentColor" className="mr-1" />
                          ))}
                          {pro.rating % 1 !== 0 && (
                            <Heart size={14} fill="currentColor" className="mr-1" />
                          )}
                        </span>
                        <span className="text-gray-600 ml-1">
                          {pro.rating} ({pro.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 space-x-2">
                    <Button 
                      className="flex-1 bg-serenity-500 hover:bg-serenity-600"
                      onClick={() => communityService.messageDoctor(pro.name)}
                    >
                      Message
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => communityService.viewDoctorProfile(pro.name)}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-serenity-50 rounded-lg border border-serenity-100">
            <h3 className="font-medium mb-2">Schedule a Session</h3>
            <p className="text-sm mb-3">
              Connect with a mental health professional for a personalized consultation.
            </p>
            <Button className="bg-serenity-500 hover:bg-serenity-600">
              Book Appointment
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="groups">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportGroups.map((group) => (
              <Card key={group.id} className="serenimind-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{group.name}</span>
                    {group.isJoined && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Joined</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Users size={16} className="mr-2" />
                    {group.members} members
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-2" />
                    Next meeting: {group.nextMeeting}
                  </div>
                </CardContent>
                <CardFooter>
                  {group.isJoined ? (
                    <Button 
                      className="w-full bg-serenity-500 hover:bg-serenity-600"
                      onClick={() => communityService.viewSupportGroup(group.name)}
                    >
                      View Group
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => communityService.joinSupportGroup(group.name)}
                    >
                      Join Group
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            <Card className="serenimind-card border-dashed border-2 flex flex-col justify-center items-center text-center p-6">
              <Users size={30} className="text-gray-400 mb-2" />
              <h3 className="font-medium mb-1">Create a New Group</h3>
              <p className="text-sm text-gray-500 mb-3">
                Start your own support group for a specific mental health topic.
              </p>
              <Button 
                variant="outline"
                onClick={communityService.createSupportGroup}
              >
                Create Group
              </Button>
            </Card>
          </div>
          
          <div className="mt-6 p-4 bg-serenity-50 rounded-lg border border-serenity-100">
            <h3 className="font-medium mb-2">Upcoming Group Events</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium text-sm">Mindfulness Meditation Session</h4>
                  <p className="text-xs text-gray-500">Saturday, 10:00 AM - 11:00 AM</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => communityService.rsvpToEvent("Mindfulness Meditation Session")}
                >
                  RSVP
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-white rounded-lg border">
                <div>
                  <h4 className="font-medium text-sm">Coping with Anxiety Workshop</h4>
                  <p className="text-xs text-gray-500">Sunday, 2:00 PM - 3:30 PM</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => communityService.rsvpToEvent("Coping with Anxiety Workshop")}
                >
                  RSVP
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
