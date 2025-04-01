
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

// Resource content database (in real app this would come from an API)
const resourceContent: Record<string, {
  title: string;
  description: string;
  content: string[];
  tips: string[];
  resources: Array<{title: string; url: string}>;
}> = {
  'physical-self-care': {
    title: 'Physical Self-Care',
    description: 'Taking care of your body to improve your mental wellbeing',
    content: [
      'Physical self-care involves activities that improve your physical health, which in turn improves your mental health.',
      'Regular physical activity can reduce anxiety, depression, and negative mood by improving self-esteem and cognitive function.',
      'Quality sleep is essential for emotional regulation and cognitive functioning. Adults should aim for 7-9 hours of sleep per night.',
      'Nutrition plays a crucial role in mental health. A balanced diet rich in fruits, vegetables, lean protein, and whole grains can improve mood and energy levels.'
    ],
    tips: [
      'Start with just 5 minutes of physical activity daily and gradually increase',
      'Keep a water bottle nearby to stay hydrated throughout the day',
      'Set a consistent sleep schedule, even on weekends',
      'Practice stretching or gentle yoga to reduce muscle tension',
      'Take breaks from sitting every hour to move your body'
    ],
    resources: [
      {title: 'American Heart Association Physical Activity Guidelines', url: 'https://www.heart.org/en/healthy-living/fitness/fitness-basics/aha-recs-for-physical-activity-in-adults'},
      {title: 'Sleep Foundation', url: 'https://www.sleepfoundation.org/'},
      {title: 'MyPlate - Healthy Eating Guidelines', url: 'https://www.myplate.gov/'}
    ]
  },
  'mental-self-care': {
    title: 'Mental Self-Care',
    description: 'Activities that stimulate your mind and keep it healthy',
    content: [
      'Mental self-care includes activities that keep your mind sharp and help you stay intellectually engaged.',
      'Learning new skills or hobbies can increase your sense of accomplishment and purpose.',
      'Mindfulness practices can reduce rumination and stress while improving focus and attention.',
      'Taking breaks from information overload and digital devices is essential for mental clarity.'
    ],
    tips: [
      'Read a book or listen to a podcast on a new topic',
      'Do crossword puzzles, sudoku, or other brain games',
      'Practice mindfulness meditation for 5-10 minutes daily',
      'Take a digital detox for at least one hour before bed',
      'Learn something new each week, no matter how small'
    ],
    resources: [
      {title: 'Headspace - Guided Meditation App', url: 'https://www.headspace.com/'},
      {title: 'Khan Academy - Free Online Courses', url: 'https://www.khanacademy.org/'},
      {title: 'TED Talks - Ideas Worth Spreading', url: 'https://www.ted.com/talks'}
    ]
  },
  'emotional-self-care': {
    title: 'Emotional Self-Care',
    description: 'Healthy ways to process and express your feelings',
    content: [
      'Emotional self-care involves acknowledging and addressing your feelings in healthy ways.',
      'Journaling can help you process emotions and gain insights into patterns in your emotional responses.',
      'Talking with supportive friends or a therapist provides validation and different perspectives.',
      'Setting healthy boundaries protects your emotional wellbeing and prevents burnout.'
    ],
    tips: [
      'Practice naming your emotions with specificity',
      "Keep a gratitude journal and write down 3 things you're thankful for daily",
      'Allow yourself to feel emotions without judgment',
      'Use creative expression like art, music, or dance to process feelings',
      'Schedule time for activities that bring you joy'
    ],
    resources: [
      {title: 'Therapy Worksheets - Psychology Tools', url: 'https://www.psychologytools.com/'},
      {title: 'The Gottman Institute - Relationship Resources', url: 'https://www.gottman.com/'},
      {title: 'Greater Good Magazine - Science-Based Insights for a Meaningful Life', url: 'https://greatergood.berkeley.edu/'}
    ]
  },
  'social-self-care': {
    title: 'Social Self-Care',
    description: 'Building and maintaining healthy relationships',
    content: [
      'Social self-care focuses on nurturing your relationships with others and maintaining a support network.',
      'Quality social connections are linked to longer lifespans, better immune function, and reduced anxiety and depression.',
      'Setting healthy boundaries in relationships is a critical aspect of social self-care.',
      'Both giving and receiving support contributes to wellbeing and a sense of belonging.'
    ],
    tips: [
      'Schedule regular check-ins with friends and family',
      'Join a club or group related to your interests',
      'Practice active listening in your conversations',
      'Learn to say no when you need to protect your energy',
      'Express appreciation to those who support you'
    ],
    resources: [
      {title: 'Meetup - Find Local Groups', url: 'https://www.meetup.com/'},
      {title: 'How to Build Better Boundaries - PsychCentral', url: 'https://psychcentral.com/health/how-to-set-boundaries'},
      {title: 'Volunteer Match - Find Volunteer Opportunities', url: 'https://www.volunteermatch.org/'}
    ]
  },
  'spiritual-self-care': {
    title: 'Spiritual Self-Care',
    description: 'Nurturing your sense of purpose and meaning',
    content: [
      'Spiritual self-care involves activities that nurture your spirit and help you find meaning in life.',
      'This can involve religious practices for some, while for others it might be connecting with nature or practicing mindfulness.',
      'Research shows that spiritual practices can reduce stress, prevent depression, and improve quality of life.',
      'Having a sense of purpose and meaning is associated with better health outcomes and greater resilience.'
    ],
    tips: [
      'Spend time in nature and observe its beauty',
      'Practice meditation or prayer',
      'Reflect on your values and how they guide your decisions',
      'Engage in acts of service or volunteer work',
      'Create a personal ritual that brings you peace'
    ],
    resources: [
      {title: 'Insight Timer - Free Meditation App', url: 'https://insighttimer.com/'},
      {title: 'Greater Good in Action - Science-Based Practices for a Meaningful Life', url: 'https://ggia.berkeley.edu/'},
      {title: 'All Trails - Find Hiking Trails Near You', url: 'https://www.alltrails.com/'}
    ]
  },
  'practical-self-care': {
    title: 'Practical Self-Care',
    description: 'Everyday tasks that contribute to wellbeing',
    content: [
      'Practical self-care involves attending to everyday needs and creating systems that reduce stress.',
      'Organizing your environment can reduce cognitive load and create a sense of calm.',
      'Time management strategies help prevent burnout and create space for activities that matter to you.',
      'Financial self-care includes creating budgets, saving, and making informed spending decisions.'
    ],
    tips: [
      'Declutter your space 15 minutes each day',
      'Create a simple morning routine to start your day intentionally',
      'Use a calendar or planner to track appointments and tasks',
      'Prepare meals in advance when possible',
      'Take breaks throughout your workday to refresh your mind'
    ],
    resources: [
      {title: 'Mint - Free Budget Tracker and Planner', url: 'https://mint.intuit.com/'},
      {title: 'The Life-Changing Magic of Tidying Up - Marie Kondo', url: 'https://konmari.com/'},
      {title: 'Pomodoro Technique for Time Management', url: 'https://francescocirillo.com/pages/pomodoro-technique'}
    ]
  },
  'daily-self-care-challenge': {
    title: 'Daily Self-Care Challenge',
    description: 'A 7-day journey to build sustainable self-care habits',
    content: [
      'This 7-day challenge helps you incorporate small, manageable self-care activities into your daily routine.',
      'Consistency with small actions builds neural pathways that make self-care become more automatic over time.',
      'The challenge addresses different dimensions of self-care to help you discover what works best for you.',
      'After completing the challenge, continue with the practices that resonated most with you.'
    ],
    tips: [
      'Day 1: Take a 10-minute walk outdoors',
      "Day 2: Write down 3 things you're grateful for",
      'Day 3: Connect with a friend or family member',
      'Day 4: Practice 5 minutes of deep breathing',
      'Day 5: Declutter one small space in your home',
      'Day 6: Do something creative for 15 minutes',
      'Day 7: Reflect on which practices felt most beneficial'
    ],
    resources: [
      {title: 'Self-Care Assessment Worksheet', url: 'https://www.therapistaid.com/therapy-worksheet/self-care-assessment'},
      {title: 'Tiny Habits by BJ Fogg', url: 'https://tinyhabits.com/'},
      {title: 'Self-Care Starter Kit - University at Buffalo', url: 'https://socialwork.buffalo.edu/resources/self-care-starter-kit.html'}
    ]
  }
};

const ResourceDetail = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<typeof resourceContent[keyof typeof resourceContent] | null>(null);

  useEffect(() => {
    if (topicSlug && resourceContent[topicSlug]) {
      setResource(resourceContent[topicSlug]);
    }
  }, [topicSlug]);

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
        <p className="mb-6">We couldn't find the resource you're looking for.</p>
        <Button onClick={() => navigate('/resources')}>
          Return to Resources
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/resources')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Button>
      </div>

      <h1 className="text-2xl font-bold">{resource.title}</h1>
      <p className="text-gray-600">{resource.description}</p>

      <Card>
        <CardHeader>
          <CardTitle>About {resource.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resource.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practical Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {resource.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {resource.resources.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-serenity-600 hover:underline"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceDetail;
