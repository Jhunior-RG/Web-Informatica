"use client";
import React from "react";
import { CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";

const Page = () => {
    const totalCourses = 22;

    const courses = [
        { course: "Introduccion a la Programacion", state: "Aprobado" },
        { course: "Base de Datos I", state: "Aprobado" },
        { course: "Programacion Web", state: "En Curso" },
        { course: "Taller de Sistemas Operativos", state: "Aprobado" },
        { course: "Taller de Grado I", state: "Pendiente" },
    ];

    const totalCoursesApproved = courses.filter(
        (c) => c.state === "Aprobado"
    ).length;

    const progress = (totalCoursesApproved / totalCourses) * 100;

    return (
        <div className="p-5 space-y-5">
            <h1 className="text-2xl font-bold mb-4 ">Progreso Académico</h1>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
                <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-sm font-medium text-white">
                Has completado {totalCoursesApproved} de {totalCourses} cursos.
            </p>

            {/* Lista de cursos */}
            <div className="space-y-4">
                {courses.map((course, index) => (
                    <Course
                        key={index}
                        course={course.course}
                        state={course.state}
                    />
                ))}
            </div>
        </div>
    );
};

const Course = ({ course, state }) => {
    // Define color y icono según el estado del curso
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
                <p className={`text-sm font-medium ${textColor}`}>{state || "No especificado"}</p>
            </div>
            <div className={`text-2xl ${textColor}`}>{icon}</div>
        </div>
    );
};

export default Page;
