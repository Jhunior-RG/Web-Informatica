import { BACKEND_URL } from "@/constant/backend";
import { token } from "@/constant/token";
import type { EstadoKey } from "@/types/Estado";
import type { Materia } from "@/types/Materia";
import {
    Cancel,
    CheckCircle,
    Close,
    Done,
    HourglassEmpty,
} from "@mui/icons-material";

export default function CourseCard({
    course,
    getData,
}: {
    course: Materia;
    getData: () => void;
}) {
    const statusColors: Record<EstadoKey, string> = {
        Aprobado: "text-green-600",
        "En Curso": "text-yellow-600",
        Pendiente: "text-red-600",
    };

    const statusIcons = {
        Aprobado: <CheckCircle className="text-green-600" />,
        "En Curso": <HourglassEmpty className="text-yellow-600" />,
        Pendiente: <Cancel className="text-red-600" />,
    };

    const modificarEstado = async (idMateria: number, estado: EstadoKey) => {
        try {
            const response = await fetch(BACKEND_URL + "/api/pensum/estado", {
                method: "PUT",
                body: JSON.stringify({ idMateria, estado }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                getData();
            }
        } catch (e) {
            console.error("error al modificar el estado:", e);
        }
    };
    let estado: EstadoKey = "Pendiente";
    if (course.Estados.length > 0) {
        estado = course.Estados[0].estado;
    }

    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
                {statusIcons[estado]}
                <div>
                    <p className="font-semibold text-gray-200">
                        {course.nombre}
                    </p>

                    <p
                        className={`text-sm font-medium ${statusColors[estado]}`}
                    >
                        {estado}
                    </p>
                </div>
            </div>
            <div className="flex gap-1">
                <button
                    className="bg-green-600 p-1 rounded-full text-white hover:animate-spin"
                    onClick={() => {
                        modificarEstado(course.id, "Aprobado");
                    }}
                >
                    <Done />
                </button>
                <button
                    className="bg-yellow-500 text-white p-1 rounded-full hover:animate-spin"
                    onClick={() => {
                        modificarEstado(course.id, "En Curso");
                    }}
                >
                    <HourglassEmpty />
                </button>
                <button
                    className="bg-red-500 text-white p-1 rounded-full hover:animate-spin"
                    onClick={() => {
                        modificarEstado(course.id, "Pendiente");
                    }}
                >
                    <Close />
                </button>
            </div>
        </div>
    );
}
