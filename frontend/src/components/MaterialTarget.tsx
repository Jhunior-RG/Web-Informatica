import { ArrowForward } from "@mui/icons-material";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import imageDefault from "../public/image_default.png";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MaterialProps {
    title: string;
    description?: string;
    srcImage?: StaticImageData | string;
    link?: string;
    isPopular?: boolean;
}

const MaterialTarget: React.FC<MaterialProps> = ({
    title,
    description,
    srcImage,
    link,
    isPopular,
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });

    // Animaciones basadas en el scroll
    const scale = useTransform(scrollYProgress, [0,0.05], [0.75,1]);
    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.75]);
    const x = useTransform(scrollYProgress, [0,0.05],[-500,0])
    
    return (
      <motion.div
        ref={ref}
        style={{ scale, opacity, x }}
        className="flex bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
      >
        {/* Imagen del curso */}
        <div
          className="relative w-1/3 h-full"
          style={{
            backgroundImage: `url(${srcImage})`,
            backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
            backgroundPosition: "center", // Centra la imagen dentro del contenedor
            backgroundRepeat: "no-repeat", // Evita que la imagen se repita
          }}
        ></div>

        {/* Contenido del curso */}
        <div className="p-4 w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="font-bold text-xl text-white">{title}</p>
              {isPopular && (
                <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                  Popular
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              {description
                ? description
                : `Accede a los materiales de ${title}`}
            </p>
          </div>

          {/* Botón de acceso */}
          <Link
            href={link ? link : "#"}
            className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-indigo-500 w-fit"
          >
            <span>Abrir</span>
            <ArrowForward fontSize="small" />
          </Link>
        </div>
      </motion.div>
    );
};

export default MaterialTarget;
