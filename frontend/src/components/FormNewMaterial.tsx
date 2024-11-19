import { BACKEND_URL } from "@/constant/backend";
import { token } from "@/constant/token";
import { Close } from "@mui/icons-material";
import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Loading from "./Loading";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  idSeccion: number;
}

const FormNewMaterial = ({ isOpen, onClose, idSeccion }: Props) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [materialType, setMaterialType] = useState("file");
  const [licencia, setlicencia] = useState("CC0");
  const [descripcionLicencia, setDescripcionLicencia] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setLink("");
    setMaterialType("file");
    setlicencia("CC0");
    setDescripcionLicencia("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (materialType === "file" && file) {
      // Enviar FormData para archivo
      const formData = new FormData();
      const datos = {
        nombre: title,
        descripcion: description,
        idSeccion,
        licencia,
        descripcionLicencia,
      };
      formData.append("archivo", file);
      formData.append("metadata", JSON.stringify(datos));

      try {
        setLoading(true);
        const response = await axios.post(
          BACKEND_URL + "/api/materiales/material",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Aseguramos el tipo correcto
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("Archivo subido con éxito", response.data);
        resetForm()
        onClose();
      } catch (error) {
        console.error("Error al subir archivo:", error);
      } finally {
        setLoading(false);
      }
    } else if (materialType === "link") {
      // Enviar JSON para enlace
      const material = {
        url: link,
        nombre: title,
        descripcion: description,
        idSeccion,
        licencia,
        descripcionLicencia,
      };

      try {
        setLoading(true);
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
        resetForm();
        onClose();
      } catch (error) {
        console.error("Error al subir enlace:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  if (!isOpen) {
    return;
  }
  if (loading) {
    return <Loading text="Creando Material" />;
  }

  return (
    <div className="fixed bg-black bg-opacity-20 inset-0 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 w-full max-w-2xl mx-auto py-8 px-6 rounded-xl">
        <button
          className="absolute right-6 top-8 text-white hover:text-red-600"
          onClick={onClose}
        >
          <Close />
        </button>
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
          <div>
            <label className="block text-gray-300">Licencia</label>
            <select
              className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
              value={licencia}
              onChange={(e) => setlicencia(e.target.value)}
            >
              <option value="CC0">CC0 (Dominio Público)</option>
              <option value="CC BY">CC BY (Reconocimiento)</option>
              <option value="CC BY-SA">
                CC BY-SA (Reconocimiento - Compartir Igual)
              </option>
              <option value="Personalizada">Personalizada</option>
            </select>
          </div>

          {licencia === "Personalizada" && (
            <div>
              <label className="block text-gray-300">
                Descripcion de la Licencia
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                value={descripcionLicencia}
                onChange={(e) => setDescripcionLicencia(e.target.value)}
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

export default FormNewMaterial;
