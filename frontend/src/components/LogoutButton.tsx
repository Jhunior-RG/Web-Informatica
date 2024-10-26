"use client"; // Componente del lado del cliente

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid"; // Cambiado a un ícono de logout más estándar

const LogoutButton = ({ recargar }: { recargar: () => void }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    recargar();
    console.log("exito");
  };

  return (
    <button
      onClick={handleLogout}
      className="  bg-indigo-600 text-white rounded-lg py-2 px-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-sm sm:text-base flex gap-2"
    >
      <ArrowLeftOnRectangleIcon className="w-5 h-5" />
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
