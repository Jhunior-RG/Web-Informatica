
import Link from "next/link";
import { YouTube, Download } from "@mui/icons-material";
import introduccionImg from "../../../public/introduccion.png";

const MaterialPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-3 space-y-6 ">
            <div
                style={{
                    backgroundImage: `url(${introduccionImg.src})`,
                }}
                className="bg-cover rounded-lg bg-opacity-90 h-56 bg-center content-center bg-slate-950" 
            >
                <h1 className="text-4xl font-bold text-white capitalize text-center">
                    Introduccion a la Programación
                </h1>
            </div>
            <div className="space-y-8 ">
                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Primer Parcial
                    </h2>
                    <div className="space-y-4 grid justify-items-center">
                        <ButtonMaterial
                            text="Exámenes Pasados PDF (Descargar)"
                            Icon={Download}
                            href="/examenes/primer-parcial-examen.pdf"
                        />
                        <ButtonMaterial
                            text="Solucionario PDF (Descargar)"
                            Icon={Download}
                            href="/examenes/primer-parcial-solucion.pdf"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Segundo Parcial
                    </h2>
                    <div className="space-y-4 grid justify-items-center">
                        <ButtonMaterial
                            text="Examen PDF (Descargar)"
                            Icon={Download}
                            href="/examenes/segundo-parcial-examen.pdf"
                        />
                        <ButtonMaterial
                            text="Solución PDF (Descargar)"
                            Icon={Download}
                            href="/examenes/segundo-parcial-solucion.pdf"
                        />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Clases Virtuales
                    </h2>
                    <div className="space-y-4 grid justify-items-center">
                        <ButtonMaterial
                            text="Introducción (YouTube)"
                            Icon={YouTube}
                            href="https://www.youtube.com/link-to-class"
                            color="red"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Prácticas
                    </h2>
                    <div className="space-y-4 grid justify-items-center">
                        <ButtonMaterial
                            text="Prácticas de clase (Descargar)"
                            Icon={Download}
                            href="https://drive.google.com/link-to-class"
                            color="green"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ButtonMaterial = ({ text, Icon, href, color = "indigo" }) => {
    const bgColor =
        color === "red"
            ? "bg-red-600 hover:bg-red-700"
            : color === "green"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-indigo-700 hover:bg-indigo-500";

    return (
        <Link
            href={href}
            className={`flex items-center justify-center space-x-2 ${bgColor} text-white px-3 py-2 rounded-full font-semibold transition-colors w-full text-sm`}
        >
            <Icon className="mr-2" />
            {text}
        </Link>
    );
};

export default MaterialPage;
