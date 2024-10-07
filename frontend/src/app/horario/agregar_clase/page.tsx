'use client';

import { useState } from "react";

// Formulario para agregar una clase
const AddClassForm =() => {
    const [formData, setFormData] = useState({
        course: "",
        teacher: "",
        location: "",
        startTime: "",
        endTime: "",
        day: "Lunes",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData); // Puedes manejar el envío aquí
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-sm md:max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                    Agregar Nueva Clase
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Curso</label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            placeholder="Nombre del curso"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Profesor</label>
                        <input
                            type="text"
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            placeholder="Nombre del profesor"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Ubicación</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            placeholder="Ubicación"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-300">
                                Hora de Inicio
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-300">
                                Hora de Fin
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300">Día</label>
                        <select
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                        >
                            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClassForm;
