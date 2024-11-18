"use client";

import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {useRouter} from 'next/navigation'
import { BACKEND_URL } from "@/constant/backend";


const AgregarMaterial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [materialType, setMaterialType] = useState("file");
  const [seccion, setSeccion] = useState<number | null>(null);
  const router = useRouter() 


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const seccionId = sessionStorage.getItem("seccionId");
    const idSeccion: number | null =
      seccionId !== null ? parseInt(seccionId, 10) : null;
    setSeccion(idSeccion)
  }, [])
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    

    if (materialType === "file" && file) {
      // Enviar FormData para archivo
      const formData = new FormData();
      const datos = {
        nombre: title,
        descripcion: description,
        idSeccion: seccion,
      }
      formData.append("archivo", file);
      formData.append("metadata", JSON.stringify(datos));

      try {
        const response = await axios.post(
          BACKEND_URL + "/api/materiales/material",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Aseguramos el tipo correcto
            },
          }
        );

        console.log("Archivo subido con éxito", response.data);
        router.back();
      } catch (error) {
        console.error("Error al subir archivo:", error);
      }
    } else if (materialType === "link") {
      // Enviar JSON para enlace
      const material = {
        url: link,
        nombre: title,
        descripcion: description,
        idSeccion: seccion,
      };

      try {
        const response = await axios.post(
          BACKEND_URL + "/api/materiales/link",
          material,
          {
            headers: {
              "Content-Type": "application/json", // Aseguramos que es JSON
            },
          }
        );

        console.log("Enlace subido con éxito", response.data);
        router.back()
      } catch (error) {
        console.error("Error al subir enlace:", error);
      }
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 w-full max-w-2xl mx-auto py-8 px-6 rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
          Agregar Nuevo Material
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300">Título del Material</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">
              Descripción del Material
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Selector de tipo de material */}
          <div>
            <label className="block text-gray-300">Tipo de Material</label>
            <select
              className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="file">Subir Archivo</option>
              <option value="link">Ingresar Enlace</option>
            </select>
          </div>

          {/* Subida de archivo si se selecciona "file" */}
          {materialType === "file" && (
            <div>
              <label className="block text-gray-300">Subir Archivo</label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Ingreso de enlace si se selecciona "link" */}
          {materialType === "link" && (
            <div>
              <label className="block text-gray-300">Enlace del Material</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-full mx-auto w-full hover:bg-green-700"
          >
            Subir Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarMaterial;
