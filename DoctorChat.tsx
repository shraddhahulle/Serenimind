
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Sample predefined doctor responses for different topics
const doctorResponses = {
  greeting: [
    "Hello! How are you feeling today?",
    "It's good to connect with you. What brings you here today?",
    "Hi there! How can I assist you with your mental health today?",
    "Welcome! What would you like to discuss in our chat today?"
  ],
  anxiety: [
    "Anxiety can be challenging to manage. Have you tried any breathing exercises?",
    "It's common to experience anxiety. Could you tell me more about your symptoms?",
    "I understand anxiety can be overwhelming. Are there specific triggers you've noticed?",
    "Let's explore some coping strategies for your anxiety. What has helped in the past?"
  ],
  depression: [
    "I'm sorry to hear you're feeling down. Have you noticed any changes in your sleep or appetite?",
    "Depression can make everyday tasks feel difficult. How has your energy level been lately?",
    "It's important to be gentle with yourself during these times. Are you able to engage in any self-care?",
    "Would you like to discuss some strategies that might help with managing depression symptoms?"
  ],
  sleep: [
    "Sleep difficulties can significantly impact your wellbeing. Have you established a regular sleep routine?",
    "Have you noticed any patterns in your sleep disturbances?",
    "Let's discuss some techniques that might help improve your sleep quality.",
    "Poor sleep can affect your mood and energy. How many hours do you typically sleep each night?"
  ],
  general: [
    "Thank you for sharing. Could you tell me more about how this has been affecting your daily life?",
    "I appreciate your openness. How long have you been experiencing these feelings?",
    "That sounds challenging. What support systems do you currently have in place?",
    "Everyone's mental health journey is unique. What strategies have you found helpful so far?"
  ]
};

// Helper function to get a random response from a category
const getRandomResponse = (category) => {
  const responses = doctorResponses[category] || doctorResponses.general;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

const DoctorChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: number;
    sender: 'user' | 'doctor';
    text: string;
    time: string;
  }>>([]);
  const [doctorName, setDoctorName] = useState('');
  const [doctorAvatar, setDoctorAvatar] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Extract doctor name from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const doctor = queryParams.get('doctor') || 'Dr. Jennifer Adams';
    setDoctorName(doctor);
    
    // Set a default avatar
    setDoctorAvatar('https://i.pravatar.cc/150?img=25');
    
    // Add initial greeting message
    setMessages([
      {
        id: 1,
        sender: 'doctor',
        text: `Hello! I'm ${doctor}. How can I assist you today?`,
        time: formatTime(new Date())
      }
    ]);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      text: message,
      time: formatTime(new Date())
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered to the doctor."
    });
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate doctor response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      
      const doctorResponse = {
        id: messages.length + 2,
        sender: 'doctor' as const,
        text: getDoctorResponse(message),
        time: formatTime(new Date())
      };
      
      setMessages(prev => [...prev, doctorResponse]);
      
      toast({
        title: "New Message",
        description: `${doctorName} has responded to your message.`
      });
    }, 1500);
  };
  
  // Response generator with more variations
  const getDoctorResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return getRandomResponse('anxiety');
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('depression')) {
      return getRandomResponse('depression');
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return getRandomResponse('sleep');
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return getRandomResponse('greeting');
    }
    
    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return "I'd need to have a proper consultation to discuss medication options. Would you like to schedule a video appointment to discuss this in more detail?";
    }
    
    return getRandomResponse('general');
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
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={doctorAvatar} alt={doctorName} />
            <AvatarFallback>{doctorName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{doctorName}</h1>
            <p className="text-xs text-gray-500">Online now</p>
          </div>
        </div>
      </div>
      
      <Card className="h-[calc(100vh-220px)] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-4 pt-0 pb-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'doctor' && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={doctorAvatar} alt={doctorName} />
                  <AvatarFallback>{doctorName.substring(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-serenity-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-serenity-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
              
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8 ml-2 mt-1">
                  <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={doctorAvatar} alt={doctorName} />
                <AvatarFallback>{doctorName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Type your message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={message.trim() === ''}
              className="bg-serenity-500 hover:bg-serenity-600 p-2 h-10 w-10"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorChat;
