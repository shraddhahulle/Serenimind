
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Headphones, Calendar as CalendarIcon, Clock, Plus, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Mock data for scheduled events
const mockEvents = [
  {
    id: 1,
    title: 'Mindfulness Meditation',
    date: new Date(2023, 7, 15),
    time: '9:00 AM',
    type: 'meditation',
    description: 'Daily mindfulness practice'
  },
  {
    id: 2,
    title: 'Anxiety Support Group',
    date: new Date(2023, 7, 17),
    time: '6:30 PM',
    type: 'group',
    description: 'Weekly support group session'
  },
  {
    id: 3,
    title: 'Therapy Session',
    date: new Date(2023, 7, 20),
    time: '2:00 PM',
    type: 'therapy',
    description: 'Session with Dr. Jennifer Adams'
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [events, setEvents] = useState(mockEvents);
  const [showAddEvent, setShowAddEvent] = useState(false);
  
  // State for new event
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '12:00',
    type: 'meditation',
    description: '',
  });
  
  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
    };
    
    setEvents([...events, event]);
    setShowAddEvent(false);
    
    // Reset form
    setNewEvent({
      title: '',
      date: new Date(),
      time: '12:00',
      type: 'meditation',
      description: '',
    });
  };
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => {
    return (
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  });
  
  // Function to determine if a day has events
  const dayHasEvents = (day: Date) => {
    return events.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
          <DialogTrigger asChild>
            <Button className="bg-serenity-500 hover:bg-serenity-600">
              <Plus size={16} className="mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input 
                  id="title" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={format(newEvent.date, 'yyyy-MM-dd')}
                    onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Select 
                  value={newEvent.type}
                  onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meditation">Meditation</SelectItem>
                    <SelectItem value="therapy">Therapy Session</SelectItem>
                    <SelectItem value="group">Support Group</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Add any additional details"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddEvent(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddEvent}
                disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                className="bg-serenity-500 hover:bg-serenity-600"
              >
                Save Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-7/12 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">
                      {date ? format(date, 'MMMM yyyy') : 'Select a date'}
                    </h2>
                    <div className="flex">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={cn("rounded-r-none", view === 'day' ? 'bg-serenity-100' : '')}
                        onClick={() => setView('day')}
                      >
                        Day
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={cn("rounded-none", view === 'week' ? 'bg-serenity-100' : '')}
                        onClick={() => setView('week')}
                      >
                        Week
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={cn("rounded-l-none", view === 'month' ? 'bg-serenity-100' : '')}
                        onClick={() => setView('month')}
                      >
                        Month
                      </Button>
                    </div>
                  </div>
                  
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvents: (date) => dayHasEvents(date),
                    }}
                    modifiersClassNames={{
                      hasEvents: 'bg-serenity-100 font-medium text-serenity-700',
                    }}
                  />
                </div>
                
                <div className="md:w-5/12 border-t md:border-t-0 md:border-l">
                  <div className="p-4">
                    <h2 className="text-lg font-medium flex items-center">
                      <CalendarIcon size={18} className="mr-2" />
                      {date ? format(date, 'EEEE, MMMM d, yyyy') : 'No date selected'}
                    </h2>
                    
                    {selectedDateEvents.length > 0 ? (
                      <div className="mt-4 space-y-3">
                        {selectedDateEvents.map(event => (
                          <Card key={event.id} className="bg-gray-50">
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full 
                                  ${event.type === 'meditation' ? 'bg-serenity-100 text-serenity-700' : 
                                    event.type === 'therapy' ? 'bg-blue-100 text-blue-700' : 
                                    'bg-green-100 text-green-700'}`
                                }>
                                  {event.type === 'meditation' ? (
                                    <Headphones size={16} />
                                  ) : event.type === 'therapy' ? (
                                    <Users size={16} />
                                  ) : (
                                    <Users size={16} />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{event.title}</p>
                                  <p className="text-xs text-gray-500 flex items-center">
                                    <Clock size={12} className="mr-1" /> {event.time}
                                  </p>
                                  {event.description && (
                                    <p className="text-sm mt-1">{event.description}</p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-6 text-center py-6">
                        <p className="text-gray-500">No events scheduled for this day</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setShowAddEvent(true)}
                        >
                          <Plus size={14} className="mr-1" />
                          Add Event
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(event => (
                    <Card key={event.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full 
                            ${event.type === 'meditation' ? 'bg-serenity-100 text-serenity-700' : 
                              event.type === 'therapy' ? 'bg-blue-100 text-blue-700' : 
                              'bg-green-100 text-green-700'}`
                          }>
                            {event.type === 'meditation' ? (
                              <Headphones size={18} />
                            ) : event.type === 'therapy' ? (
                              <Users size={18} />
                            ) : (
                              <Users size={18} />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <CalendarIcon size={14} className="mr-1" />
                              {format(event.date, 'EEEE, MMMM d, yyyy')} at {event.time}
                            </p>
                            {event.description && (
                              <p className="text-sm mt-2">{event.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calendar;
