
import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
  type: 'meditation' | 'message' | 'appointment' | 'system';
};

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New message from Dr. Jennifer Adams',
    description: 'Please review your latest test results.',
    time: '10 minutes ago',
    read: false,
    link: '/community/chat?doctor=Dr.%20Jennifer%20Adams',
    type: 'message'
  },
  {
    id: '2',
    title: 'Meditation reminder',
    description: 'Your scheduled Deep Sleep meditation starts in 30 minutes.',
    time: '25 minutes ago',
    read: false,
    link: '/meditation',
    type: 'meditation'
  },
  {
    id: '3',
    title: 'Upcoming appointment',
    description: 'Therapy session with Dr. Michael Wong tomorrow at 2:00 PM.',
    time: '2 hours ago',
    read: true,
    link: '/calendar',
    type: 'appointment'
  }
];

const NotificationPanel = () => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      navigate(notification.link);
    }
  };
  
  const getIconForNotificationType = (type: string) => {
    switch (type) {
      case 'meditation':
        return <div className="bg-green-100 p-2 rounded-full"><Bell className="h-4 w-4 text-green-600" /></div>;
      case 'message':
        return <div className="bg-blue-100 p-2 rounded-full"><Bell className="h-4 w-4 text-blue-600" /></div>;
      case 'appointment':
        return <div className="bg-purple-100 p-2 rounded-full"><Bell className="h-4 w-4 text-purple-600" /></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-full"><Bell className="h-4 w-4 text-gray-600" /></div>;
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-serenity-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 font-medium">
          <h3>Notifications</h3>
        </div>
        <Separator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-serenity-50' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  {getIconForNotificationType(notification.type)}
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-serenity-500 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
