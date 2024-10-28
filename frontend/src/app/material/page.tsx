"use client";
import { Search } from "@mui/icons-material";

import introduccionImg from "../../public/introduccion.png";
import algebraImg from "../../public/algebra.png";
import calculoImg from "../../public/calculo.png";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/constant/backend";
import MaterialTarget from "@/components/MaterialTarget";

interface Materia {
    id: number;
    nombre: string;
    esElectiva: boolean;
    idSemestre: number;
    urlImagen: string;
}

const Home = () => {
    const [search, setSearch] = useState("");
    const [materias, setMaterias] = useState<Materia[]>([]);
    const fetchMaterias = async () => {
        try {
            const res = await fetch(BACKEND_URL + "/api/materias");
            if (res.ok) {
                const { data } = await res.json();
                setMaterias(data);
            }
        } catch (e) {}
    };
    useEffect(() => {
        fetchMaterias();
    }, []);
    return (
        <div className="w-full flex flex-col items-center py-6 space-y-10 px-4 lg:px-8 bg-gray-900">
            {/* Título */}
            <h1 className="font-extrabold text-4xl text-white tracking-tight mb-4 text-center">
                Materiales de Estudio
            </h1>

            {/* Barra de búsqueda */}
            <div className="flex justify-center items-center w-full max-w-xl rounded-full border-2 border-indigo-800 bg-gray-800 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Busca apuntes, programación, ejercicios..."
                    className="w-full px-5 py-3 bg-transparent text-gray-200 placeholder-gray-400 text-sm focus:outline-none "
                />
                <button className="bg-indigo-800 p-3 items-center justify-center">
                    <Search className="text-white" />
                </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-4 flex-wrap justify-center">
                <button className="px-5 py-2 bg-gray-800 border-white border text-white rounded-full transition-colorsshadow-lg">
                    Materias
                </button>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-full transition-colors hover:bg-indigo-700 shadow-lg">
                    Lenguajes de Programacion
                </button>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-full transition-colors hover:bg-indigo-700 shadow-lg">
                    Redes
                </button>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-full transition-colors hover:bg-indigo-700 shadow-lg">
                    Popular
                </button>
            </div>

            {/* Materiales */}
            <h2 className="font-bold text-3xl text-gray-200 text-center">
                Materias
            </h2>

            {/* Grid de materiales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {materias.map((materia, index) => (
                    <MaterialTarget
                        key={index}
                        title={materia.nombre}
                        link={`/material/materia/${materia.id}`}
                    />
                ))}
                <MaterialTarget
                    title="Introducción a la Programación"
                    description="Accede al material necesario para aprender a programar desde cero."
                    srcImage={introduccionImg}
                    link="/material/introduccion"
                    isPopular={true}
                />
                <MaterialTarget
                    title="Álgebra I"
                    description="Encuentra material para resolver ejercicios de álgebra de manera efectiva."
                    srcImage={algebraImg}
                    link="/material/algebra"
                    isPopular={false}
                />
                <MaterialTarget
                    title="Cálculo I"
                    description="Recursos esenciales para aprender y practicar ejercicios de cálculo."
                    srcImage={calculoImg}
                    link="/material/calculo"
                    isPopular={false}
                />
            </div>
        </div>
    );
};

export default Home;
