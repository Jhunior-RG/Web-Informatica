import React, { useState } from "react";
import { motion } from "framer-motion";

const BotonMotion = () => {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        open: { backgroundColor: "red", color: "blue", rotate: 180 },
        close: {
            backgroundColor: "blue",
            borderRadius: "50%",
            color: "red",
            rotate: 0,
        },
    };
    return (
        <motion.button
            animate={isOpen ? "open" : "close"}
            variants={variants}
            transition={{ duration: 1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-5 text-xl font-bold"
        >
            Boton
        </motion.button>
    );
};

export default BotonMotion;
