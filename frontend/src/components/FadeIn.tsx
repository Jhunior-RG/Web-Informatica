import React, { useState, useEffect, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 1000,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
        willChange: "opacity",
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
