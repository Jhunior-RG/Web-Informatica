"use client";
import { BACKEND_URL } from "@/constant/backend";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";

// Mock data for demonstration purposes
const Page = () => {
    const [daySelected, setDaySelected] = useState(0);
    const [clases, setClases] = useState<Clase[]>([]);
    const days = [
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
    ];
    useEffect(() => {
        const getHorarios = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(BACKEND_URL + "/api/horarios", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data["JUEVES"]);

                const horario = days.map((day) =>
                    data[day] === undefined ? [] : data[day]
                );

                setClases(horario);
            }
        };
        getHorarios();
    }, []);

    console.log(clases);
    console.log(clases[daySelected]);

    return (
        <div className="container mx-auto p-5 space-y-5">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-3xl text-white">Horario</h1>
                <Link
                    href="/horario/agregar_clase"
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

            {/* Clase List for the Selected Day */}
            <div className="space-y-4">
                {clases[daySelected]?.length > 0 ? (
                    clases[daySelected].map((clase, index) => (
                        <Clase key={index} clase={clase} />
                    ))
                ) : (
                    <h1 className="text-xl text-white">
                        NO HAY CLASES EL DIA {days[daySelected]}
                    </h1>
                )}

                {/*clases[daySelected]?.length > 0 ? (
                    clases[daySelected].map((clase, index) => (
                        <Clase clase={clase} key={index} />
                    ))
                ) : (
                    <div className="text-center text-gray-500 p-5 flex flex-col items-center">
                        <p className="font-semibold mb-2">
                            No hay clases programadas para este día.
                        </p>
                    </div>
                )*/}
            </div>
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
    map: any;
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
