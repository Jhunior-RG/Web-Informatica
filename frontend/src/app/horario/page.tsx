"use client";

import { Add } from "@mui/icons-material";
import { useState } from "react";


const Page = () => {
    const [daySelected, setDaySelected] = useState(0);
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const courses = [
        [
            {
                course: "Programación Web",
                teacher: "Vladimir Costas",
                location: "691 F",
                startTime: "06:45",
                endTime: "08:45",
            },
            {
                course: "Base de Datos I",
                teacher: "Boris Calancha",
                location: "Info Lab",
                startTime: "08:45",
                endTime: "11:15",
            },
        ],
        [
            {
                course: "Inteligencia Artificial",
                teacher: "Maria Perez",
                location: "Aula 12",
                startTime: "09:00",
                endTime: "11:00",
            },
        ],
        [], 
        [
            {
                course: "Redes de Computadoras I",
                teacher: "Carlos Gutierrez",
                location: "Lab Redes",
                startTime: "10:00",
                endTime: "12:00",
            },
        ],
        [], 
    ];

    return (
        <div className="container mx-auto p-5 space-y-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-3xl">Horario</h1>
                <button className="bg-indigo-600 text-white flex items-center rounded-full px-5 py-2 space-x-2 hover:bg-indigo-700 transition">
                    <Add />
                    <span>Agregar Clase</span>
                </button>
            </div>

            <div className="flex justify-between bg-gray-100 p-3 rounded-xl shadow-md overflow-auto">
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setDaySelected(index)}
                        className={`py-2 px-4 font-semibold transition ${
                            index === daySelected
                                ? "text-indigo-700 border-b-4 border-indigo-700"
                                : "text-gray-600"
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {courses[daySelected]?.length > 0 ? (
                    courses[daySelected].map((course, index) => (
                        <Course course={course} key={index} />
                    ))
                ) : (
                    <div className="text-center text-white p-5">
                        No hay clases para este día.
                    </div>
                )}
            </div>
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5">
            <h2 className="font-bold text-xl mb-2 text-indigo-600">{course.course}</h2>
            <p className="text-gray-600 mb-1">
                <span className="font-semibold">Profesor:</span> {course.teacher}
            </p>
            <p className="text-gray-600 mb-4">
                <span className="font-semibold">Ubicación:</span> {course.location}
            </p>
            <div className="flex justify-between items-center text-gray-600">
                <p className="font-semibold">{course.startTime}</p>
                <span className="text-gray-400">—</span>
                <p className="font-semibold">{course.endTime}</p>
            </div>
        </div>
    );
};

export default Page;
