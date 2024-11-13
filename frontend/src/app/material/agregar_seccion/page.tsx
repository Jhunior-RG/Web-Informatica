"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AgregarSeccion = () => {
  const [nombre, setNombre] = useState("");
  const [idMateria, setIdMateria] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const seccion = {
        nombre,
        idMateria,
      };
      await axios.post("http://localhost:4000/api/materiales/seccion", seccion);
      console.log(seccion)
      setNombre("");
      router.back()
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedId = sessionStorage.getItem("idMateria");
    if (storedId) {
      setIdMateria(parseInt(storedId, 10)); // Convertir la cadena a entero
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 w-full max-w-2xl mx-auto py-8 px-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
          Agregar Nueva Sección
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tituloSeccion" className="block text-gray-300">
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
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Sección"}
          </button>
          {error && (
            <p className="text-red-500 mt-4" aria-live="assertive">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AgregarSeccion;
