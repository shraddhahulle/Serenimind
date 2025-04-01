
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Send, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SereniMind, your mental health companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (inputValue.toLowerCase().includes('anxious') || inputValue.toLowerCase().includes('anxiety')) {
        botResponse = "I notice you're feeling anxious. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through a longer anxiety relief meditation?";
      } else if (inputValue.toLowerCase().includes('sad') || inputValue.toLowerCase().includes('depressed')) {
        botResponse = "I'm sorry to hear you're feeling down. Remember that your feelings are valid, and it's okay to have difficult days. Would you like to talk more about what's bothering you, or would you prefer some self-care suggestions?";
      } else if (inputValue.toLowerCase().includes('happy') || inputValue.toLowerCase().includes('good')) {
        botResponse = "I'm glad to hear you're feeling good today! It's wonderful to acknowledge positive emotions. What's been contributing to your good mood?";
      } else if (inputValue.toLowerCase().includes('stress') || inputValue.toLowerCase().includes('stressed')) {
        botResponse = "Dealing with stress can be challenging. Have you tried any relaxation techniques recently? I can suggest some stress management exercises if you'd like.";
      } else if (inputValue.toLowerCase().includes('meditation') || inputValue.toLowerCase().includes('meditate')) {
        botResponse = "Meditation is a great practice for mental wellbeing. We have several guided meditations available. Would you like a quick meditation for stress relief, focus, or sleep?";
      } else if (inputValue.toLowerCase().includes('sleep') || inputValue.toLowerCase().includes('insomnia')) {
        botResponse = "Sleep difficulties can significantly impact your wellbeing. Have you established a regular sleep routine? I can share some techniques that might help improve your sleep quality.";
      } else {
        botResponse = "Thank you for sharing. How long have you been feeling this way? Would you like to explore some coping strategies together?";
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/lovable-uploads/f927041a-87a9-4643-aa06-887114740589.png" alt="SereniMind" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
            )}
            
            <Card className={`max-w-[80%] ${message.sender === 'user' ? 'bg-serenity-500 text-white' : 'bg-white'}`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </CardContent>
            </Card>
            
            {message.sender === 'user' && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/lovable-uploads/f927041a-87a9-4643-aa06-887114740589.png" alt="SereniMind" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Card className="bg-white">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Paperclip size={20} />
          </Button>
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          
          <Button variant="outline" size="icon" className="rounded-full">
            <Mic size={20} />
          </Button>
          
          <Button 
            onClick={handleSendMessage} 
            disabled={inputValue.trim() === ''} 
            className="rounded-full bg-serenity-500 hover:bg-serenity-600"
          >
            <Send size={20} />
          </Button>
        </div>
        
        {/* Quick responses */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => setInputValue("I'm feeling anxious today")}>
            I'm feeling anxious
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInputValue("I need help with stress")}>
            Help with stress
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInputValue("I'm having trouble sleeping")}>
            Sleep issues
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInputValue("I'd like a meditation")}>
            Suggest meditation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
