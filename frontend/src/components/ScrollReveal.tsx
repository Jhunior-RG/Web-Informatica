import React, { useEffect, useRef } from "react";

const ScrollReveal  = ({ children, delay = 0 }:{children: React.ReactNode,delay: number}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05, // Se activa cuando solo el 5% es visible
        rootMargin: "0px", // Sin margen adicional
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className="opacity-0 transition-opacity duration-700 ease-out fade-element"
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
