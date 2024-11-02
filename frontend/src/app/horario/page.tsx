"use client";

import AddClassModal from "@/components/AddClassModal";
import TypingEffect from "@/components/TypingEffect";
import { BACKEND_URL } from "@/constant/backend";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { token } from "@/constant/token";
import TargetClass from "@/components/TargetClass";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = Array(24)
    .fill("")
    .map((_, i) => `${i}:00`);

const Page = () => {
    const [daySelected, setDaySelected] = useState<number | null>(null);
    const [clases, setClases] = useState<TargetClass[][]>([[]]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const fetchHorarios = async () => {
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
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const getTopPixels = (startHour: string) => {
        const [hour, minute] = startHour.split(":").map(Number);
        const top = (hour + 1) * 64 + minute;
        return `${top}px`;
    };
    const getHeightPixels = (startTime: string, endTime: string) => {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const height = (endHour - startHour) * 64 + (endMinute - startMinute);

        return `${height}px`;
    };

    const getTopPixelsCurrentTime = () => {
        const hours = currentTime.getHours() + 1;
        const minutes = currentTime.getMinutes();
        return `${(hours * 60 + minutes) * (64 / 60)}px`; // 64px por hora
    };

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
        fetchHorarios();
    }, [router]);

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
                fetchHorarios();
            } else {
                const { error } = await res.json();
                console.error("Error al eliminar grupo:", error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className=" bg-white mx-auto pt-5 ">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <TypingEffect className="text-indigo-800" text="Horario" />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-800 text-white flex items-center rounded-full px-5 py-2 space-x-2 hover:bg-indigo-600 transition"
                >
                    <Add />
                    Agregar
                </button>
            </div>

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
                        transition={{ duration: 0.1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center "
                    >
                        <AddClassModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            fetchHorarios={fetchHorarios}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative grid grid-cols-7  h-full py-4`}>
                {/* Columna de horas */}
                <div className="relative flex flex-col h-full">
                    <div className="h-16 border-b border-gray-300 flex items-start text-xs text-gray-500"></div>
                    {hours.map((hour, index) => (
                        <div
                            key={index}
                            className="h-16 border-b border-gray-300 flex items-start justify-center  text-indigo-800 font-semibold"
                        >
                            {hour}
                        </div>
                    ))}
                </div>

                {/* Línea de tiempo de la hora actual */}
                <div
                    className="absolute w-full h-1 bg-sky-500 mt-4"
                    style={{ top: getTopPixelsCurrentTime(), right: 0 }}
                />

                {/* Columna de cada día */}

                {days.map((day, dayIndex) => (
                    <div
                        key={dayIndex}
                        className={`relative h-full border-l border-gray-300 ${
                            daySelected !== null
                                ? daySelected === dayIndex
                                    ? "col-span-6"
                                    : "hidden"
                                : ""
                        }`}
                    >
                        <button
                            className="sticky top-2 z-20 rounded-full  text-indigo-800 border-b-4 border-l-4 border-indigo-800  p-2 border-right-0 left-0 text-center w-full font-bold bg-white"
                            onClick={() => {
                                setDaySelected(
                                    daySelected === null ? dayIndex : null
                                );
                            }}
                        >
                            {daySelected === null
                                ? day.slice(0, 2).toUpperCase()
                                : day.toUpperCase()}
                        </button>

                        {/* Clases para cada día */}
                        {clases[dayIndex]?.map((clase, index) => (
                            <motion.div
                                key={index}
                                className="absolute left-0 right-0 border border-b-4 border-t-4 text-indigo-800 rounded-xl shadow-lg border-gray-600 flex items-center justify-center font-bold text-center text-xs"
                                style={{
                                    top: getTopPixels(clase.horaInicio),
                                    height: getHeightPixels(
                                        clase.horaInicio,
                                        clase.horaFin
                                    ),
                                }}
                            >
                                <TargetClass
                                    key={index}
                                    minimal={daySelected === null}
                                    clase={clase}
                                    removeGroup={removeGroup}
                                />
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
