"use client";
import { Add } from "@mui/icons-material";
//import type { SvgIconProps } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import TypingEffect from "@/components/TypingEffect";
import { BACKEND_URL } from "@/constant/backend";
import type { Materia } from "@/types/Materia";
import type { Seccion } from "@/types/Seccion";
import { token } from "@/constant/token";
import Loading from "@/components/Loading";
import FormNewMaterial from "@/components/FormNewMaterial";
import FormSeccion from "@/components/FormSection";
import Material from "@/components/Material";
import { useSession } from "@/hooks/useSession";

const MaterialPage = ({ params }: { params: { id: string } }) => {
    const { user } = useSession();
    const { id } = params;
    const [seccion, setSeccion] = useState<Seccion[]>([]);
    const [materia, setMateria] = useState<Materia | null>(null);
    const [sectionSelected, setSeccionSelected] = useState<number>(-1);
    const [openFormSeccion, setOpenFormSeccion] = useState(false);
    const [openFormMaterial, setOpenFormMaterial] = useState(false);

    const getProfile = async () => {
        const response = await fetch(BACKEND_URL + "/api/perfil", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/materiales/materia/${id}/seccion`
            );
            console.log(response);
            setSeccion(response.data);
        } catch (err) {
            console.error(err);
        }
        console.log(`el id de la pagina es: ${id}`);
    },[id])
    const datosMateria = useCallback(async () => {
        try {
            const datos = await axios.get(`${BACKEND_URL}/api/materias/${id}`);
            setMateria(datos.data);
        } catch (err) {
            console.error(err);
        }
    },[id]);
    useEffect(() => {
        datosMateria();
        fetchData();
        getProfile();
    }, [datosMateria, fetchData]);

    const deleteMaterial = async (idMaterial: number) => {
        try {
            const response = await fetch(
                BACKEND_URL + "/api/materiales/" + idMaterial,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                fetchData();
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (!materia) {
        return <Loading text="Cargando Materiales" />;
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-3 ">
            <FormNewMaterial
                idSeccion={sectionSelected}
                isOpen={openFormMaterial}
                onClose={() => {
                    setOpenFormMaterial(false);
                    fetchData();
                }}
            />
            <FormSeccion
                isVisble={openFormSeccion}
                idMateria={id}
                onClose={() => {
                    setOpenFormSeccion(false);
                    fetchData();
                }}
            />
            {/* Imagen de fondo y título */}
            <div
                style={{
                    backgroundImage: `url(${
                        materia.urlImagen
                            ? materia.urlImagen
                            : "https://st2.depositphotos.com/2289871/12276/i/450/depositphotos_122768864-stock-photo-cute-tabby-kittens-sleeping-and.jpg"
                    })`,
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
                {token && (
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpenFormSeccion(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full flex items-center space-x-2 mt-12"
                        >
                            <Add />
                            <span>Agregar Seccion</span>
                        </button>
                    </div>
                )}

                <div className="space-y-8">
                    {seccion.length > 0 ? (
                        seccion.map((section) => (
                            <div
                                key={section.id}
                                className="bg-gray-800 rounded-2xl shadow-lg p-6"
                            >
                                <h2 className="text-xl font-semibold text-blue-400 text-center mb-2">
                                    {section.nombre}
                                </h2>{" "}
                                {section.Materials.length > 0 ? (
                                    <ul className="space-y-4">
                                        {section.Materials.map(
                                            (material, index) => (
                                                <Material
                                                    key={index}
                                                    material={material}
                                                    onDelete={deleteMaterial}
                                                    remove={
                                                        user &&
                                                        (user.id ==
                                                            material.idUsuario ||
                                                            user.rol == "admin")
                                                    }
                                                />
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 text-sm text-center">
                                        No hay materiales disponibles para esta
                                        sección.
                                    </p>
                                )}
                                {token && (
                                    <div className="flex justify-center mt-2">
                                        <button
                                            className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            onClick={() => {
                                                setOpenFormMaterial(true);
                                                setSeccionSelected(section.id);
                                            }}
                                        >
                                            <Add />
                                        </button>
                                    </div>
                                )}
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
export default MaterialPage;
