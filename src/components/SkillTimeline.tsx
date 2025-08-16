
import React from 'react';
import { cn } from '@/lib/utils';
import ScrollAnimation from './ScrollAnimation';
import { BookOpen, Code, Award } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: 'study' | 'code' | 'award';
  skills: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: '2023',
    title: 'Started with Python',
    description: 'Began my programming journey at college, learning Python fundamentals and building a strong coding foundation.',
    icon: 'study',
    skills: ['Python']
  },
  {
    year: '2024',
    title: 'Machine Learning & Deep Learning',
    description: 'Dived into machine learning and deep learning, completed foundational courses, and worked on Kaggle basic projects to apply new skills.',
    icon: 'study',
    skills: ['Machine Learning', 'Deep Learning', 'Kaggle']
  },
  {
    year: '2024',
    title: 'Major Projects',
    description: 'Built and deployed real-world AI/ML projects, gaining hands-on experience in model development and deployment.',
    icon: 'code',
    skills: ['AI Projects', 'Deployment', 'Model Building']
  },
  {
    year: '2025',
    title: 'Open Source, Nexarch & Codeforces',
    description: 'Started contributing to open source for real-world impact. Began developing Nexarch (AI-powered auto CEO) as a personal project. Also started competitive programming and participating in Codeforces contests from June 2025.',
    icon: 'award',
    skills: ['Open Source', 'Nexarch', 'Competitive Programming', 'Codeforces']
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'study':
      return <BookOpen className="w-5 h-5" />;
    case 'code':
      return <Code className="w-5 h-5" />;
    case 'award':
      return <Award className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

const SkillTimeline: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-ai-purple/10 via-ai-purple/50 to-ai-blue/30" />
      
      {/* Timeline items */}
      {timelineData.map((item, index) => (
        <ScrollAnimation 
          key={index} 
          animation={index % 2 === 0 ? 'slide-in-right' : 'slide-in-left'} 
          delay={index * 100}
          className="mb-16"
        >
          <div className={cn(
            "relative flex items-center",
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          )}>
            {/* Timeline node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full z-10 flex items-center justify-center bg-gradient-to-br from-ai-purple to-ai-blue">
              {getIcon(item.icon)}
            </div>
            
            {/* Content */}
            <div className={cn(
              "w-5/12 glass-card p-5 rounded-lg backdrop-blur-md",
              index % 2 === 0 ? "pr-10" : "pl-10"
            )}>
              <div className="bg-gradient-to-r from-ai-purple to-ai-blue bg-clip-text text-transparent font-bold mb-1">
                {item.year}
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white/70 mb-4">{item.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-1 text-xs bg-ai-purple/20 text-ai-purple rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Spacer */}
            <div className="w-5/12" />
          </div>
        </ScrollAnimation>
      ))}
    </div>
  );
};

export default SkillTimeline;
