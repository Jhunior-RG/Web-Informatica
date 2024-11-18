"use client";
import axios from "axios";
import React, { useState, type FormEvent } from "react";

import { BACKEND_URL } from "@/constant/backend";
import { Close } from "@mui/icons-material";
import Loading from "./Loading";

interface Props {
    idMateria: string;
    onClose: () => void;
    isVisble: boolean;
}

const FormSeccion = ({ idMateria, onClose, isVisble }: Props) => {
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const seccion = {
                nombre,
                idMateria,
            };
            await axios.post(BACKEND_URL + "/api/materiales/seccion", seccion);
            console.log(seccion);
            setNombre("");
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    if (!isVisble) {
        return;
    }
    if (loading){
        return <Loading text="Creando Seccion"/>
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-gray-800 w-full max-w-2xl mx-auto py-8 px-6 rounded-xl">
                <button
                    className="absolute right-6 top-8 text-white hover:text-red-600"
                    onClick={onClose}
                >
                    <Close />
                </button>

                <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
                    Agregar Nueva Sección
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="tituloSeccion"
                            className="block text-gray-300"
                        >
                            Título de la Sección
                        </label>
                        <input
                            id="tituloSeccion"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-full mx-auto w-full hover:bg-green-700"
                    >
                        Crear Sección
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormSeccion;
