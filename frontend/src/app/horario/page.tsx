"use client";

import AddClassModal from "@/components/AddClassModal";
import FadeIn from "@/components/FadeIn";
import TypingEffect from "@/components/TypingEffect";
import { BACKEND_URL } from "@/constant/backend";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";

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

            <motion.div className="flex justify-between bg-gray-900 p-3 rounded-xl shadow-md overflow-auto">
                {days.map((day, index) => (
                    <motion.button
                        layoutId={day[daySelected] === day ? "selected" : ""}
                        key={index}
                        onClick={() => setDaySelected(index)}
                        className={`relative py-2 px-4 font-semibold transition rounded-lg text-indigo-700 w-full`}
                    >
                        <motion.p
                            className={
                                index === daySelected
                                    ? "text-transparent"
                                    : "text-gray-100"
                            }
                        >
                            {day}
                        </motion.p>

                        {days[daySelected] === day ? (
                            <motion.div
                                layoutId="fondo"
                                className="absolute inset-0 bg-gray-100 rounded-lg h-full flex items-center justify-center pointer-events-none "
                            >
                                {day}
                            </motion.div>
                        ) : null}
                    </motion.button>
                ))}
            </motion.div>

            {/* Clase List for the Selected Day */}

            <AnimatePresence mode="wait">
                {clases[daySelected] && (
                    <motion.div
                        key={daySelected}
                        layoutId={`clases-${daySelected}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 md:w-4/5 mx-auto"
                    >
                        {clases[daySelected]?.length > 0 ? (
                            clases[daySelected].map(
                                (clase: Clase, index: number) => (
                                    <Clase key={index} clase={clase} />
                                )
                            )
                        ) : (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xl text-white text-center"
                            >
                                Sin clases para el dia {days[daySelected]}
                            </motion.h1>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <AddClassModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow"
        >
            <motion.h2 className="font-bold text-xl mb-2 text-indigo-600">
                {clase.materia}
            </motion.h2>
            <motion.p className="text-gray-400 mb-1">
                <span className="font-semibold">Profesor:</span> {clase.docente}
            </motion.p>
            <motion.p className="text-gray-400 mb-4">
                <span className="font-semibold">Ubicación:</span> {clase.lugar}
            </motion.p>
            <motion.div className="flex justify-between items-center text-gray-400">
                <motion.p className="font-semibold">
                    {clase.horaInicio}
                </motion.p>
                <motion.span className="text-gray-400">—</motion.span>
                <motion.p className="font-semibold">{clase.horaFin}</motion.p>
            </motion.div>
        </motion.div>
    );
};

export default Page;
