

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Upload, RefreshCw, Camera } from 'lucide-react';
import axios from 'axios';


const ImageClassifierDemo: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  

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

  const classifyImage = async (imageData: string) => {
    setIsProcessing(true);
    setDescription(null);
    setError(null);
    try {
      const response = await axios.post('/api/image-classifier', { image: imageData });
      setDescription(response.data.result || 'No description returned.');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to classify image.');
    } finally {
      setIsProcessing(false);
    }
  };
  

  const resetDemo = () => {
    setImage(null);
    setDescription(null);
    setError(null);
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
            
            {(image || description || error) && (
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
            <h4 className="text-white font-semibold mb-4">AI Image Description</h4>
            {isProcessing ? (
              <div className="h-full flex items-center justify-center text-white/50 text-center">
                <p>Analyzing image content...</p>
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center text-red-400 text-center">
                <p>{error}</p>
              </div>
            ) : description ? (
              <div className="h-full flex items-center justify-center text-white text-center">
                <p>{description}</p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/50 text-center">
                <p>Upload or capture an image to see AI description results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageClassifierDemo;
