"use client";

import AddClassModal from "@/components/AddClassModal";
import FadeIn from "@/components/FadeIn";
import TypingEffect from "@/components/TypingEffect";
import { BACKEND_URL } from "@/constant/backend";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

    const getHorarios = async () => {
        try {
            const res = await fetch(BACKEND_URL + "/api/horarios", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const { data } = await res.json();
                const horario = days.map((day) =>
                    data[day] === undefined ? [] : data[day]
                );

                setClases(horario);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getHorarios();
    }, []);

    const removeGroup = async (idGrupo: string) => {
        try {
            const res = await fetch(
                BACKEND_URL + "/api/horarios/grupos/" + idGrupo,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.ok) {
                const { message } = await res.json();
                console.log(message);
                getHorarios();
            } else {
                const { error } = await res.json();
                console.error("Error al eliminar grupo:", error);
            }
        } catch (e) {
            console.error(e);
        }
    };

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
                                className="absolute inset-0 bg-gray-100 rounded-full flex items-center justify-center shadow-md border-b-4 border-l-4 border-indigo-500"
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
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 md:w-4/5 mx-auto"
                    >
                        {clases[daySelected]?.length > 0 ? (
                            clases[daySelected].map(
                                (clase: Clase, index: number) => (
                                    <Clase
                                        key={index}
                                        clase={clase}
                                        removeGroup={removeGroup}
                                    />
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
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            backgroundColor: "rgba(0, 0, 0,0.5)",
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center "
                    >
                        <AddClassModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            getHorarios={getHorarios}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
interface Clase {
    idGrupo: string;
    grupo: string;
    materia: string;
    docente: string;
    lugar: string;
    horaInicio: string;
    horaFin: string;
    length: number;
}

interface ClaseProps {
    clase: Clase;
    removeGroup?: (idGrupo: string) => void;
}

const Clase: React.FC<ClaseProps> = ({ clase, removeGroup }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow"
        >
            <motion.div className="font-bold text-xl mb-2 text-indigo-600 grid grid-cols-4 w-full">
                <p className="text-indigo-500 px-5 col-span-2">
                    {clase.materia}
                </p>
                <p>{clase.grupo}</p>
                {removeGroup && (
                    <motion.button
                        onClick={() => removeGroup(clase.idGrupo)}
                        whileHover={{
                            backgroundColor: "red",
                            color: "white",
                            rotate: 180,
                        }}
                        initial={{
                            rotate: 0,
                            backgroundColor: "white",
                            color: "black",
                        }}
                        transition={{ duration: 0.5 }}
                        className="rounded-full  w-8 h-8 justify-self-end"
                    >
                        x
                    </motion.button>
                )}
            </motion.div>
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
