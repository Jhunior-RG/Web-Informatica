"use client";

import AddClassModal from "@/components/AddClassModal";
import FadeIn from "@/components/FadeIn";
import TypingEffect from "@/components/TypingEffect";
import { BACKEND_URL } from "@/constant/backend";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const [daySelected, setDaySelected] = useState(0);
    const [clases, setClases] = useState<Clase[][]>([[]]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const days = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];
    const router = useRouter();
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/login");
    }

    useEffect(() => {
        const getHorarios = async () => {
            const res = await fetch(BACKEND_URL + "/api/horarios", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const { data } = await res.json();
                console.log(data);
                const horario = days.map((day) =>
                    data[day] === undefined ? [] : data[day]
                );

                setClases(horario);
            }
        };
        getHorarios();
    }, [isModalOpen]);

    console.log(clases);
    console.log(clases[daySelected]);

    return (
        <div className="container mx-auto p-5 space-y-5">
            {/* Header Section */}
            <FadeIn>
                <div className="flex justify-between items-center mb-4">
                    <TypingEffect text="Horario" />

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white flex items-center rounded-full px-5 py-2 space-x-2 hover:bg-indigo-700 transition"
                    >
                        <Add />
                        Agregar
                    </button>
                </div>
            </FadeIn>

            {/* Days Selector */}
            <FadeIn delay={500}>
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
            </FadeIn>

            {/* Clase List for the Selected Day */}
            <FadeIn delay={1000}>
                <div className="space-y-4  md:w-4/5 mx-auto">
                    {clases[daySelected]?.length > 0 ? (
                        clases[daySelected].map(
                            (clase: Clase, index: number) => (
                                <Clase key={index} clase={clase} />
                            )
                        )
                    ) : (
                        <h1 className="text-xl text-white text-center">
                            Sin clases para el dia {days[daySelected]}
                        </h1>
                    )}
                </div>
            </FadeIn>
            <AddClassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
interface Clase {
    idGrupo: string;
    materia: string;
    docente: string;
    lugar: string;
    horaInicio: string;
    horaFin: string;
    length: number;
}

interface ClaseProps {
    clase: Clase;
}

const Clase: React.FC<ClaseProps> = ({ clase }) => {
    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow">
            <h2 className="font-bold text-xl mb-2 text-indigo-600">
                {clase.materia}
            </h2>
            <p className="text-gray-400 mb-1">
                <span className="font-semibold">Profesor:</span> {clase.docente}
            </p>
            <p className="text-gray-400 mb-4">
                <span className="font-semibold">Ubicación:</span> {clase.lugar}
            </p>
            <div className="flex justify-between items-center text-gray-400">
                <p className="font-semibold">{clase.horaInicio}</p>
                <span className="text-gray-400">—</span>
                <p className="font-semibold">{clase.horaFin}</p>
            </div>
        </div>
    );
};

export default Page;
