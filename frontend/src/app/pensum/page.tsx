"use client";
import { BACKEND_URL } from "@/constant/backend";
import { token } from "@/constant/token";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Felicitaciones from "@/components/Felicitaciones";
import TypingEffect from "@/components/TypingEffect";
import CourseCard from "@/components/CourseCard";
import type { Materia } from "@/types/Materia";

// Interfaz para los props y datos
interface SemesterProps {
    title: string;
    progress: number;
    courses: Materia[];
    getData: () => void;
}

interface Semestre {
    nombre: string;
    Materia: Materia[];
}

const Pensum: React.FC = () => {
    const [semestres, setSemestres] = useState<Semestre[]>([]);
    const [showModal, setShowModal] = useState(false);

    const calcularProgreso = (materias: Materia[]) => {
        let progreso = 0;
        for (const materia of materias) {
            if (
                materia.Estados.length !== 0 &&
                materia.Estados[0].estado === "Aprobado"
            ) {
                progreso += 1;
            }
        }
        return progreso;
    };

    const getData = async () => {
        try {
            const res = await axios.get(BACKEND_URL + "/api/pensum", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setSemestres(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const egresar = () => {
            let progreso = 0;
            for (const semestre of semestres) {
                const materias = semestre.Materia;
                for (const materia of materias) {
                    if (
                        materia.Estados.length !== 0 &&
                        materia.Estados[0].estado === "Aprobado"
                    ) {
                        progreso += 1;
                    }
                }
            }
            return progreso;
        };
        if (egresar() >= 48) {
            setShowModal(true);
        }
    }, [semestres]);

    return (
        <div className="flex flex-col items-center justify-center p-5 first:space-y-6 w-full">
            <div>
                <Felicitaciones
                    isVisible={showModal}
                    onClose={() => setShowModal(false)}
                />
            </div>

            <TypingEffect
                className="text-4xl text-white"
                text="Malla Curricular"
            />
            {semestres.map((semestre, index) => (
                <DropDown
                    key={index}
                    title={semestre.nombre}
                    courses={semestre.Materia}
                    progress={calcularProgreso(semestre.Materia)}
                    getData={getData}
                />
            ))}
        </div>
    );
};

function DropDown({ title, courses, getData, progress }: SemesterProps) {
    const [openDropDown, setOpenDropDown] = useState(false);
    const total = title === "Electivas" ? 6 : courses.length;
    return (
        <div className="w-full max-w-lg transition-all duration-300">
            <button
                onClick={() => setOpenDropDown(!openDropDown)}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg my-1 py-3 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold">{title}</p>
                        <div className="relative w-32 h-2 bg-gray-300 rounded-full mt-2">
                            <div
                                className="absolute top-0 h-2 rounded-full bg-green-400"
                                style={{
                                    width: `${(progress * 100) / total}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    {!openDropDown ? <ArrowDropDown /> : <ArrowDropUp />}
                </div>
            </button>
            {openDropDown && (
                <div className="bg-gray-700 rounded-lg p-4 shadow-md transition-all duration-300">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            getData={getData}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Pensum;
