
import React from 'react';
import Header from '@/components/Header';
import NeuralNetworkAnimation from '@/components/NeuralNetworkAnimation';
import ParticlesBackground from '@/components/ParticlesBackground';
import TypingEffect from '@/components/TypingEffect';
import ProjectCard from '@/components/ProjectCard';
import ChatInterface from '@/components/ChatInterface';
import NeuralModel3D from '@/components/NeuralModel3D';
import ScrollAnimation from '@/components/ScrollAnimation';
import SkillTimeline from '@/components/SkillTimeline';
import TestimonialSection from '@/components/TestimonialSection';
import ImageClassifierDemo from '@/components/ImageClassifierDemo';
import VoiceNavigation from '@/components/VoiceNavigation';
import Footer from '@/components/Footer';
import { ArrowDown, Brain, ChevronRight, Download, Github } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

// Sample project data
const projects = [
  {
    title: "CNN Image Classifier",
    description: "A convolutional neural network for image classification trained on the ImageNet dataset with 90% accuracy.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    tags: ["Computer Vision", "CNN", "TensorFlow", "Docker"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    title: "NLP Sentiment Analysis",
    description: "Real-time sentiment analysis of text using a BERT-based model fine-tuned on customer reviews.",
    image: "https://images.unsplash.com/photo-1655720828018-7467e9fa29ae?w=800&auto=format&fit=crop",
    tags: ["NLP", "BERT", "PyTorch", "Hugging Face"],
    githubUrl: "#",
    demoUrl: "#"
  },
  {
    title: "Reinforcement Learning Agent",
    description: "A reinforcement learning agent that masters Atari games using Deep Q-Learning Networks.",
    image: "https://images.unsplash.com/photo-1535406208535-1429839cfd13?w=800&auto=format&fit=crop",
    tags: ["Reinforcement Learning", "DQN", "OpenAI Gym"],
    githubUrl: "#"
  }
];

// Skill categories
const skills = [
  { 
    name: "Machine Learning", 
    items: ["Regression", "Classification", "Clustering", "Dimensionality Reduction", "Ensemble Methods"]
  },
  {
    name: "Deep Learning",
    items: ["Neural Networks", "CNN", "RNN", "LSTM", "Transformers", "GANs"]
  },
  {
    name: "Natural Language Processing",
    items: ["BERT", "GPT", "Text Classification", "Named Entity Recognition", "Language Generation"]
  },
  {
    name: "Computer Vision",
    items: ["Image Classification", "Object Detection", "Segmentation", "Face Recognition", "OCR"]
  },
  {
    name: "Tools & Frameworks",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face", "MLflow"]
  }
];

// Achievements/badges data
const achievements = [
  {
    title: "TensorFlow Certified",
    icon: "🧠",
    year: "2022",
    description: "Google's professional certification for TensorFlow practitioners"
  },
  {
    title: "Kaggle Competition Winner",
    icon: "🏆",
    year: "2021",
    description: "1st place in text classification challenge"
  },
  {
    title: "Research Publication",
    icon: "📝",
    year: "2023",
    description: "Published in Conference on Computer Vision (CVPR)"
  },
  {
    title: "Open Source Contributor",
    icon: "🌟",
    year: "2020-Present",
    description: "Active contributor to Hugging Face transformers"
  },
];

const Index: React.FC = () => {
  const { theme } = useTheme();
  
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
              AI/ML Engineer & Researcher
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Building Intelligent <br /> Systems for the Future
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
                href="#" 
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
              <p className="text-white/70 mt-2">
                Drag to explore a 3D visualization of a neural network
              </p>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation animation="scale-up" delay={300}>
            <NeuralModel3D />
          </ScrollAnimation>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-ai-dark/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation animation="fade-up" className="text-center mb-16">
              <span className="text-ai-purple text-sm font-medium mb-2 block">ABOUT ME</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Interact with my <span className="text-gradient">AI Assistant</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Ask questions about my experience, skills, or interests. My AI assistant will tell you more about me and my journey in the field of artificial intelligence.
              </p>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <ScrollAnimation animation="slide-in-left" delay={200} className="order-2 lg:order-1">
                <ChatInterface />
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-in-right" delay={200} className="order-1 lg:order-2">
                <div className="glass-card rounded-lg p-6 neo-border hover:scale-[1.02] transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4">My Journey in AI</h3>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-white/80">
                      With over 5 years of experience in machine learning and artificial intelligence, I've developed a passion for creating models that understand and learn from complex data patterns.
                    </p>
                    <p className="text-white/80">
                      My specialization includes deep learning architectures, natural language processing, and computer vision systems that can be deployed in production environments.
                    </p>
                    <p className="text-white/80">
                      I'm particularly interested in the intersection of AI explainability, ethics, and human-centered design — ensuring that the systems we build are not just powerful but also transparent and fair.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a href="#" className="text-ai-blue hover:text-ai-purple transition-colors flex items-center">
                      <Github size={20} className="mr-2" />
                      GitHub
                    </a>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                    <span className="text-white/50">Featured in 3 research papers</span>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">PROJECTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Computer Vision Powered <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Hover over each project to see computer vision detection overlays. Each project showcases different AI/ML techniques and applications.
            </p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ScrollAnimation 
                key={index}
                animation="fade-up"
                delay={index * 200}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, index) => (
              <ScrollAnimation 
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="glass-card rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-white mb-4">{category.name}</h3>
                  
                  <ul className="space-y-2">
                    {category.items.map((skill, skillIndex) => (
                      <li 
                        key={skillIndex}
                        className="flex items-center text-white/80 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-ai-purple mr-3 group-hover:scale-150 transition-transform"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What <span className="text-gradient">Colleagues Say</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Feedback from people I've worked with on AI and machine learning projects.
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-up" delay={200}>
            <TestimonialSection />
          </ScrollAnimation>
        </div>
      </section>
      
      {/* AI Demo Section */}
      <section id="demos" className="py-20 bg-ai-dark/30">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-up" className="text-center mb-16">
            <span className="text-ai-purple text-sm font-medium mb-2 block">INTERACTIVE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI <span className="text-gradient">Technology Demo</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Experience AI in action. Try out this interactive demo of image classification technology.
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-up" delay={200}>
            <ImageClassifierDemo />
          </ScrollAnimation>
        </div>
      </section>
      
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
      
      {/* Voice Navigation */}
      <VoiceNavigation />
    </div>
  );
};

export default Index;
