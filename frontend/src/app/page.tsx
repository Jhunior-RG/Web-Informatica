"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { Article, Bookmark, CalendarMonth, CheckBoxOutlineBlank, CheckCircle, CheckCircleOutlineOutlined } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {
    /*
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        // Simula la carga de datos o cualquier operación asíncrona
        const timer = setTimeout(() => {
            setLoading(false); // Cambia el estado después de 2 segundos (o cuando termine de cargar)
        }, 3000);

        // Limpia el timer cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />; // Muestra la pantalla de carga
    }*/

    return (
        <div className={` flex  flex-col justify-between`}>
            <div className="flex w-full h-[400px] bg-cover bg- bg-center bg-no-repeat  items-center justify-center p-4  image-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white">
                        Bienvenido a Ingenieria Informatica
                    </h1>
                    <p className="mt-3 text-white ">
                        Obten acceso a materiales de estudio, gestiona tu
                        horario y consulta tus planes de estudio.
                    </p>
                </div>
            </div>
            <h3 className="text-lg font-bold px-4 pb-2 pt-4">
                Funcionalidades destacadas
            </h3>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">

                <Funcionalidad
                    title="Materiales Academicos"
                    MuiIcon={LibraryBooksOutlinedIcon}
                    href='/materiales'
                />

                <Funcionalidad
                    title="Gestion de Horarios"
                    MuiIcon={CalendarMonth}
                    href='/horario'
                />

                <Funcionalidad
                    title="Seguimiento de progreso"
                    MuiIcon={CheckCircleOutlineOutlined}
                    href='/seguimiento'
                />

                <Funcionalidad
                    title="Plan de Estudio"
                    MuiIcon={Article}
                    href='/pensum'
                />
            </div>


        </div>
    );
}

function Funcionalidad({ MuiIcon, title,href }) {
    return (
        <button className="rounded-lg bg-white p-4 hover:bg-blue-500 hover:text-white flex flex-col items-center">

            <Link href={href}>
            {MuiIcon && (
                <MuiIcon
                className="mb-2 text-3xl"
                />
            )}
            <p className="font-bold">{title}</p>
            </Link>
        </button>
    );
}
