"use client";
import { Search } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/constant/backend";
import MaterialTarget from "@/components/MaterialTarget";
import TypingEffect from "@/components/TypingEffect";

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
  const [allMaterias, setAllMaterias] = useState<Materia[]>([]); // Lista completa de materias

  const fetchMaterias = async () => {
    try {
      const res = await fetch(BACKEND_URL + "/api/materias");
      if (res.ok) {
        const { data } = await res.json();
        setMaterias(data); // Inicializa ambas listas
        setAllMaterias(data);
      }
    } catch (e) {
      console.error("Error al obtener las materias:", e);
    }
  };

  const seachMaterias = () => {
    // Filtrar sobre la lista completa
    const filteredMaterias = allMaterias.filter((materia) =>
      materia.nombre.toLowerCase().includes(search.toLowerCase())
    );
    setMaterias(filteredMaterias);
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-10 px-4 lg:px-8 bg-gray-900">
      {/* Título */}
      <TypingEffect text="Materiales de Estudio" className="text-3xl text-white text-center"/>

      {/* Barra de búsqueda */}
      <div className="flex justify-center items-center w-full max-w-xl rounded-3xl border border-indigo-700 bg-gray-800 overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca materias..."
          className="w-full px-4 py-2 bg-transparent text-gray-200 placeholder-gray-400 text-sm focus:outline-none"
        />
        <button
          className="bg-indigo-700 p-2 flex items-center justify-center hover:bg-indigo-800 transition-colors"
          onClick={seachMaterias}
        >
          <Search className="text-white" />
        </button>
      </div>

      {/* Materiales */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full pb-10">
        {materias.map((materia, index) => (
          <MaterialTarget
            key={index}
            title={materia.nombre}
            link={`/material/materia/${materia.id}`}
            srcImage={materia.urlImagen}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
