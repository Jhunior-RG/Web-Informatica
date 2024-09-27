"use client";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const pensum = () => {
    return (
        <div className="container flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Plan de Estudios</h1>

            <DropDown title="Primer Semestre" />
            <DropDown title="Segundo Semestre" />
        </div>
    );
};

function DropDown({ title }) {
    const [openDropDown, setOpenDropDown] = useState(false);
    const [courses, setCourses] = useState([]);
    useEffect(() => {

        setCourses([
            { id: 1, name: "Algebra I" },
            { id: 2, name: "Introduccion a la Programacion" },
            { id: 3, name: "Ingles I" },
        ]);
    }, []);
    return (
        <div className="w-4/5 ">
            <button
                onClick={() => {
                    setOpenDropDown(!openDropDown);
                }}
                className="w-full bg-white rounded-xl my-1 py-3 px-4 shadow-md"
            >
                <div className=" flex justify-between">
                    <p>{title}</p>
                    {!openDropDown ? <ArrowDropDown /> : <ArrowDropUp />}
                </div>
            </button>

            {openDropDown && (
                <div className=" bg-white rounded-xl p-3 w-full">
                    {courses.map((course) => (
                        <p key={course.id}>{course.name}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default pensum;
