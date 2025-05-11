
import React, { useEffect, useRef, useState } from "react";

interface Neuron {
  id: number;
  x: number;
  y: number;
  size: number;
  pulseDelay: number;
}

interface Synapse {
  id: number;
  sourceId: number;
  targetId: number;
  width: number;
}

interface DataPoint {
  id: number;
  sourceId: number;
  targetId: number;
  startTime: number;
  duration: number;
}

const NeuralNetworkAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [synapses, setSynapses] = useState<Synapse[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [lastDataPointId, setLastDataPointId] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Create neurons and synapses
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { clientWidth: width, clientHeight: height } = containerRef.current;
    setDimensions({ width, height });
    
    // Create layers of neurons
    const layerCount = 3;
    const neuronsPerLayer = 5;
    const totalNeurons = layerCount * neuronsPerLayer;
    const horizontalGap = width / (layerCount + 1);
    const verticalGap = height / (neuronsPerLayer + 1);
    
    const newNeurons: Neuron[] = [];
    for (let layer = 0; layer < layerCount; layer++) {
      for (let i = 0; i < neuronsPerLayer; i++) {
        newNeurons.push({
          id: layer * neuronsPerLayer + i,
          x: (layer + 1) * horizontalGap,
          y: (i + 1) * verticalGap,
          size: Math.random() * 15 + 20,
          pulseDelay: Math.random() * 5
        });
      }
    }
    setNeurons(newNeurons);
    
    // Create synapses between layers
    const newSynapses: Synapse[] = [];
    for (let layer = 0; layer < layerCount - 1; layer++) {
      for (let i = 0; i < neuronsPerLayer; i++) {
        // Connect to a few random neurons in the next layer
        const connectionsPerNeuron = Math.floor(Math.random() * 3) + 1;
        const sourceId = layer * neuronsPerLayer + i;
        
        for (let c = 0; c < connectionsPerNeuron; c++) {
          const targetLayerIndex = Math.min(layer + 1, layerCount - 1);
          const targetNeuronIndex = Math.floor(Math.random() * neuronsPerLayer);
          const targetId = targetLayerIndex * neuronsPerLayer + targetNeuronIndex;
          
          newSynapses.push({
            id: newSynapses.length,
            sourceId,
            targetId,
            width: Math.random() * 1.5 + 0.5
          });
        }
      }
    }
    setSynapses(newSynapses);
  }, []);
  
  // Create data points flowing through synapses
  useEffect(() => {
    if (synapses.length === 0) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Pick random synapse
        const synapse = synapses[Math.floor(Math.random() * synapses.length)];
        const newDataPoint: DataPoint = {
          id: lastDataPointId + 1,
          sourceId: synapse.sourceId,
          targetId: synapse.targetId,
          startTime: Date.now(),
          duration: 1000 + Math.random() * 1000
        };
        
        setDataPoints(prev => [...prev, newDataPoint]);
        setLastDataPointId(prev => prev + 1);
        
        // Remove data point after animation
        setTimeout(() => {
          setDataPoints(prev => prev.filter(dp => dp.id !== newDataPoint.id));
        }, newDataPoint.duration + 100);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [synapses, lastDataPointId]);

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-70 pointer-events-none">
      {/* Render synapses */}
      {synapses.map(synapse => {
        const source = neurons.find(n => n.id === synapse.sourceId);
        const target = neurons.find(n => n.id === synapse.targetId);
        if (!source || !target) return null;

        // Calculate angle and distance
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return (
          <div 
            key={`synapse-${synapse.id}`}
            className="synapse"
            style={{
              left: source.x,
              top: source.y,
              width: distance,
              height: synapse.width,
              transformOrigin: 'left center',
              transform: `rotate(${angle}deg)`
            }}
          />
        );
      })}
      
      {/* Render neurons */}
      {neurons.map(neuron => (
        <div
          key={`neuron-${neuron.id}`}
          className="neuron"
          style={{
            left: neuron.x - neuron.size / 2,
            top: neuron.y - neuron.size / 2,
            width: neuron.size,
            height: neuron.size,
            animationDelay: `${neuron.pulseDelay}s`
          }}
        />
      ))}
      
      {/* Render data points */}
      {dataPoints.map(dataPoint => {
        const source = neurons.find(n => n.id === dataPoint.sourceId);
        const target = neurons.find(n => n.id === dataPoint.targetId);
        if (!source || !target) return null;

        const elapsedTime = Date.now() - dataPoint.startTime;
        const progress = Math.min(elapsedTime / dataPoint.duration, 1);
        
        const x = source.x + (target.x - source.x) * progress;
        const y = source.y + (target.y - source.y) * progress;

        return (
          <div
            key={`data-${dataPoint.id}`}
            className="data-point"
            style={{
              left: x,
              top: y,
              backgroundColor: Math.random() > 0.5 ? '#9b87f5' : '#33C3F0'
            }}
          />
        );
      })}
    </div>
  );
};

export default NeuralNetworkAnimation;
