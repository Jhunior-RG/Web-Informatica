'use client'
import Link from "next/link";
import { YouTube, Download, Add } from "@mui/icons-material";
import introduccionImg from "../../../../public/introduccion.png";
import type { SvgIconProps } from "@mui/material";
const MaterialPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-3 space-y-12">
            {/* Imagen de fondo y título */}
            <div
                style={{
                    backgroundImage: `url(${introduccionImg.src})`,
                }}
                className="bg-cover bg-center h-56 rounded-2xl relative shadow-lg"
            >
                <div className="absolute inset-0 bg-black rounded-2xl bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white capitalize text-center drop-shadow-lg">
                        Introducción a la Programación
                    </h1>
                </div>
            </div>

            <div className="space-y-10">
                {/* Botón para agregar nuevo material */}
                <div className="flex justify-end">
                    <Link
                        href="/material/agregar_material"
                        passHref
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full flex items-center space-x-2"
                    >
                        <Add />
                        <span>Agregar Nuevo Material</span>
                    </Link>
                </div>

                {/* Primer Parcial */}
                <MaterialSection
                    title="Primer Parcial"
                    materials={[
                        {
                            text: "Exámenes Pasados PDF (Descargar)",
                            icon: Download,
                            href: "/examenes/primer-parcial-examen.pdf",
                            materialDescription:
                                "Este documento contiene los exámenes pasados del primer parcial.",
                        },
                        {
                            text: "Solucionario PDF (Descargar)",
                            icon: Download,
                            href: "/examenes/primer-parcial-solucion.pdf",
                            materialDescription:
                                "Soluciones a los exámenes del primer parcial.",
                        },
                    ]}
                />

                {/* Segundo Parcial */}
                <MaterialSection
                    title="Segundo Parcial"
                    materials={[
                        {
                            text: "Examen PDF (Descargar)",
                            icon: Download,
                            href: "/examenes/segundo-parcial-examen.pdf",
                            materialDescription:
                                "Examen del segundo parcial con preguntas de programación.",
                        },
                        {
                            text: "Solución PDF (Descargar)",
                            icon: Download,
                            href: "/examenes/segundo-parcial-solucion.pdf",
                            materialDescription:
                                "Solución detallada al examen del segundo parcial.",
                        },
                    ]}
                />

                {/* Clases Virtuales */}
                <MaterialSection
                    title="Clases Virtuales"
                    materials={[
                        {
                            text: "Introducción (YouTube)",
                            icon: YouTube,
                            href: "https://www.youtube.com/",
                            color: "red",
                            materialDescription:
                                "Clase virtual introductoria sobre los fundamentos de programación.",
                        },
                    ]}
                />

                {/* Prácticas */}
                <MaterialSection
                    title="Prácticas"
                    materials={[
                        {
                            text: "Prácticas de clase (Descargar)",
                            icon: Download,
                            href: "https://drive.google.com/",
                            color: "green",
                            materialDescription:
                                "Prácticas de clase que cubren ejercicios fundamentales de programación.",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

interface Material {
    text: string;
    icon: React.ElementType<SvgIconProps>;
    href: string;
    color?: "red" | "green" | "indigo";
    materialDescription: string;
}

interface MaterialSectionProps {
    title: string;
    materials: Material[];
}

const MaterialSection: React.FC<MaterialSectionProps> = ({
    title,
    materials,
}) => (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-blue-400 text-center mb-2">
            {title}
        </h2>

        <div className="space-y-4">
            {materials.map((material, index) => (
                <div key={index} className="space-y-1">
                    <ButtonMaterial
                        text={material.text}
                        Icon={material.icon}
                        href={material.href}
                        color={material.color || "indigo"}
                    />
                    <p className="text-gray-400 text-sm">
                        {material.materialDescription}
                    </p>
                </div>
            ))}
        </div>
    </div>
);
interface ButtonMaterialProps {
    text: string;
    Icon: React.ElementType<SvgIconProps>;
    href: string;
    color?: "red" | "green" | "indigo";
}
const ButtonMaterial: React.FC<ButtonMaterialProps> = ({
    text,
    Icon,
    href,
    color = "indigo",
}) => {
    const bgColor =
        color === "red"
            ? "bg-red-600 hover:bg-red-700"
            : color === "green"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-indigo-700 hover:bg-indigo-500";

    return (
        <Link
            href={href}
            className={`flex items-center justify-center space-x-2 ${bgColor} text-white px-5 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-600 w-full text-base`}
        >
            <Icon className="mr-2" />
            {text}
        </Link>
    );
};

export default MaterialPage;
