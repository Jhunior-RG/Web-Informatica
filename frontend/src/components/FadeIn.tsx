import React, { useState, useEffect } from "react";

const FadeIn = ({ children, duration = 1000, delay = 0 }) => {
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
