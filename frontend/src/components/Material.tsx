import type { Material } from "@/types/Material";
import { Delete } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Pdf from "./PdfThumbnail";
import {FastAverageColor} from 'fast-average-color';
const getMaterialType = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "video";
    if (url.endsWith(".pdf")) return "pdf";
    return "web";
};

interface Props {
    material: Material;
    onDelete: (id: number) => void;
    remove?: boolean | null;
}

const Material = ({ material, onDelete, remove }: Props) => {
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${material.url}`;
    const [bgColor, setBgColor] = useState<string>("indigo");
    const imgRef = useRef<HTMLImageElement>(null);
    const [isClarity, setIsClarity] = useState(false);

    const materialType = getMaterialType(material.url);

    useEffect(() => {
        const fac = new FastAverageColor();
        if (imgRef.current) {
            const color = fac.getColor(imgRef.current);
            setBgColor(color.rgb);
            setIsClarity((color.value[0] + color.value[1] + color.value[2]) / 3 > 128);
        }
    }, [favicon]);

    return (
        <div>
            <div className="flex p-4 rounded-md">
                <Link
                    style={{ backgroundColor: bgColor }}
                    href={material.url}
                    target="_blank"
                    className={`flex items-center justify-center space-x-2 ${
                        isClarity ? "text-black" : "text-white"
                    } px-5 py-1 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:bg-opacity-80 w-full text-base gap-2`}
                >
                    <Image
                        className="filter drop-shadow-4xl rounded-md"
                        src={favicon}
                        alt="Icono"
                        width={45}
                        height={5}
                        priority={true}
                        ref={imgRef as React.Ref<HTMLImageElement>}
                    />
                    {material.nombre}
                </Link>
                {remove && (
                    <button
                        onClick={() => onDelete(material.id)}
                        className="flex items-center justify-center px-5 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-white text-base"
                    >
                        <Delete color="error" />
                    </button>
                )}
            </div>
            <div className="flex items-center justify-center flex-col">
                {materialType === "video" ? (
                    <iframe
                        className="w-full h-64 rounded-md"
                        src={material.url.replace("watch?v=", "embed/")}
                        title={material.nombre}
                        allowFullScreen
                    ></iframe>
                ) : materialType === "pdf" ? (
                    <Pdf url={material.url} />
                ) : material.url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                    <div className="relative w-full h-80">
                        <Image
                            src={material.url}
                            alt={material.nombre}
                            fill
                            className="rounded-md object-contain"
                            priority
                        />
                    </div>
                ) : null}

                <p className="text-gray-400 text-sm text-center">
                    {material.descripcion}
                </p>
            </div>
        </div>
    );
};

export default Material;
