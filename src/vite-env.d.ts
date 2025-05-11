
/// <reference types="vite/client" />

// Add type declarations for Web Speech API
interface Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}
