
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, RefreshCw, Camera } from 'lucide-react';

const ImageClassifierDemo: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<{label: string; probability: number}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const mockLabels = [
    'Neural Network', 'Deep Learning', 'Machine Learning', 
    'Artificial Intelligence', 'Computer Vision', 'Robot', 
    'Data Science', 'Algorithm', 'Tensor'
  ];
  
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImage(e.target.result);
        classifyImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const classifyImage = (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Generate mock predictions
      const mockPredictions = mockLabels
        .map(label => ({
          label,
          probability: Math.random()
        }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 5)
        .map(pred => ({
          ...pred,
          probability: pred.probability * 0.8 + 0.1 // Scale to reasonable range
        }));
      
      setPredictions(mockPredictions);
      setIsProcessing(false);
    }, 1500);
  };
  
  const resetDemo = () => {
    setImage(null);
    setPredictions([]);
    setIsCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please make sure you've granted permission.");
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const capturedImage = canvas.toDataURL('image/jpeg');
        setImage(capturedImage);
        classifyImage(capturedImage);
        
        // Stop camera stream
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCameraActive(false);
      }
    }
  };
  
  return (
    <div className="glass-card p-6 rounded-lg max-w-3xl mx-auto">
      <h3 className="text-white text-2xl font-bold mb-6">AI Image Classifier Demo</h3>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Preview */}
        <div className="w-full md:w-1/2">
          <div 
            className={cn(
              "relative aspect-video rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center",
              image || isCameraActive ? "border-ai-purple" : "border-white/30"
            )}
          >
            {!image && !isCameraActive ? (
              <div className="text-center p-4">
                <Upload className="mx-auto text-white/50 mb-2" size={32} />
                <p className="text-white/70">
                  Upload an image or use camera to test the classifier
                </p>
              </div>
            ) : isCameraActive ? (
              <video 
                ref={videoRef}
                autoPlay 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={image || ''} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-ai-dark/70 backdrop-blur-sm flex items-center justify-center">
                <RefreshCw className="animate-spin text-ai-purple" size={40} />
                <span className="ml-2 text-white">Processing...</span>
              </div>
            )}
          </div>
          
          <div className="flex mt-4 gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-ai-dark hover:bg-ai-dark/80 text-white py-2 px-3 rounded-md flex items-center justify-center"
            >
              <Upload size={16} className="mr-2" /> Upload Image
            </button>
            
            {!isCameraActive ? (
              <button
                onClick={activateCamera}
                className="flex-1 bg-ai-dark hover:bg-ai-dark/80 text-white py-2 px-3 rounded-md flex items-center justify-center"
              >
                <Camera size={16} className="mr-2" /> Use Camera
              </button>
            ) : (
              <button
                onClick={captureImage}
                className="flex-1 bg-ai-purple hover:bg-ai-purple/90 text-white py-2 px-3 rounded-md flex items-center justify-center"
              >
                <Camera size={16} className="mr-2" /> Capture
              </button>
            )}
            
            {(image || predictions.length > 0) && (
              <button
                onClick={resetDemo}
                className="bg-ai-dark/50 hover:bg-ai-dark/80 text-white py-2 px-3 rounded-md flex items-center justify-center"
              >
                <RefreshCw size={16} className="mr-0" />
              </button>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={uploadImage}
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        {/* Results */}
        <div className="w-full md:w-1/2">
          <div className="bg-ai-dark/50 p-4 rounded-lg h-full">
            <h4 className="text-white font-semibold mb-4">Classification Results</h4>
            
            {predictions.length > 0 ? (
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{prediction.label}</span>
                      <span className="text-ai-purple">
                        {Math.round(prediction.probability * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          index === 0 
                            ? "bg-ai-purple" 
                            : "bg-gradient-to-r from-ai-purple/70 to-ai-blue/70"
                        )}
                        style={{ 
                          width: `${prediction.probability * 100}%`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 text-white/60 text-sm">
                  <p>
                    <span className="text-ai-purple font-medium">Note:</span> This is a 
                    demo classification using simulated results. In a real application, 
                    this would use a trained machine learning model.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/50 text-center">
                {isProcessing ? (
                  <p>Analyzing image content...</p>
                ) : (
                  <p>Upload or capture an image to see AI classification results</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageClassifierDemo;
