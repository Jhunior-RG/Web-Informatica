"use client";
import { ArrowDropDown, ArrowDropUp, CheckCircle, HourglassEmpty, Cancel } from "@mui/icons-material";
import React, { useState } from "react";

const Pensum = () => {
  const semesters = [
    {
      title: "Primer Semestre",
      progress: 2 / 4, // Progreso del semestre
      courses: [
        { id: 1, name: "Álgebra I", status: "Aprobado", calification: 60 },
        { id: 2, name: "Introducción a la Programación", status: "En Curso" },
        { id: 3, name: "Inglés I", status: "Pendiente" },
        { id: 4, name: "Cálculo I", status: "Pendiente" },
      ],
    },
    {
      title: "Segundo Semestre",
      progress: 0, // Sin avances
      courses: [
        { id: 5, name: "Cálculo II", status: "Pendiente" },
        { id: 6, name: "Estructuras de Datos", status: "Pendiente" },
        { id: 7, name: "Inglés II", status: "Pendiente" },
      ],
    },
  ];

  return (
    <div className=" flex flex-col items-center justify-center p-5 space-y-6 w-full "> {/* Fondo gris oscuro */}
      <h1 className="text-4xl font-bold text-white mb-5">Plan de Estudios por Semestre</h1>

      {/* Semestres */}
      {semesters.map((semester, index) => (
        <DropDown key={index} title={semester.title} courses={semester.courses} progress={semester.progress} />
      ))}
    </div>
  );
};

function DropDown({ title, courses, progress }) {
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <div className="w-full max-w-lg transition-all duration-300">
      {/* Botón para abrir/cerrar el semestre */}
      <button
        onClick={() => setOpenDropDown(!openDropDown)}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg my-1 py-3 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{title}</p>
            {/* Barra de progreso del semestre */}
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

      {/* Cursos dentro del semestre */}
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

function CourseCard({ course }) {
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
          <p className="font-semibold text-gray-200">{course.name}</p>
          <p className={`text-sm font-medium ${statusColors[course.status]}`}>
            {course.status}
          </p>
        </div>
      </div>
      {/* Mostrar calificación si el curso está aprobado */}
      {course.calification && (
        <p className="text-sm font-medium text-gray-400">{course.calification} / 100</p>
      )}
    </div>
  );
}

export default Pensum;
