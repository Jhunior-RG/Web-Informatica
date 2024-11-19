"use client";
import React, { useEffect, useState } from "react";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
    Article,
    CalendarMonth,
    CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import TypingEffect from "@/components/TypingEffect";
import FadeIn from "@/components/FadeIn";
import { BACKEND_URL } from "@/constant/backend";

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

export default function Home() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const getUsuario = async () => {
            try {
                const res = await fetch(BACKEND_URL + "/api/perfil", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const { data } = await res.json();
                    //console.log(data);
                    setUsuario(data);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (err) {
                localStorage.removeItem("token");
            }
        };
        getUsuario();
    }, []);

    return (
        <div className="flex flex-col justify-between">
            {/* Sección de encabezado con imagen de fondo */}
            <div className="flex flex-col w-full h-screen bg-cover bg-center bg-no-repeat items-center justify-between p-4 relative image-background">
                <div className="flex  justify-center space-x-4 w-full z-10 p-4 ">
                    <FadeIn delay={500}>
                        {usuario ? (
                            <div className="flex flex-col items-center justify-between">
                                <p className="text-white text-xl mt-10 font-semibold">
                                    Bienvenido {usuario.nombre}
                                </p>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        setUsuario(null);
                                    }}
                                    className=" bg-indigo-600 text-white rounded-lg py-2 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
                                >
                                    Cerrar Session
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <Link
                                    href="/login"
                                    className=" bg-indigo-600 text-white rounded-lg py-2 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
                                >
                                    Inicia Sesión
                                </Link>
                                <Link
                                    href="/register"
                                    className=" bg-indigo-600 text-white rounded-lg py-2 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
                                >
                                    Regístrate
                                </Link>
                            </div>
                        )}
                    </FadeIn>
                </div>

                {/* Capa de superposición para hacer el texto más legible */}
                <div className="absolute inset-0 bg-gray-950 bg-opacity-40"></div>

                <div className="text-center relative z-10 px-4">
                    <FadeIn>
                        <TypingEffect
                            text="Ingeneria Informática"
                            className="text-indigo-600 sm:text-5xl  text-4xl"
                            speed={100}
                        />
                    </FadeIn>
                    <FadeIn delay={1500}>
                        <p className="text-base sm:text-lg text-white drop-shadow-md">
                            Accede a materiales de estudio, gestiona tu horario
                            y consulta tu plan de estudios de manera eficiente.
                        </p>
                    </FadeIn>
                </div>
                <FadeIn delay={1000}>
                    <p className="text-white animate-bounce mb-10 relative z-10">
                        Desliza hacia abajo
                    </p>
                </FadeIn>
            </div>

            <section className="w-full py-12 bg-gray-800">
                <h3 className="text-2xl font-semibold text-white text-center mb-6 px-4">
                    Accede a las siguientes funcionalidades
                </h3>

                {/* Grid de funcionalidades - Mobile First */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
                    <Funcionalidad
                        title="Materiales Académicos"
                        MuiIcon={LibraryBooksOutlinedIcon}
                        href="/material"
                    />
                    <Funcionalidad
                        title="Gestión de Horarios"
                        MuiIcon={CalendarMonth}
                        href={"/horario"}
                    />
                    <Funcionalidad
                        title="Progreso Academico"
                        MuiIcon={CheckCircleOutlineOutlined}
                        href="/progreso"
                    />
                    <Funcionalidad
                        title="Plan de Estudio"
                        MuiIcon={Article}
                        href="/pensum"
                    />
                </div>
            </section>

            <section className="w-full  bg-gray-800">
                <h3 className="text-2xl font-semibold text-gray-200 text-center mb-8 px-4">
                    ¿Por qué elegirnos?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    <Caracteristica
                        title="Materiales actualizados"
                        description="Accede a materiales de estudio revisados y actualizados por profesionales del área."
                        icon={
                            <LibraryBooksOutlinedIcon className="text-indigo-500 text-5xl mb-4" />
                        }
                    />
                    <Caracteristica
                        title="Optimización de tiempos"
                        description="Organiza tu horario y tareas para aprovechar al máximo tu tiempo de estudio."
                        icon={
                            <CalendarMonth className="text-indigo-500 text-5xl mb-4" />
                        }
                    />
                    <Caracteristica
                        title="Soporte continuo"
                        description="Recibe asistencia técnica y académica para resolver tus dudas en cualquier momento."
                        icon={
                            <CheckCircleOutlineOutlined className="text-indigo-500 text-5xl mb-4" />
                        }
                    />
                </div>
            </section>
        </div>
    );
}
interface FuncionalidadProps {
    MuiIcon?: React.ElementType; // El icono puede ser un componente de MUI
    title: string;
    href: string;
}

const Funcionalidad: React.FC<FuncionalidadProps> = ({
    MuiIcon,
    title,
    href,
}) => {
    return (
        <Link href={href}>
            <button className="group rounded-lg h-full bg-indigo-700 p-4 shadow-lg  hover:text-white flex flex-col items-center justify-center transition duration-300 transform  w-full">
                {MuiIcon && (
                    <MuiIcon className="mb-2 text-4xl text-white group-hover:text-white transition duration-300" />
                )}
                <p className="font-semibold text-gray-300 group-hover:text-white transition duration-300 text-center text-sm sm:text-base">
                    {title}
                </p>
            </button>
        </Link>
    );
};

interface CaracteristicaProps {
    title: string;
    description: string;
    icon: React.ReactNode; // El icono puede ser cualquier nodo React
}

const Caracteristica: React.FC<CaracteristicaProps> = ({
    title,
    description,
    icon,
}) => {
    return (
        <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-300 shadow-md">
            {icon}
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                {title}
            </h4>
            <p className="text-sm sm:text-base text-gray-700">{description}</p>
        </div>
    );
};
