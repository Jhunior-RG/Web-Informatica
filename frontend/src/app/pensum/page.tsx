"use client";
import { BACKEND_URL } from "@/constant/backend";
import { token } from "@/constant/token";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  ArrowDropDown,
  ArrowDropUp,
  CheckCircle,
  HourglassEmpty,
  Cancel,
} from "@mui/icons-material";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import ModificarEstado from "@/components/ModificarEstado";

const Context = createContext<any>(null);

interface SemesterProps {
  title: string;
  progress: number; // Progreso del semestre
  courses: Materia[];
}

interface Estado {
  id: number;
  estado: string;
}

interface Materia {
  id: number;
  nombre: string;
  esElectiva: boolean;
  Estados: Estado[];
}

interface Semestre {
  nombre: string;
  Materia: Materia[];
}
const Pensum: React.FC = () => {
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [openModificarEstado, setOpenModificarEstado] =
    useState<boolean>(false);

  const [idMateria, setIdMateria] = useState(-1);
  const [estados, setEstados] = useState<Estado[]>([]);

  const calcularProgreso = (materias: Materia[]) => {
    let progreso = 0;
    for (const materia of materias) {
      if (
        materia.Estados.length != 0 &&
        materia.Estados[0].estado == "Aprobado"
      ) {
        progreso += 1;
      }
    }
    return progreso;
  };

  const getData = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/api/pensum", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setSemestres(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-5 space-y-6 w-full">
      <ModificarEstado
        isOpen={openModificarEstado}
        idMateria={idMateria}
        estados={estados}
        onClose={() => {
          setOpenModificarEstado(false);
          getData();
        }}
      />
      <h1 className="text-4xl font-bold text-white mb-5">
        Plan de Estudios por Semestre
      </h1>
      <Context.Provider
        value={{ setOpenModificarEstado, setEstados, setIdMateria }}
      >
        {semestres.map((semestre, index) => (
          <DropDown
            key={index}
            title={semestre.nombre}
            courses={semestre.Materia}
            progress={calcularProgreso(semestre.Materia)}
          />
        ))}
      </Context.Provider>
    </div>
  );
};

function DropDown({ title, courses, progress }: SemesterProps) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const total = title == "Electivas" ? 6 : courses.length;
  return (
    <div className="w-full max-w-lg transition-all duration-300">
      <button
        onClick={() => setOpenDropDown(!openDropDown)}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg my-1 py-3 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold ">{title}</p>
            <div className="relative w-32 h-2 bg-gray-300 rounded-full mt-2">
              <div
                className="absolute top-0 h-2 rounded-full bg-green-400"
                style={{ width: `${(progress * 100) / total}%` }}
              ></div>
            </div>
          </div>
          {!openDropDown ? <ArrowDropDown /> : <ArrowDropUp />}
        </div>
      </button>
      {openDropDown && (
        <div className="bg-gray-700 rounded-lg p-4 shadow-md transition-all duration-300">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Materia }) {
  const { setOpenModificarEstado, setEstados, setIdMateria } = useEstado();
  const estado =
    course.Estados.length == 0 ? "Pendiente" : course.Estados[0].estado;
  // Usamos la interfaz CourseProps
  const statusColors = {
    Aprobado: "text-green-600",
    "En Curso": "text-yellow-600",
    Pendiente: "text-red-600",
  };

  const statusIcons = {
    Aprobado: <CheckCircle className="text-green-600" />,
    "En Curso": <HourglassEmpty className="text-yellow-600" />,
    Pendiente: <Cancel className="text-red-600" />,
  };

  return (
    <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-3">
        {statusIcons[estado]}
        <div>
          <p className="font-semibold text-gray-200">{course.nombre}</p>
          <p className={`text-sm font-medium ${statusColors[estado]}`}>
            {estado}
          </p>
        </div>
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-400 text-white p-2 rounded-full hover:animate-spin"
        onClick={() => {
          setOpenModificarEstado(true);
          setEstados(course.Estados);
          setIdMateria(course.id)
        }}
      >
        <SettingsIcon className="text-white transition-transform" />
      </button>
    </div>
  );
}

export default Pensum;

export const useEstado = () => useContext(Context);
