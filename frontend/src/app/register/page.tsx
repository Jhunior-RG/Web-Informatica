"use client";
import React from "react";
import { PersonOutline, LockOutlined, EmailOutlined } from "@mui/icons-material";
import Link from "next/link";


export default function Login() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
            {/* Logo y encabezado */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-indigo-500 mb-2">
                    Ingeniería Informática
                </h1>
                <p className="text-gray-400">
                    Crea tu cuenta ahora
                </p>
            </div>

            {/* Formulario de autenticación */}
            <form className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                {/* Campo de correo electrónico */}
                <div className="relative">
                    <EmailOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                    />
                </div>

                {/* Campo de contraseña */}
                <div className="relative">
                    <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                    />
                </div>

                {/* Campo adicional para nombre en el registro */}
                
                    <div className="relative">
                        <PersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                        />
                    </div>
                

                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                     Registrarse
                </button>
            </form>

            {/* Cambiar entre Iniciar sesión y Registro */}
            <div className="text-gray-500 mt-6">
                
                    <p>
                        ¿Ya tienes cuenta?{" "}
                        <Link href='/login'
                            className="text-indigo-500 font-semibold cursor-pointer hover:underline"
                        >
                            Inicia sesión
                        </Link>
                    </p>
            </div>

        </div>
    );
}
