
import * as React from 'react';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import Header from '@/components/Header';
import ParticlesBackground from '@/components/ParticlesBackground';
import TypingEffect from '@/components/TypingEffect';
import ProjectCard from '@/components/ProjectCard';
import ScrollAnimation from '@/components/ScrollAnimation';
import SkillTimeline from '@/components/SkillTimeline';
import Footer from '@/components/Footer';
import NeuralNetworkAnimation from '@/components/NeuralNetworkAnimation';
import NeuralModel3D from '@/components/NeuralModel3D';
import { ArrowDown, Brain, ChevronRight, Download, Github } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

// Fetch projects from backend

// Skill categories
const skills = [
  "Python", "R", "Java", "SQL",
  "TensorFlow", "PyTorch", "scikit-learn", "Keras", "Flask", "FastAPI", "Streamlit", "Pandas", "NumPy",
  "Matplotlib", "Seaborn", "JAX", "NLTK", "spaCy", "Hugging Face Transformers", "OpenCV", "XGBoost", "LightGBM", "Plotly", "Docker", "Git", "GitHub",
  "Artificial Intelligence", "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
  "Data Structures", "Algorithms", "Competitive Programming"
];

// Achievements/badges data
const achievements = [
  {
    title: "Kaggle Contributor & Participant",
    year: "2022-Present",
    description: "Active participant in Kaggle contests and author of notebooks on Reinforcement Learning Algorithms.",
    icon: "🏆",
  },
  {
    title: "CS50P: Introduction to Programming with Python",
    year: "2023",
    description: "Harvard University (CS50P) – Introduction to programming, problem-solving, and Python fundamentals.",
    icon: "🐍",
  },
  {
    title: "CS50x: Introduction to Computer Science",
    year: "2023",
    description: "Harvard University (CS50x) – Comprehensive foundation in computer science, algorithms, and software engineering.",
    icon: "🎓",
  },
  {
    title: "CS50AI: Introduction to Artificial Intelligence with Python",
    year: "2024",
    description: "Harvard University (CS50AI) – Search, knowledge, inference, optimization, and machine learning with Python.",
    icon: "🤖",
  },
  {
    title: "Machine Learning Specialization",
    year: "2024",
    description: "Stanford University (Coursera) – Supervised/unsupervised learning, best practices, and real-world ML applications.",
    icon: "�",
  },
  {
    title: "Deep Learning Specialization",
    year: "2024",
    description: "DeepLearning.AI (Coursera) – Neural networks, CNNs, RNNs, and advanced deep learning techniques.",
    icon: "🧠",
  },
  {
    title: "Data Structures & Algorithms Certificate",
    year: "2024",
    description: "UC San Diego (Coursera) – Comprehensive study of data structures (arrays, linked lists, trees, etc.) and algorithmic techniques for computational problem-solving.",
    icon: "🧩",
  },
];

