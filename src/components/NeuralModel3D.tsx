
import React, { useRef, useEffect } from 'react';

const NeuralModel3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let isRendering = true;
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Neural network parameters
    const layers = [4, 8, 8, 6, 2]; // Number of neurons in each layer
    const neurons: {x: number; y: number; z: number; layer: number; index: number}[] = [];
    const connections: {from: number; to: number}[] = [];
    
    // Generate neural network structure
    const initNeuralNetwork = () => {
      neurons.length = 0;
      connections.length = 0;
      
      const layerDistance = 150;
      const maxLayerSize = Math.max(...layers);
      
      layers.forEach((layerSize, layerIndex) => {
        const z = (layerIndex - (layers.length - 1) / 2) * layerDistance;
        
        for (let i = 0; i < layerSize; i++) {
          const verticalSpacing = 50;
          const y = (i - (layerSize - 1) / 2) * verticalSpacing;
          
          neurons.push({
            x: 0,
            y,
            z,
            layer: layerIndex,
            index: neurons.length
          });
          
          // Create connections to previous layer
          if (layerIndex > 0) {
            const prevLayerStart = neurons.length - layerSize - layers[layerIndex - 1];
            const prevLayerEnd = neurons.length - layerSize;
            
            for (let j = prevLayerStart; j < prevLayerEnd; j++) {
              connections.push({
                from: j,
                to: neurons.length - 1
              });
            }
          }
        }
      });
    };
    
    const resizeCanvas = () => {
      if (modelContainerRef.current) {
        const { width, height } = modelContainerRef.current.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    const renderNeuralNetwork = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth rotation easing
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;
      
      // Auto rotation when not interacting
      if (!mouseDown) {
        targetRotationY += 0.003;
      }
      
      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const sinY = Math.sin(rotationY);
      const cosY = Math.cos(rotationY);
      
      // Calculate 3D projections
      const projectedNeurons = neurons.map((neuron) => {
        // 3D rotations
        let x = neuron.x;
        let y = neuron.y;
        let z = neuron.z;
        
        // Rotate around Y
        const tempX = x;
        x = tempX * cosY - z * sinY;
        z = tempX * sinY + z * cosY;
        
        // Rotate around X
        const tempY = y;
        y = tempY * cosX - z * sinX;
        z = tempY * sinX + z * cosX;
        
        // 3D to 2D projection
        const scale = 1000 / (1000 + z);
        const projX = canvas.width / 2 + x * scale;
        const projY = canvas.height / 2 + y * scale;
        
        return {
          x: projX,
          y: projY,
          scale,
          originalZ: z,
          layer: neuron.layer
        };
      });
      
      // Draw connections first (behind neurons)
      connections.forEach((conn) => {
        const from = projectedNeurons[conn.from];
        const to = projectedNeurons[conn.to];
        
        // Only draw connections that are "visible" (in front)
        // Skip some connections for better performance
        if (Math.random() > 0.7) return;
        
        // Calculate connection opacity based on z-position
        const zAvg = (neurons[conn.from].z + neurons[conn.to].z) / 2;
        let opacity = Math.min(Math.max((zAvg + 400) / 800, 0), 0.5);
        
        // Also use scale for opacity
        opacity *= (from.scale + to.scale) / 2;
        
        // Draw connection
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        
        // Use gradient for connections
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        
        // Color based on layer (from blue to purple)
        const startColor = `rgba(51, 195, 240, ${opacity})`;
        const endColor = `rgba(155, 135, 245, ${opacity})`;
        
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(0.5, 1.5 * (from.scale + to.scale) / 2);
        ctx.stroke();
        
        // Animate data flowing through connections
        if (Math.random() < 0.01) {
          animateDataFlow(from.x, from.y, to.x, to.y);
        }
      });
      
      // Draw neurons
      projectedNeurons.forEach((neuron, i) => {
        // Skip neurons that are too far back
        if (neuron.originalZ < -400) return;
        
        const originalNeuron = neurons[i];
        const radius = Math.max(2, 5 * neuron.scale);
        
        // Calculate neuron opacity based on z-position
        let opacity = Math.min(Math.max((neuron.originalZ + 400) / 800, 0), 1);
        
        // Color based on layer (from blue to purple)
        const colorProgress = originalNeuron.layer / (layers.length - 1);
        const r = Math.round(51 + colorProgress * (155 - 51));
        const g = Math.round(195 + colorProgress * (135 - 195));
        const b = Math.round(240 + colorProgress * (245 - 240));
        
        // Draw neuron glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, radius * 3
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(neuron.x, neuron.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw neuron
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw highlight
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.arc(neuron.x - radius * 0.3, neuron.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    // Data flow particles
    const dataParticles: { x: number; y: number; targetX: number; targetY: number; progress: number; color: string }[] = [];
    
    const animateDataFlow = (fromX: number, fromY: number, toX: number, toY: number) => {
      dataParticles.push({
        x: fromX,
        y: fromY,
        targetX: toX,
        targetY: toY,
        progress: 0,
        color: Math.random() > 0.5 ? 'rgba(51, 195, 240, 0.8)' : 'rgba(155, 135, 245, 0.8)'
      });
    };
    
    const updateDataParticles = () => {
      for (let i = dataParticles.length - 1; i >= 0; i--) {
        const particle = dataParticles[i];
        particle.progress += 0.02;
        
        if (particle.progress >= 1) {
          dataParticles.splice(i, 1);
        } else {
          particle.x = particle.x + (particle.targetX - particle.x) * 0.05;
          particle.y = particle.y + (particle.targetY - particle.y) * 0.05;
          
          // Draw particle
          if (ctx) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          }
        }
      }
    };
    
    const animate = () => {
      if (!isRendering) return;
      renderNeuralNetwork();
      updateDataParticles();
      requestAnimationFrame(animate);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      mouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDown) return;
      
      const deltaX = e.clientX - mouseX;
      const deltaY = e.clientY - mouseY;
      
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseUp = () => {
      mouseDown = false;
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        mouseDown = true;
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!mouseDown || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - mouseX;
      const deltaY = e.touches[0].clientY - mouseY;
      
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
      mouseDown = false;
    };
    
    // Initialize and start rendering
    initNeuralNetwork();
    resizeCanvas();
    animate();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      isRendering = false;
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <div 
      ref={modelContainerRef} 
      className="w-full h-[400px] relative overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white/50">
        Drag to rotate the neural network
      </div>
    </div>
  );
};

export default NeuralModel3D;
