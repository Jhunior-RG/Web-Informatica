import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  isVisible : boolean,
  onClose: () => void,
}

const Felicitaciones = ({ isVisible, onClose }:Props) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 500); // Give time for fade-out animation
      }, 2000); // Display for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-black bg-opacity-60 backdrop-blur-sm
        ${isAnimating ? "animate-fade-in" : "animate-fade-out"}`}
    >
      <div
        className={`relative bg-opacity-0 w-96 rounded-2xl p-8 text-center animate-bounce`}
      >
        {/* Decorative sparkle background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Sparkles
            size={200}
            className="absolute top-0 left-0 text-white"
            strokeWidth={1}
          />
          <Sparkles
            size={150}
            className="absolute bottom-0 right-0 text-white"
            strokeWidth={1}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            ¡Felicidades!
          </h2>
          <p className="text-lg text-white mb-6">
            Usted Acabo la Carrera!!!
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Felicitaciones;
