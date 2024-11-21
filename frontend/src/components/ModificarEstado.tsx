"use client";

import React, { FormEvent, useState } from "react";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { BACKEND_URL } from "@/constant/backend";
import { token } from "@/constant/token";

interface Estado {
  id: number;
  estado: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  estados: Estado[];
  idMateria: number;
}

const ModificarEstado = ({ isOpen, onClose, estados, idMateria }: Props) => {
  const [estado, setEstado] = useState<string>("Aprobado");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(estado)
    if (estados.length == 0) {
      const newEstado = {
        estado,
        idMateria,
      };
      try {
        const response = await axios.post(
          BACKEND_URL + "/api/pensum/estado",
          newEstado,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }else{
      const modEstado = {
        id: estados[0].id,
        estado
      }
      try {
        const response = await axios.patch(
          BACKEND_URL + "/api/pensum/estado",modEstado
        )
        console.log(response)
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
    onClose()
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-gray-800 w-full max-w-2xl mx-auto py-8 px-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
          Ajustar Estado
        </h1>

        <button
          className="absolute right-6 top-8 text-white hover:text-red-600"
          onClick={onClose}
        >
          <Close />
        </button>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tituloSeccion" className="block text-gray-300">
              Estado de la Materia
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Aprobado">Aprobado</option>
              <option value="En Curso">En Curso</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-full mx-auto w-full hover:bg-green-700"
          >
            Modificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModificarEstado;
