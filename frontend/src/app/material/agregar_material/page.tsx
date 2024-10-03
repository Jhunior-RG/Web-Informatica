'use client'
import { useState } from "react";

const AgregarMaterial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [materialType, setMaterialType] = useState("file"); // "file" o "link"

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario y el archivo o enlace al servidor
    if (materialType === "file") {
      console.log("Subiendo archivo:", file);
    } else {
      console.log("Enlace proporcionado:", link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
    <div className="bg-gray-800 w-full max-w-2xl mx-auto py-8 px-6 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">Agregar Nuevo Material</h1>
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
          <label className="block text-gray-300">Descripción del Material</label>
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
  
    </div>);
};

export default AgregarMaterial;
