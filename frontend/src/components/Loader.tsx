import React, { useState, useEffect } from "react";
import { indie_flower } from "@/app/fonts/fonts";

export default function Loader() {
    const [displayedText, setDisplayedText] = useState(""); // Texto que se va mostrando
    const text = "Ing. Informatica"; // Texto completo a mostrar

    useEffect(() => {
        let index = 0;
        const displayedText = async () => {
            if (index <= text.length) {
                setDisplayedText(text.slice(0, index));
                setTimeout(displayedText, 100);
            }
            index++;
        };

        displayedText();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <h2
                className={`${indie_flower.className} antialiased  text-6xl `}
            >
                {displayedText}
            </h2>


        </div>
    );
}
