"use client";
import React, { useEffect, useState } from "react";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import {
  Article,
  CalendarMonth,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import TypingEffect from "@/components/TypingEffect";
export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const [reload, setReload] = useState(false);
  const [thereToken, setThereToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token == null) {
      setUsuario(null);
      return;
    }
    setThereToken(true);
    const getUsuario = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/perfil", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    };
    getUsuario();
  }, [reload]);

  return (
    <div className="flex flex-col justify-between">
      {/* Sección de encabezado con imagen de fondo */}
      <div className="flex flex-col w-full h-screen bg-cover bg-center bg-no-repeat items-center justify-between p-4 relative image-background">
        <div className="flex  justify-center space-x-4 w-full z-10 p-4 ">
          {usuario ? (
            <div className="flex flex-col items-center justify-between">
              <p className="text-white text-xl mb-2">
                Bienvenido {usuario.nombre}
              </p>
              <LogoutButton
                recargar={() => {
                  setReload(!reload);
                  setThereToken(false);
                }}
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Capa de superposición para hacer el texto más legible */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="text-center relative z-10 px-4">
          <TypingEffect text="Ingeneria Informática" speed={100}/>
          <h1 className="hidden">
            Ingeniería Informática
          </h1>
          <p className="text-base sm:text-lg text-white drop-shadow-md">
            Accede a materiales de estudio, gestiona tu horario y consulta tu
            plan de estudios de manera eficiente.
          </p>
        </div>
        <p className="text-white animate-bounce mb-10 relative z-10">
          Desliza hacia abajo
        </p>
      </div>

      {/* Sección de funcionalidades destacadas */}
      <section className="w-full py-12 bg-gray-900">
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
            href={thereToken ? "/horario" : "/login"}
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

      {/* Sección adicional: Características */}
      <section className="w-full py-16  bg-gray-900">
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
            icon={<CalendarMonth className="text-indigo-500 text-5xl mb-4" />}
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
    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800 shadow-md">
      {icon}
      <h4 className="text-lg sm:text-xl font-bold text-gray-200 mb-2">
        {title}
      </h4>
      <p className="text-sm sm:text-base text-gray-400">{description}</p>
    </div>
  );
};
