"use client";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

// Mock data for demonstration purposes
const Page = () => {
    const [daySelected, setDaySelected] = useState(0);
    const days = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];
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
                teacher: "Carmen Rosa",
                location: "691F",
                startTime: "11:15",
                endTime: "12:45",
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
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-3xl text-white">Horario</h1>
                <Link
                    href='/horario/agregar_clase'
                    className="bg-indigo-600 text-white flex items-center rounded-full px-5 py-2 space-x-2 hover:bg-indigo-700 transition"
                >
                    <Add />
                    <span>Agregar Clase</span>
                </Link>
            </div>

            {/* Days Selector */}
            <div className="flex justify-between bg-gray-900 p-3 rounded-xl shadow-md overflow-auto">
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setDaySelected(index)}
                        className={`py-2 px-4 font-semibold transition rounded-lg ${
                            index === daySelected
                                ? "text-indigo-700 bg-indigo-100 border-b-4 border-indigo-700"
                                : "text-gray-300"
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Course List for the Selected Day */}
            <div className="space-y-4">
                {courses[daySelected]?.length > 0 ? (
                    courses[daySelected].map((course, index) => (
                        <Course course={course} key={index} />
                    ))
                ) : (
                    <div className="text-center text-gray-500 p-5 flex flex-col items-center">
                        <p className="font-semibold mb-2">
                            No hay clases programadas para este día.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
interface CourseProps {
    course: {
        course: string;
        teacher: string;
        location: string;
        startTime: string;
        endTime: string;
    };
}

const Course: React.FC<CourseProps> = ({ course }) => {
    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow">
            <h2 className="font-bold text-xl mb-2 text-indigo-600">
                {course.course}
            </h2>
            <p className="text-gray-400 mb-1">
                <span className="font-semibold">Profesor:</span>{" "}
                {course.teacher}
            </p>
            <p className="text-gray-400 mb-4">
                <span className="font-semibold">Ubicación:</span>{" "}
                {course.location}
            </p>
            <div className="flex justify-between items-center text-gray-400">
                <p className="font-semibold">{course.startTime}</p>
                <span className="text-gray-400">—</span>
                <p className="font-semibold">{course.endTime}</p>
            </div>
        </div>
    );
};

export default Page;
