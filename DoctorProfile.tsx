
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, MessageCircle, Calendar, Clock, Star, MapPin, GraduationCap, Award, Stethoscope } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { communityService } from '@/services/communityService';

// Sample doctor data - in a real app, this would come from an API
const doctorProfiles = [
  {
    id: 'dr-jennifer-adams',
    name: 'Dr. Jennifer Adams',
    title: 'Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    avatar: 'https://i.pravatar.cc/150?img=25',
    bio: 'Dr. Adams is a licensed clinical psychologist with over 12 years of experience helping adults manage anxiety, depression, and trauma. She uses a combination of cognitive-behavioral therapy (CBT), mindfulness, and compassion-focused approaches.',
    education: [
      { degree: 'Ph.D. in Clinical Psychology', school: 'Stanford University', year: '2010' },
      { degree: 'M.A. in Psychology', school: 'University of California, Berkeley', year: '2007' },
      { degree: 'B.S. in Psychology', school: 'University of Michigan', year: '2005' },
    ],
    experience: [
      { role: 'Clinical Psychologist', organization: 'Serenity Mental Health Center', period: '2015 - Present' },
      { role: 'Staff Psychologist', organization: 'Community Wellness Center', period: '2011 - 2015' },
      { role: 'Psychology Intern', organization: 'University Medical Center', period: '2009 - 2010' },
    ],
    availability: [
      { day: 'Monday', times: '9:00 AM - 3:00 PM' },
      { day: 'Tuesday', times: '1:00 PM - 7:00 PM' },
      { day: 'Thursday', times: '9:00 AM - 5:00 PM' },
      { day: 'Friday', times: '10:00 AM - 4:00 PM' },
    ],
    rating: 4.9,
    reviews: 78,
    location: 'San Francisco, CA (Virtual & In-person)',
    nextAvailable: 'Tomorrow',
  },
  {
    id: 'dr-michael-brown',
    name: 'Dr. Michael Brown',
    title: 'Psychiatrist',
    specialties: ['Bipolar Disorder', 'Schizophrenia', 'ADHD'],
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Dr. Brown is a board-certified psychiatrist specializing in mood disorders, ADHD, and sleep issues. He takes a holistic approach to mental health, considering lifestyle factors, nutrition, and medication when appropriate.',
    education: [
      { degree: 'M.D.', school: 'Johns Hopkins University', year: '2008' },
      { degree: 'Psychiatry Residency', school: 'Massachusetts General Hospital', year: '2012' },
      { degree: 'B.S. in Neuroscience', school: 'Duke University', year: '2004' },
    ],
    experience: [
      { role: 'Chief Psychiatrist', organization: 'Serenity Mental Health Center', period: '2018 - Present' },
      { role: 'Attending Psychiatrist', organization: 'University Hospital', period: '2012 - 2018' },
    ],
    availability: [
      { day: 'Monday', times: '1:00 PM - 7:00 PM' },
      { day: 'Wednesday', times: '9:00 AM - 5:00 PM' },
      { day: 'Friday', times: '9:00 AM - 12:00 PM' },
    ],
    rating: 4.7,
    reviews: 63,
    location: 'Chicago, IL (Virtual & In-person)',
    nextAvailable: 'Next Week',
  },
  {
    id: 'dr-sarah-lee',
    name: 'Dr. Sarah Lee',
    title: 'Licensed Therapist',
    specialties: ['Relationship Issues', 'Grief', 'Stress'],
    avatar: 'https://i.pravatar.cc/150?img=30',
    bio: 'Dr. Lee is a licensed therapist with expertise in relationship issues, grief counseling, and stress management. She uses a client-centered approach that draws from various therapeutic modalities including psychodynamic, humanistic, and solution-focused therapy.',
    education: [
      { degree: 'Ph.D. in Counseling Psychology', school: 'Columbia University', year: '2011' },
      { degree: 'M.A. in Counseling', school: 'New York University', year: '2008' },
      { degree: 'B.A. in Psychology', school: 'Boston College', year: '2006' },
    ],
    experience: [
      { role: 'Senior Therapist', organization: 'Serenity Mental Health Center', period: '2017 - Present' },
      { role: 'Therapist', organization: 'Family Counseling Center', period: '2011 - 2017' },
    ],
    availability: [
      { day: 'Tuesday', times: '10:00 AM - 6:00 PM' },
      { day: 'Thursday', times: '12:00 PM - 8:00 PM' },
      { day: 'Saturday', times: '9:00 AM - 1:00 PM' },
    ],
    rating: 4.8,
    reviews: 55,
    location: 'New York, NY (Virtual Only)',
    nextAvailable: 'Today',
  },
];

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctor, setDoctor] = useState<any>(null);
  
  useEffect(() => {
    // Find the doctor by ID
    const foundDoctor = doctorProfiles.find(doc => doc.id === doctorId);
    
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      // If doctor not found, use the first doctor in the list
      setDoctor(doctorProfiles[0]);
    }
  }, [doctorId]);
  
  if (!doctor) {
    return <div>Loading...</div>;
  }
  
  const handleBookAppointment = () => {
    toast({
      title: "Appointment Request Sent",
      description: `Your appointment request with ${doctor.name} has been sent.`,
    });
    navigate('/calendar?newAppointment=true');
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
        <h1 className="text-2xl font-bold">Doctor Profile</h1>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="text-center mt-4 space-y-2">
                <div className="flex items-center justify-center text-amber-500">
                  {Array.from({ length: Math.floor(doctor.rating) }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  {doctor.rating % 1 !== 0 && (
                    <Star size={16} fill="currentColor" className="opacity-50" />
                  )}
                </div>
                <p className="text-sm">{doctor.rating} ({doctor.reviews} reviews)</p>
                
                <div className="flex items-center justify-center text-gray-600 gap-1">
                  <MapPin size={14} />
                  <p className="text-sm">{doctor.location}</p>
                </div>
                
                <div className="pt-2 space-y-2">
                  <Button 
                    className="w-full bg-serenity-500 hover:bg-serenity-600"
                    onClick={() => communityService.messageDoctor(doctor.name)}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Message
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleBookAppointment}
                  >
                    <Calendar size={16} className="mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-2 mb-4">
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-gray-500">{doctor.title}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {doctor.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center text-sm text-green-600 mb-4">
                <Clock size={16} className="mr-1" />
                Next available: {doctor.nextAvailable}
              </div>
              
              <p className="text-sm mb-6">{doctor.bio}</p>
              
              <Tabs defaultValue="experience">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="space-y-4">
                  {doctor.experience.map((exp: any, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-0.5">
                        <Stethoscope size={18} className="text-serenity-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{exp.role}</h3>
                        <p className="text-sm text-gray-600">{exp.organization}</p>
                        <p className="text-xs text-gray-500">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="education" className="space-y-4">
                  {doctor.education.map((edu: any, index: number) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-0.5">
                        <GraduationCap size={18} className="text-serenity-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                        <p className="text-xs text-gray-500">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  {doctor.availability.map((avail: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
                      <p className="font-medium">{avail.day}</p>
                      <p className="text-sm text-gray-600">{avail.times}</p>
                    </div>
                  ))}
                  
                  <Button 
                    className="w-full mt-4 bg-serenity-500 hover:bg-serenity-600"
                    onClick={handleBookAppointment}
                  >
                    <Calendar size={16} className="mr-2" />
                    Book Appointment
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
