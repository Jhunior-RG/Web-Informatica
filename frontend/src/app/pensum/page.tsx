"use client";
import { BACKEND_URL } from "@/constant/backend";
import {
    ArrowDropDown,
    ArrowDropUp,
    CheckCircle,
    HourglassEmpty,
    Cancel,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
interface CourseProps {
    id: number;
    name: string;
    status: "Aprobado" | "En Curso" | "Pendiente"; // Restringimos a valores específicos
    calification?: number; // Calificación es opcional
}

interface SemesterProps {
    title: string;
    progress: number; // Progreso del semestre
    courses: CourseProps[];
}
const Pensum: React.FC = () => {
    const semesters: SemesterProps[] = [
        // Usamos la interfaz SemesterProps
        {
            title: "Primer Semestre",
            progress: 2 / 4,
            courses: [
                {
                    id: 1,
                    name: "Álgebra I",
                    status: "Aprobado",
                    calification: 60,
                },
                {
                    id: 2,
                    name: "Introducción a la Programación",
                    status: "En Curso",
                },
                { id: 3, name: "Inglés I", status: "Pendiente" },
                { id: 4, name: "Cálculo I", status: "Pendiente" },
            ],
        },
        {
            title: "Segundo Semestre",
            progress: 0,
            courses: [
                { id: 5, name: "Cálculo II", status: "Pendiente" },
                { id: 6, name: "Estructuras de Datos", status: "Pendiente" },
                { id: 7, name: "Inglés II", status: "Pendiente" },
            ],
        },
    ];
    const [semestres, setSemestres] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(BACKEND_URL + "/api/materias/semestres");

            if (!res.ok) return;

            const {data} = await res.json();
            console.log(data);

            setSemestres(data);
        };

        getData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-5 space-y-6 w-full">
            <h1 className="text-4xl font-bold text-white mb-5">
                Plan de Estudios por Semestre
            </h1>

            {semestres.map((semestre, index) => (
              <DropDown key={index} title={semestre.nombre} courses={semestre.Materia} />
            ))}
            {semesters.map((semester, index) => (
                <DropDown
                    key={index}
                    title={semester.title}
                    courses={semester.courses}
                    progress={semester.progress}
                />
            ))}
        </div>
    );
};

function DropDown({ title, courses, progress }: SemesterProps) {
    const [openDropDown, setOpenDropDown] = useState(false);

    return (
        <div className="w-full max-w-lg transition-all duration-300">
            <button
                onClick={() => setOpenDropDown(!openDropDown)}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg my-1 py-3 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold">{title}</p>
                        <div className="relative w-full h-2 bg-gray-300 rounded-full mt-2">
                            <div
                                className="absolute top-0 h-2 rounded-full bg-green-400"
                                style={{ width: `${progress * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    {!openDropDown ? <ArrowDropDown /> : <ArrowDropUp />}
                </div>
            </button>
            {openDropDown && (
                <div className="bg-gray-700 rounded-lg p-4 shadow-md transition-all duration-300">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
}

function CourseCard({ course }: { course: CourseProps }) {
    // Usamos la interfaz CourseProps
    const statusColors = {
        Aprobado: "text-green-600",
        "En Curso": "text-yellow-600",
        Pendiente: "text-red-600",
    };

    const statusIcons = {
        Aprobado: <CheckCircle className="text-green-600" />,
        "En Curso": <HourglassEmpty className="text-yellow-600" />,
        Pendiente: <Cancel className="text-red-600" />,
    };

    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
                {statusIcons[course.status]}
                <div>
                    <p className="font-semibold text-gray-200">{course.nombre || course.name}</p>
                    <p
                        className={`text-sm font-medium ${
                            statusColors[course.status]
                        }`}
                    >
                        {course.status}
                    </p>
                </div>
            </div>
            {course.calification !== undefined && ( // Comprobamos que la calificación exista
                <p className="text-sm font-medium text-gray-400">
                    {course.calification} / 100
                </p>
            )}
        </div>
    );
}

export default Pensum;
