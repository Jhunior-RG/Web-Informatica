import { useEffect, useState } from "react";

const TypingEffect = ({ text = "", speed = 100,className= "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reiniciar el estado cuando cambia el texto
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    // Si ya hemos terminado de mostrar todo el texto, no hacer nada
    if (index >= text.length) return;

    const timeoutId = setTimeout(() => {
      setDisplayedText(text.slice(0, index + 1));
      setIndex((i) => i + 1);
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [index, text, speed]);

  return (
    <div className={`text-4xl sm:text-5xl font-bold  drop-shadow-md mb-4 font-silkscreen ${className}`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default TypingEffect;
