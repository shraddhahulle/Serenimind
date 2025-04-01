
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  MessageCircle, 
  BarChart2, 
  Headphones, 
  BookOpen, 
  Users, 
  User, 
  Calendar,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NotificationPanel from './NotificationPanel';

const Navigation: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/45938a3c-1ee7-4036-8702-2831dd7ea230.png" 
                alt="SereniMind Logo" 
                className="h-10"
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" end className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">Home</span>
            </NavLink>
            <NavLink to="/chat" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                Chat
              </span>
            </NavLink>
            <NavLink to="/mood-tracker" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">
                <BarChart2 size={16} />
                Mood Tracker
              </span>
            </NavLink>
            <NavLink to="/meditation" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">
                <Headphones size={16} />
                Meditation
              </span>
            </NavLink>
            <NavLink to="/resources" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">
                <BookOpen size={16} />
                Resources
              </span>
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">
                <Users size={16} />
                Community
              </span>
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                Calendar
              </span>
            </NavLink>
          </nav>
          
          <div className="flex items-center space-x-3">
            <NotificationPanel />
            
            <Link to="/profile">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="grid grid-cols-5 gap-1">
          <NavLink to="/" end className="flex flex-col items-center py-2 text-xs">
            <span className="text-gray-600">Home</span>
          </NavLink>
          <NavLink to="/chat" className="flex flex-col items-center py-2 text-xs">
            <MessageCircle size={16} className="mb-1" />
            <span className="text-gray-600">Chat</span>
          </NavLink>
          <NavLink to="/meditation" className="flex flex-col items-center py-2 text-xs">
            <Headphones size={16} className="mb-1" />
            <span className="text-gray-600">Meditate</span>
          </NavLink>
          <NavLink to="/community" className="flex flex-col items-center py-2 text-xs">
            <Users size={16} className="mb-1" />
            <span className="text-gray-600">Community</span>
          </NavLink>
          <NavLink to="/profile" className="flex flex-col items-center py-2 text-xs">
            <User size={16} className="mb-1" />
            <span className="text-gray-600">Profile</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
