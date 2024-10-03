"use client";
import React from "react";
import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'; 
import Link from "next/link";

const Page = () => {

    const courses = [
        { course: "Introducción a la Programación", state: "Aprobado" },
        { course: "Base de Datos I", state: "Aprobado" },
        { course: "Programación Web", state: "En Curso", progress: 60 },
        { course: "Taller de Sistemas Operativos", state: "Aprobado" },
        { course: "Taller de Grado I", state: "Pendiente" },
    ];
    const totalCourses = courses.length;
    const totalCoursesApproved = courses.filter((c) => c.state === "Aprobado").length;
    const totalCoursesInProgress = courses.filter((c) => c.state === "En Curso").length;
    const totalCoursesPending = courses.filter((c) => c.state === "Pendiente").length;
    const progress = (totalCoursesApproved / totalCourses) * 100;

    return (
        <div className="p-5 space-y-5 bg-gray-900"> {/* Cambiar el color de fondo a un azul oscuro */}
            <h1 className="text-2xl font-bold mb-4 text-white">Progreso Académico Actual</h1> {/* Título más claro */}

            {/* Barra de progreso general */}
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex items-center justify-between w-full">

            <p className="text-sm font-medium text-gray-200">Has completado {totalCoursesApproved} de {totalCourses} cursos.</p>
            <Link href='/progreso/agregar_tarea' className="text-white bg-indigo-600 py-2 px-3 rounded-full">
                Agregar Tarea
            </Link>
            </div>

            {/* Resumen de estados */}
            <div className="flex space-x-4 text-sm font-medium">
                <p className="text-green-700">Aprobados: {totalCoursesApproved}</p>
                <p className="text-yellow-600">En Curso: {totalCoursesInProgress}</p>
                <p className="text-red-600">Pendientes: {totalCoursesPending}</p>
            </div>

            {/* Lista de cursos */}
            <div className="space-y-4">
                {courses.map((course, index) => (
                    <Course key={index} course={course.course} state={course.state} progress={course.progress || 0} />
                ))}
            </div>
        </div>
    );
};

const Course = ({ course, state, progress }) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-500";
    let icon = <HourglassEmpty />;

    if (state === "Aprobado") {
        bgColor = "bg-green-100";
        textColor = "text-green-700";
        icon = <CheckCircle />;
    } else if (state === "En Curso") {
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-600";
        icon = <HourglassEmpty />;
    } else if (state === "Pendiente") {
        bgColor = "bg-red-100";
        textColor = "text-red-600";
        icon = <Cancel />;
    }

    return (
        <div className={`shadow-md rounded-lg p-4 flex justify-between items-center ${bgColor}`}>
            <div>
                <p className="font-semibold">{course}</p>
                
            </div>
       
            <div className={`text-2xl ${textColor}`}>{icon}</div>
        </div>
    );
};

export default Page;