const Index: React.FC = () => {
  const { theme } = useTheme();

  // Static project data
  const projects = [
    {
      title: "Stock Market Prediction",
      description: "Developed a predictive model to forecast stock prices using historical market data. Implemented feature engineering, data preprocessing, and visualization to identify trends and patterns. Trained and evaluated an LSTM-based deep learning model to capture time-series dependencies and improve prediction accuracy.",
      image: "/stock-market.jpg",
      tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "LSTM", "TensorFlow", "Keras", "Data Visualization"],
      githubUrl: "https://github.com/Aniketsy/stock-market-prediction",
      demoUrl: ""
    },
    {
      title: "AI - Health Platform",
      description: "Developed a health platform integrating computer vision and NLP to raise awareness on skin cancer and mental health. Created an NLP-powered conversational agent for emotional support and mental wellness tips. Integrated short, informative videos for health education.",
      image: "/ai-health-platform.jpg",
      tags: ["Python", "TensorFlow", "Keras", "OpenCV", "NLP", "NLTK", "Transformers", "Flask", "HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/Aniketsy/ai-health-platform",
      demoUrl: ""
    },
    {
      title: "Resume Analyzer (QuireBoard)",
      description: "Enables recruiters to process and analyze multiple resumes at once, ranking them based on job-specific criteria. Provides personalized feedback and keyword optimization suggestions for a single resume. Built with NLP and machine learning for resume parsing and ranking.",
      image: "/resume-analyzer.jpg",
      tags: ["Python", "NLP", "spaCy", "NLTK", "Scikit-learn", "Flask", "HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/Aniketsy/quireboard",
      demoUrl: ""
    }
  ];

  // useEffect removed; only static projects are used
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ParticlesBackground />
      
      {/* Hero Section */}
  <section id="hero" className="min-h-screen relative flex items-center justify-center pt-16">
        <NeuralNetworkAnimation />
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-ai-purple/20 text-ai-purple text-sm">
              <Brain size={16} className="mr-2" /> 
              AI, ML & Data Science Practitioner
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Welcome to my world of algorithms, equations, and artificial minds.
            </h1>
            
            <div className="text-xl md:text-2xl text-white/80 mb-10 h-[80px]">
              <TypingEffect 
                texts={[
                  "I develop machine learning models that solve real-world problems.",
                  "Specializing in computer vision and natural language processing.",
                  "Passionate about explainable AI and ethical machine learning.",
                  "Turning data into intelligent predictions and insights."
                ]}
                typingSpeed={50}
                className="font-mono"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-ai-purple to-ai-blue hover:from-ai-purple/90 hover:to-ai-blue/90 text-white font-medium transition-all duration-300 flex items-center justify-center group hover:scale-105"
              >
                View Projects
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
              </a>
              
              <a 
                href="/Aniket-Resume.pdf" 
                download
                className="px-6 py-3 rounded-lg bg-ai-dark/80 hover:bg-ai-dark border border-ai-purple/30 text-white font-medium transition-all hover:scale-105 flex items-center justify-center"
              >
                Download CV
                <Download size={18} className="ml-2" />
              </a>
            </div>
          </ScrollAnimation>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="w-12 h-12 rounded-full bg-ai-dark/70 flex items-center justify-center border border-ai-purple/30">
              <ArrowDown size={20} className="text-white/70" />
            </a>
          </div>
        </div>
      </section>
      
  {/* 3D Model Section */}
  <section className="py-10 relative z-10 overflow-hidden">
    <div className="container mx-auto px-4">
      <ScrollAnimation animation="fade-up">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient">
            Interactive Neural Network
          </h2>
        </div>
      </ScrollAnimation>
      <ScrollAnimation animation="scale-up" delay={300}>
        <NeuralModel3D />
      </ScrollAnimation>
    </div>
  </section>
      
  {/* About Section removed */}
      
      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">PROJECTS</span>
            {/* Heading removed as requested */}
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore a variety of projects demonstrating skills in software development, data analysis, and creative problem-solving across multiple domains.
            </p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ScrollAnimation 
                key={project.id || index}
                animation="fade-up"
                delay={index * 200}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags || []}
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                />
              </ScrollAnimation>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-ai-dark/80 hover:bg-ai-dark border border-ai-purple/30 text-white font-medium transition-all hover:scale-105"
            >
              View All Projects
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Skills Timeline Section */}
      <section id="timeline" className="py-20 bg-ai-dark/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">MY JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI Learning <span className="text-gradient">Timeline</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              My progression through the field of artificial intelligence and machine learning.
            </p>
          </ScrollAnimation>
          
            <SkillTimeline />
        </div>
      </section>
      
      {/* Achievement Badges Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">ACHIEVEMENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional <span className="text-gradient">Recognition</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Certifications, awards, and notable achievements in the AI field.
            </p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <ScrollAnimation 
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="glass-card rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-white text-xl font-bold mb-2">{achievement.title}</h3>
                  <div className="text-ai-purple text-sm mb-3">{achievement.year}</div>
                  <p className="text-white/70">{achievement.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-20 bg-ai-dark/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">EXPERIENCE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional <span className="text-gradient">Experience</span>
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Machine Learning Intern</h3>
              <div className="text-ai-purple text-sm mb-1">Vision Valt &mdash; Sep 2024 - Dec 2024</div>
              <p className="text-white/80">Worked on building machine learning models for real-world projects, contributing to the development and deployment of intelligent solutions.</p>
            </div>
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Machine Learning & Data Science Specialist</h3>
              <div className="text-ai-purple text-sm mb-1">Upwork &mdash; Active Freelancer</div>
              <a href="https://www.upwork.com/freelancers/~013aa297803873a4e9" target="_blank" rel="noopener noreferrer" className="text-ai-blue hover:text-ai-purple transition-colors text-sm mb-2 inline-block">View Upwork Profile</a>
              <p className="text-white/80">Delivering machine learning and data science solutions to global clients as a top-rated freelancer on Upwork.</p>
            </div>
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Open Source Contributor</h3>
              <div className="text-ai-purple text-sm mb-1">JAX, Pandas, data-8/datascience &mdash; 2025-Present</div>
              <p className="text-white/80">Contributed to major open source projects including JAX (Google), Pandas (data analysis library), and data-8/datascience (UC Berkeley). Enhanced features, fixed bugs, and improved documentation to support the data science and machine learning community.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-ai-dark/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">SKILLS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              My technical toolkit spans across machine learning algorithms, neural network architectures, and various AI frameworks.
            </p>
          </ScrollAnimation>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-ai-purple/20 text-ai-purple rounded-full text-sm font-medium shadow-sm hover:bg-ai-purple/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      
  {/* AI Demo Section removed */}
      
      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ai-purple/20 to-ai-blue/20 opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to collaborate on AI projects?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Let's combine our expertise and build intelligent systems that make a difference. Get in touch to discuss your next project.
            </p>
            
            <a 
              href="#" 
              className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-ai-purple to-ai-blue hover:scale-105 hover:shadow-lg hover:shadow-ai-purple/20 text-white font-medium transition-all duration-300"
            >
              Contact Me
            </a>
          </ScrollAnimation>
        </div>
      </section>
      
      <Footer />
      
  {/* Voice Navigation removed */}
    </div>
  );
}

export default Index;
