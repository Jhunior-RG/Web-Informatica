"use client";

import Link from "next/link";
import { Add } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import introduccionImg from "../../../../public/introduccion.png";
import type { SvgIconProps } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TypingEffect from "@/components/TypingEffect";
import {useRouter} from 'next/navigation'
import { BACKEND_URL } from "@/constant/backend";

const MaterialPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, setData] = useState([]);
  const [materia, setMateria] = useState([]);
  const router = useRouter()

  const manejarClic = (id: number) => {
    console.log(id)
    sessionStorage.setItem("seccionId",id.toString())
    router.push("/material/agregar_material")
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BACKEND_URL + `/api/materiales/materia/${id}/seccion`
        );
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const datosMateria = async () => {
      try {
        const datos = await axios.get(
          BACKEND_URL+`/api/materias/${id}`
        );
        setMateria(datos.data);
        console.log(datos.data)
      } catch (err) {
        console.error(err);
      }
    };
    sessionStorage.setItem("idMateria", id.toString());
    console.log("el id del sesion es:", id);
    datosMateria();
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data actualizada:", data);
  }, [data]);
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-3 space-y-12">
      {/* Imagen de fondo y título */}
      <div
        style={{
          backgroundImage: `url(${materia.urlImagen})`,
        }}
        className="bg-cover bg-center h-56 rounded-2xl relative shadow-lg"
      >
        <div className="absolute inset-0 bg-black rounded-2xl bg-opacity-40 flex items-center justify-center">
          <TypingEffect
            text={materia.nombre}
            className=" text-white text-center text-3xl sm:text-4xl"
          />
        </div>
      </div>

      <div className="space-y-10">
        {/* Botón para agregar nuevo material */}
        <div className="flex justify-end">
          <Link
            href="/material/agregar_seccion"
            passHref
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full flex items-center space-x-2"
          >
            <Add />
            <span>Agregar Seccion</span>
          </Link>
        </div>

        <div className="space-y-8">
          {data.length > 0 ? (
            data.map((section) => (
              <div
                key={section.id}
                className="bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-blue-400 text-center mb-2">
                  {section.nombre}
                </h2>{" "}
                {section.Materials.length > 0 ? (
                  <ul className="space-y-4">
                    {section.Materials.map((material) => (
                      <li key={material.id} className="space-y-1">
                        <Link
                          href={material.url}
                          target="_blank"
                          className="flex items-center justify-center space-x-2 bg-indigo-700 text-white px-5 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:bg-indigo-500  w-full text-base"
                        >
                          <DownloadIcon className="mr-2" />
                          {material.nombre}
                        </Link>

                        <p className="text-gray-400 text-sm text-center">
                          {material.descripcion}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm text-center">
                    No hay materiales disponibles para esta sección.
                  </p>
                )}
                <div className="flex justify-center mt-2">
                  <button
                    className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                      manejarClic(section.id);
                    }}
                  >
                    <Add />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Aun no hay materiales para esta Materia :(
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface Material {
  text: string;
  icon: React.ElementType<SvgIconProps>;
  href: string;
  color?: "red" | "green" | "indigo";
  materialDescription: string;
}

interface MaterialSectionProps {
  title: string;
  materials: Material[];
}

const MaterialSection: React.FC<MaterialSectionProps> = ({
  title,
  materials,
}) => (
  <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
    <h2 className="text-xl font-semibold text-blue-400 text-center mb-2">
      {title}
    </h2>

    <div className="space-y-4">
      {materials.map((material, index) => (
        <div key={index} className="space-y-1">
          <ButtonMaterial
            text={material.text}
            Icon={material.icon}
            href={material.href}
            color={material.color || "indigo"}
          />
          <p className="text-gray-400 text-sm">
            {material.materialDescription}
          </p>
        </div>
      ))}
    </div>
  </div>
);
interface ButtonMaterialProps {
  text: string;
  Icon: React.ElementType<SvgIconProps>;
  href: string;
  color?: "red" | "green" | "indigo";
}
const ButtonMaterial: React.FC<ButtonMaterialProps> = ({
  text,
  Icon,
  href,
  color = "indigo",
}) => {
  const bgColor =
    color === "red"
      ? "bg-red-600 hover:bg-red-700"
      : color === "green"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-indigo-700 hover:bg-indigo-500";

  return (
    <Link
      href={href}
      className={`flex items-center justify-center space-x-2 ${bgColor} text-white px-5 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-600 w-full text-base`}
    >
      <Icon className="mr-2" />
      {text}
    </Link>
  );
};

export default MaterialPage;
