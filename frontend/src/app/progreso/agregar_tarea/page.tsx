'use client'
import React, { useState } from 'react';

const AddTaskForm = ({ closeForm }) => {
    const [formData, setFormData] = useState({
        course: "",
        section: "",
        taskName: "",
        maxGrade: 0,
        grade: 0,
        dueDate: "",
        description: "",
        status: "Pendiente", // Estado por defecto
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Aquí puedes manejar el envío de datos
        closeForm(); // Cierra el formulario después de enviar
    };

    // Listas de cursos y secciones (puedes modificarlas según tus necesidades)
    const courses = ["Introducción a la Programación", "Base de Datos I", "Programación Web", "Sistemas Operativos"];
    const sections = ["Primer Parcial", "Segundo Parcial", "Final", "Segunda Instancia"];
    const statuses = ["Pendiente", "En Curso", "Completado"];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 sm:p-8 w-full max-w-sm md:max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                    Agregar Nueva Tarea
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Curso</label>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                        >
                            <option value="">Selecciona un curso</option>
                            {courses.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-300">Sección</label>
                        <select
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                        >
                            <option value="">Selecciona una sección</option>
                            {sections.map((section) => (
                                <option key={section} value={section}>
                                    {section}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-300">Nombre de la Tarea</label>
                        <input
                            type="text"
                            name="taskName"
                            value={formData.taskName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            placeholder="Nombre de la tarea"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300">Fecha de Entrega</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                            placeholder="Descripción de la tarea"
                            rows="3"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-gray-300 transition-all"
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={closeForm}
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

export default AddTaskForm;
