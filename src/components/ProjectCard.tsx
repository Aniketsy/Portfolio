
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  githubUrl,
  demoUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate detection boxes
  const generateRandomBoxes = () => {
    const boxes = [];
    const boxCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < boxCount; i++) {
      const width = Math.floor(Math.random() * 50) + 20;
      const height = Math.floor(Math.random() * 50) + 20;
      const left = Math.floor(Math.random() * (100 - width));
      const top = Math.floor(Math.random() * (100 - height));
      
      boxes.push({
        id: i,
        style: {
          width: `${width}%`,
          height: `${height}%`,
          left: `${left}%`,
          top: `${top}%`
        },
        confidence: Math.floor(Math.random() * 30) + 70
      });
    }
    
    return boxes;
  };
  
  const detectionBoxes = generateRandomBoxes();

  return (
    <div
      className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-102"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
        
        {/* CV detection overlays */}
        {isHovered && (
          <>
            {detectionBoxes.map(box => (
              <div 
                key={box.id} 
                className={cn(
                  "absolute border-2 border-ai-blue transition-all duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
                style={box.style}
              >
                <div className="absolute top-0 left-0 bg-ai-blue px-2 text-xs text-white font-mono">
                  {title.split(' ')[0]} {box.confidence}%
                </div>
              </div>
            ))}
          </>
        )}
        
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-ai-dark/90 via-ai-dark/20 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-70"
        )} />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-ai-purple/20 text-ai-purple">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-white/80 hover:text-white bg-ai-dark/50 text-sm transition-colors"
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-md text-white bg-gradient-to-r from-ai-purple/70 to-ai-blue/70 hover:from-ai-purple hover:to-ai-blue text-sm transition-all"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
