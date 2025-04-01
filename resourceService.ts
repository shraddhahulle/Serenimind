import { toast } from '@/hooks/use-toast';

export const resourceService = {
  learnMore: (topic: string) => {
    console.log(`User wants to learn more about: ${topic}`);
    toast({
      title: "Additional Resources",
      description: `Loading more information about ${topic}...`,
    });
    
    // Create a URL-friendly slug from the topic name
    const slug = topic.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to detailed page based on topic
    window.location.href = `/resources/topic/${slug}`;
  },
  
  startThoughtRecord: () => {
    console.log("User started a thought record");
    toast({
      title: "Thought Record Started",
      description: "Your CBT thought record has been created. Track your thoughts and emotions here.",
    });
    
    // Navigate to thought record form
    window.location.href = "/resources/thought-record";
  },
  
  practiceReframing: () => {
    console.log("User wants to practice reframing");
    toast({
      title: "Reframing Practice",
      description: "Let's work on reframing negative thoughts into more positive ones.",
    });
    
    // Navigate to reframing exercise
    window.location.href = "/resources/reframing-exercise";
  },
  
  trySleepMeditation: () => {
    console.log("User wants to try sleep meditation");
    toast({
      title: "Sleep Meditation",
      description: "Starting a calming meditation to help you sleep better.",
    });
    
    // Navigate to the meditation page with sleep category selected
    window.location.href = "/meditation?category=sleep";
  },
  
  startSleepJournal: () => {
    console.log("User wants to start a sleep journal");
    toast({
      title: "Sleep Journal Created",
      description: "Track your sleep patterns and habits to improve your rest.",
    });
    
    // Navigate to sleep journal form
    window.location.href = "/resources/sleep-journal";
  },
  
  createSafetyPlan: () => {
    console.log("User wants to create a safety plan");
    toast({
      title: "Safety Plan",
      description: "Creating a personal safety plan to help during difficult moments.",
    });
    
    // Navigate to safety plan form
    window.location.href = "/resources/safety-plan";
  }
};
