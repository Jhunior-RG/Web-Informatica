"use client";

import AddClassModal from "@/components/AddClassModal";
import TypingEffect from "@/components/TypingEffect";
import { BACKEND_URL } from "@/constant/backend";
import { Add, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { token } from "@/constant/token";
import TargetClass from "@/components/TargetClass";
import { colorPalettes } from "@/constant/colorsTailwind";
import SelectDaltonism from "@/components/SelectDaltonism";

export type daltonismOptions =
    | "default"
    | "protanopia"
    | "deuteranopia"
    | "tritanopia";
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const horas = Array(24)
    .fill("")
    .map((_, i) => `${i}:00`);

const Page = () => {
    const [colorPalette, setColorPalette] =
        useState<daltonismOptions>("default");
    const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);
    const [clases, setClases] = useState<TargetClass[][]>([[]]);
    const [horaActual, setHoraActual] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);

    const toggleSettingsMenu = () => {
        setShowSettingsMenu(!showSettingsMenu);
    };

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
                const horario = dias.map((day) =>
                    data[day] === undefined ? [] : data[day]
                );

                setClases(horario);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const getTailwindColor = (index: number) => {
        const selectedPalette = colorPalettes[colorPalette];
        return selectedPalette[index % selectedPalette.length];
    };

    useEffect(() => {
        const interval = setInterval(() => setHoraActual(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const getClassBorderColor = (horaInicio: string, horaFin: string) => {
        const inicio = new Date();
        const fin = new Date();
        const [startHour, startMinute] = horaInicio.split(":").map(Number);
        const [endHour, endMinute] = horaFin.split(":").map(Number);

        inicio.setHours(startHour, startMinute, 0);
        fin.setHours(endHour, endMinute, 0);

        if (horaActual >= inicio && horaActual < fin) {
            return "animate-bounce";
        } else {
            return "border-white";
        }
    };
    const getTopPixels = (startHour: string) => {
        const [hour, minute] = startHour.split(":").map(Number);
        const top = (hour + 1) * 64 + minute;
        return `${top}px`;
    };
    const getHeightPixels = (horaInicio: string, horaFin: string) => {
        const [startHour, startMinute] = horaInicio.split(":").map(Number);
        const [endHour, endMinute] = horaFin.split(":").map(Number);

        const height = (endHour - startHour) * 64 + (endMinute - startMinute);

        return `${height}px`;
    };

    const getTopPixelsCurrentTime = () => {
        const horas = horaActual.getHours() + 1;
        const minutes = horaActual.getMinutes();
        return `${horas * 64 + minutes}px`;
    };

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
        fetchHorarios();
    }, [router]);

    const removeGroup = async (idGrupo: number) => {
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
        <div className=" bg-gray-800 mx-auto pt-5 ">
            <div className="flex justify-between items-center mx-4">
                <TypingEffect className="text-indigo-200 text-3xl md:text-4xl" text="Horario" />

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white flex items-center rounded-full px-3 py-2 space-x-2 hover:bg-indigo-400 transition"
                >
                    <Add />
                    Agregar
                </button>
                
                <AnimatePresence>
                    {showSettingsMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-20  rounded-lg shadow-lg z-30 w-full justify-items-center"
                        >
                            <div className="bg-gray-700 p-4  w-4/5 rounded-md max-w-96">

                            <SelectDaltonism setColorPalette={setColorPalette} />
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={toggleSettingsMenu}
                    className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                    <Settings fontSize="medium" />
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
                <div className="relative flex flex-col h-full">
                    <div className="h-16 border-b border-gray-300 flex items-inicio text-xs text-gray-500"></div>
                    {horas.map((hour, index) => (
                        <div
                            key={index}
                            className="h-16 border-b border-gray-300 flex items-center justify-center text-gray-100 font-semibold"
                        >
                            {hour}
                        </div>
                    ))}
                </div>

                <div
                    className={`absolute w-full h-1 ${getTailwindColor(0)} mt-4`}
                    style={{ top: getTopPixelsCurrentTime() }}
                />

                {dias.map((day, dayIndex) => (
                    <div
                        key={dayIndex}
                        className={`relative h-full border-l border-gray-500 ${
                            diaSeleccionado !== null
                                ? diaSeleccionado === dayIndex
                                    ? "col-span-6"
                                    : "hidden"
                                : ""
                        }`}
                    >
                        <button
                            className="sticky top-2 z-20 rounded-lg text-indigo-800 border-b-4 border-r-4 border-indigo-600  p-2 border-right-0 left-0 text-center w-full font-bold bg-gray-100"
                            onClick={() => {
                                setDiaSeleccionado(
                                    diaSeleccionado === null ? dayIndex : null
                                );
                            }}
                        >
                            {diaSeleccionado === null
                                ? day.slice(0, 2).toUpperCase()
                                : day.toUpperCase()}
                        </button>

                        {/* Clases para cada día */}
                        {clases[dayIndex]?.map((clase, index) => (
                            <motion.div
                                key={index}
                                className={`absolute left-0 right-0   text-gray-50 rounded-xl shadow-md border-gray-200  flex items-center justify-center font-bold text-center text-xs ${getTailwindColor(
                                    clase.idGrupo
                                )} 
                                ${getClassBorderColor(
                                    clase.horaInicio,
                                    clase.horaFin
                                )}`}
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
                                    minimal={diaSeleccionado === null}
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
