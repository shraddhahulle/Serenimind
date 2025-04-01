
import { toast } from '@/hooks/use-toast';

export const communityService = {
  messageDoctor: (doctorName: string) => {
    console.log(`User wants to message doctor: ${doctorName}`);
    toast({
      title: "Message Doctor",
      description: `Opening chat with ${doctorName}. You can discuss your concerns securely.`,
    });
    
    // Navigate to chat interface with the doctor
    window.location.href = `/community/chat?doctor=${encodeURIComponent(doctorName)}`;
  },
  
  viewDoctorProfile: (doctorName: string) => {
    console.log(`User wants to view profile of doctor: ${doctorName}`);
    toast({
      title: "Doctor Profile",
      description: `Loading ${doctorName}'s detailed profile and availability.`,
    });
    
    // Create a URL-friendly slug
    const slug = doctorName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Navigate to the doctor's profile page
    window.location.href = `/community/doctor/${slug}`;
  },
  
  viewSupportGroup: (groupName: string) => {
    console.log(`User wants to view support group: ${groupName}`);
    toast({
      title: "Group Access",
      description: `Loading the ${groupName} group content and discussions.`,
    });
    
    // Create a URL-friendly slug
    const slug = groupName.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the group's page
    window.location.href = `/community/group/${slug}`;
  },
  
  joinSupportGroup: (groupName: string) => {
    console.log(`User wants to join support group: ${groupName}`);
    toast({
      title: "Group Joined",
      description: `You have successfully joined the ${groupName} group.`,
    });
    
    // Create a URL-friendly slug
    const slug = groupName.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the group's page
    window.location.href = `/community/group/${slug}`;
  },
  
  createSupportGroup: () => {
    console.log("User wants to create a support group");
    toast({
      title: "Create Group",
      description: "Let's set up your new support group. What topic would you like to focus on?",
    });
    
    // Navigate to group creation page
    window.location.href = "/community/create-group";
  },
  
  rsvpToEvent: (eventName: string) => {
    console.log(`User wants to RSVP to event: ${eventName}`);
    toast({
      title: "RSVP Confirmed",
      description: `You're confirmed for the ${eventName}. We'll send you a reminder.`,
      variant: "default",
    });
    
    // Add to user's calendar and events
    window.location.href = `/calendar?event=${encodeURIComponent(eventName)}`;
  },
  
  editEvent: (eventName: string) => {
    console.log(`User wants to edit event: ${eventName}`);
    toast({
      title: "Edit Event",
      description: `You can now modify the details for ${eventName}.`,
    });
    
    // Navigate to event editing page
    window.location.href = `/community/event/edit?name=${encodeURIComponent(eventName)}`;
  },
  
  cancelEvent: (eventName: string) => {
    console.log(`User wants to cancel attendance for event: ${eventName}`);
    toast({
      title: "Attendance Cancelled",
      description: `You've cancelled your attendance for ${eventName}.`,
      variant: "destructive",
    });
    
    // Return to community page
    window.location.href = "/community";
  }
};
