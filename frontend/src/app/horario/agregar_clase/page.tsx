"use client";

import { BACKEND_URL } from "@/constant/backend";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

interface Semestre {
    id: number;
    nombre: string;
}
interface Materia {
    id: number;
    nombre: string;
}
interface Grupo {
    id: number;
    nombre: string;
    docente: string;
}

interface Clase {
    id: number;
    aula: string;
    dia: number;
    lugar: string;
    horaInicio: number;
    horaFin: number;
}

const AddClassForm = () => {
    const [semestres, setSemestres] = useState<Semestre[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [clases, setClases] = useState<Clase[]>([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        const getSemestres = async () => {
            const res = await fetch(BACKEND_URL + "/api/semestres");
            if (!res.ok) {
                return;
            }
            const data = await res.json();
            setSemestres(data);
        };

        getSemestres();
    }, []);

    const handleSemestreChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;
        setMaterias([]);
        setGrupos([]);
        setClases([]);

        const res = await fetch(BACKEND_URL + `/api/semestres/${id}/materias`);
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        setMaterias(data);
        setGrupoSeleccionado("");
    };

    const handleMateriaChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;

        setGrupos([]);
        setClases([]);

        const res = await fetch(BACKEND_URL + `/api/materias/${id}/grupos`);
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        setGrupos(data);
        setGrupoSeleccionado("");
    };

    const handleGrupoChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id = e.target.value;
        setClases([]);
        const res = await fetch(BACKEND_URL + `/api/grupos/${id}/clases`);
        if (!res.ok) {
            return;
        }
        setGrupoSeleccionado(id);
        const data = await res.json();
        setClases(data);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            idGrupo: grupoSeleccionado,
        };
        const token = localStorage.getItem("token");
        const res = await fetch(BACKEND_URL + "/api/horarios", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const { message } = await res.json();
        if (res.ok) {
            alert("Clase agregada exitosamente");
            router.push("/horario");
        } else {
            if (message === "Token invalido") {
                alert("su sesion ha caducado");
                localStorage.removeItem("token");
                router.push("/login");
            }
            console.error("message: ", message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-sm md:max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                    Agregar Nueva Clase
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-300">Semestre</label>
                        <select
                            name="semestres"
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                            onChange={handleSemestreChange}
                        >
                            <option value="" selected>
                                Seleccione un semestre
                            </option>
                            {semestres.map((semestre, index) => (
                                <option key={index} value={semestre.id}>
                                    {semestre.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-300">Materias</label>
                        <select
                            name="materias"
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                            onChange={handleMateriaChange}
                        >
                            <option value="" selected>
                                Seleccione una materia
                            </option>
                            {materias.map((materia, index) => (
                                <option key={index} value={materia.id}>
                                    {materia.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-300">Grupo</label>
                        <select
                            name="grupo"
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                            onChange={handleGrupoChange}
                        >
                            <option value="" selected>
                                Seleccione un grupo
                            </option>
                            {grupos.map((grupo, index) => (
                                <option key={index} value={grupo.id}>
                                    {grupo.nombre} - {grupo.docente}
                                </option>
                            ))}
                        </select>
                    </div>

                    {clases.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-bold text-indigo-400">
                                Clases
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                {clases.map((clase, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-700 p-4 rounded-lg shadow-lg"
                                    >
                                        <h4 className="text-white font-semibold">
                                            {clase.dia}
                                        </h4>
                                        <p className="text-gray-300">
                                            {clase.lugar}
                                        </p>
                                        <p className="text-indigo-300">
                                            {clase.horaInicio} - {clase.horaFin}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClassForm;
