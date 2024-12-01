import Clase from "../models/clase.js";
import Grupo from "../models/grupo.js";
import Materia from "../models/materia.js";
import Semestre from "../models/semestre.js";
import Usuario_Grupo from "../models/usuario_grupo.js";
import Usuario from "../models/usuario.js";

const semestres = [
    { nombre: "1er Semestre" },
    { nombre: "2do Semestre" },
    { nombre: "3er Semestre" },
    { nombre: "4to Semestre" },
    { nombre: "5to Semestre" },
    { nombre: "6to Semestre" },
    { nombre: "7mo Semestre" },
    { nombre: "8vo Semestre" },
    { nombre: "9no Semestre" },
    { nombre: "Electivas" },
];

const materias = [
    { nombre: "Ingles I", esElectiva: false, idSemestre: 1 },
    { nombre: "Física General", esElectiva: false, idSemestre: 1 },
    { nombre: "Algebra I", esElectiva: false, idSemestre: 1 },
    { nombre: "Calculo I", esElectiva: false, idSemestre: 1 },
    {
        nombre: "Introducción a la Programación",
        esElectiva: false,
        idSemestre: 1,
    },
    { nombre: "Ingles II", esElectiva: false, idSemestre: 2 },
    { nombre: "Algebra II", esElectiva: false, idSemestre: 2 },
    { nombre: "Calculo II", esElectiva: false, idSemestre: 2 },
    {
        nombre: "Elementos de Programación y Estructura de Datos",
        esElectiva: false,
        idSemestre: 2,
    },
    {
        nombre: "Arquitectura de Computadoras I",
        esElectiva: false,
        idSemestre: 2,
    },
    { nombre: "Programación", esElectiva: false, idSemestre: 2 },
    { nombre: "Cálculo Numérico", esElectiva: false, idSemestre: 3 },
    { nombre: "Lógica", esElectiva: false, idSemestre: 3 },
    {
        nombre: "Arquitectura de Computadoras II",
        esElectiva: false,
        idSemestre: 3,
    },
    { nombre: "Teoria de Grafos", esElectiva: false, idSemestre: 3 },
    { nombre: "Organización y Métodos", esElectiva: false, idSemestre: 3 },
    {
        nombre: "Metodos y Tecnicas de Programación",
        esElectiva: false,
        idSemestre: 3,
    },

    { nombre: "Probabilidad y Estádistica", esElectiva: false, idSemestre: 4 },
    {
        nombre: "Taller de Programación en Bajo Nivel",
        esElectiva: false,
        idSemestre: 4,
    },
    { nombre: "Base de Datos I", esElectiva: false, idSemestre: 4 },
    { nombre: "Sistemas de Información I", esElectiva: false, idSemestre: 4 },
    { nombre: "Programación Funcional", esElectiva: false, idSemestre: 4 },
    { nombre: "Algoritmos Avanzados", esElectiva: false, idSemestre: 4 },
    { nombre: "Base de Datos II", esElectiva: false, idSemestre: 5 },
    {
        nombre: "Taller de Sistemas Operativos",
        esElectiva: false,
        idSemestre: 5,
    },
    { nombre: "Sistemas de Información II", esElectiva: false, idSemestre: 5 },
    {
        nombre: "Teoría de Automatas y Lenguajes Formales",
        esElectiva: false,
        idSemestre: 5,
    },
    { nombre: "Graficación por Computadora", esElectiva: false, idSemestre: 5 },
    { nombre: "Inteligencia Artifical I", esElectiva: false, idSemestre: 5 },
    { nombre: "Ingeneria de Software", esElectiva: false, idSemestre: 6 },
    { nombre: "Redes de Computadoras", esElectiva: false, idSemestre: 6 },
    {
        nombre: "Estructura y Semantica de Lenguajes de Programación",
        esElectiva: false,
        idSemestre: 6,
    },
    { nombre: "Taller de Base de Datos", esElectiva: false, idSemestre: 6 },
    { nombre: "Inteligencia Artificial II", esElectiva: false, idSemestre: 6 },
    { nombre: "Programación Web", esElectiva: false, idSemestre: 6 },
    {
        nombre: "Taller de Ingeneria de Software",
        esElectiva: false,
        idSemestre: 7,
    },
    { nombre: "Arquitectura de Software", esElectiva: false, idSemestre: 7 },
    {
        nombre: "Interacción Humano Computador",
        esElectiva: false,
        idSemestre: 7,
    },
    {
        nombre: "Tegnologias de Redes Avanzadas",
        esElectiva: false,
        idSemestre: 7,
    },
    { nombre: "Taller de Grado I", esElectiva: false, idSemestre: 8 },
    {
        nombre: "Evaluación y Auditoria de Sistemas",
        esElectiva: false,
        idSemestre: 8,
    },
    { nombre: "Taller de Grado II", esElectiva: false, idSemestre: 9 },
    { nombre: "Telefonia IP", esElectiva: true, idSemestre: 10 },
    { nombre: "Simulación de Sistemas", esElectiva: true, idSemestre: 10 },
    { nombre: "Generación de Software", esElectiva: true, idSemestre: 10 },
    { nombre: "Procesos Agiles", esElectiva: true, idSemestre: 10 },
    { nombre: "Web Semánticas", esElectiva: true, idSemestre: 10 },
    { nombre: "Robótica", esElectiva: true, idSemestre: 10 },
    { nombre: "Programación Movil", esElectiva: true, idSemestre: 10 },
    { nombre: "Seguridad de Sistemas", esElectiva: true, idSemestre: 10 },
    {
        nombre: "Business Inteligence y Big Data",
        esElectiva: true,
        idSemestre: 10,
    },
];

const grupos = [
    {
        nombre: "Grupo 1",
        docente: "Cespedes Guizada Maria Benita",
        idMateria: 1,
    },
    {
        nombre: "Grupo 2",
        docente: "Cespedes Guizada Maria Benita",
        idMateria: 1,
    },
    { nombre: "Grupo 3", docente: "Peeters Ilona Magda Lena", idMateria: 1 },
    {
        nombre: "Grupo 4",
        docente: "Grillo Salvatierra Maria Estela",
        idMateria: 1,
    },
    {
        nombre: "Grupo 5",
        docente: "Cespedes Guizada Maria Benita",
        idMateria: 1,
    },
    { nombre: "Grupo B", docente: "Valenzuela Miranda Roberto", idMateria: 2 },
    { nombre: "Grupo B1", docente: "Moreira Calizaya Rene", idMateria: 2 },
    { nombre: "Grupo B2", docente: "Ruiz Ucumari Ivan", idMateria: 2 },
    {
        nombre: "Grupo B3",
        docente: "Ordoñes Salvatierra Miguel Angel",
        idMateria: 2,
    },
    { nombre: "Grupo B4", docente: "Ruiz Ucumari Ivan", idMateria: 2 },
    {
        nombre: "Grupo B5",
        docente: "Terrazas Vargas Juan Carlos",
        idMateria: 2,
    },
    {
        nombre: "Grupo B6",
        docente: "Terrazas Vargas Juan CArlos",
        idMateria: 2,
    },
    {
        nombre: "Grupo 10",
        docente: "Rogriquez Sejas Juan Antonio",
        idMateria: 3,
    },
    {
        nombre: "Grupo 15",
        docente: "Carrasco Calvo Alvaro Hernando",
        idMateria: 3,
    },
    { nombre: "Grupo 8", docente: "Leon Romero Gualberto", idMateria: 3 },
    { nombre: "Grupo 10", docente: "Por Designar", idMateria: 4 },
    { nombre: "Grupo 11", docente: "Rojas Zurita Ramiro", idMateria: 4 },
    { nombre: "Grupo 1", docente: "Salazar Serrudo Carla", idMateria: 5 },
    {
        nombre: "Grupo 10",
        docente: "Cosrtas Jauregui Vladimir Abel",
        idMateria: 5,
    },
    { nombre: "Grupo 2", docente: "Blanco Coca Leticia", idMateria: 5 },
    { nombre: "Grupo 3", docente: "Ustariz Vargas Hernan", idMateria: 5 },
    {
        nombre: "Grupo 4",
        docente: "Villarroel Tapia Henry Frank",
        idMateria: 5,
    },
    { nombre: "Grupo 5", docente: "Montaño Quiroga Victor Hugo", idMateria: 5 },
    { nombre: "Grupo 6", docente: "Salazar Serrudo Carla", idMateria: 5 },
    {
        nombre: "Grupo 7",
        docente: "Antezana Serrano Dilan Alejandro",
        idMateria: 5,
    },
    { nombre: "Grupo 1", docente: "Peeters Ilonaa Magda Lena", idMateria: 6 },
    { nombre: "Grupo 2", docente: "Peeters Ilonaa Magda Lena", idMateria: 6 },
    { nombre: "Grupo 3", docente: "Peeters Ilonaa Magda Lena", idMateria: 6 },
    {
        nombre: "Grupo 5A",
        docente: "Salinas Pericon Walter Oscar",
        idMateria: 7,
    },
    { nombre: "Grupo 6", docente: "Silva Ramos Hernan Victor", idMateria: 7 },
    { nombre: "Grupo 8", docente: "Omonte Ojalvo Jose Roberto", idMateria: 7 },
    {
        nombre: "Grupo 12",
        docente: "Martinez Maida Amilcar Saul",
        idMateria: 8,
    },
    { nombre: "Grupo 6", docente: "Terrazas Lobo Juan", idMateria: 8 },
    { nombre: "Grupo 1", docente: "Torrico Bascope Rosemary", idMateria: 9 },
    { nombre: "Grupo 2", docente: "Blanco Coca Leticia", idMateria: 9 },
    { nombre: "Grupo 3", docente: "Blanco Coca Leticia", idMateria: 9 },
    { nombre: "Grupo 4", docente: "Por Designar", idMateria: 9 },
    { nombre: "Grupo 1", docente: "Acha Perez Samuel", idMateria: 10 },
    { nombre: "Grupo 2", docente: "Blanco Coca Leticia", idMateria: 10 },
    { nombre: "Grupo 1", docente: "Torrico Bascope Rosemary", idMateria: 11 },
    { nombre: "Grupo 2", docente: "Juchani Bazualdo Demetrio", idMateria: 12 },
    { nombre: "Grupo 3", docente: "Zabalaga Montaño Oscar A.", idMateria: 12 },
    { nombre: "Grupo 1", docente: "Hoepfner Reynolds Mauricio", idMateria: 13 },
    {
        nombre: "Grupo 1",
        docente: "Agreda Corrales Luis Roberto",
        idMateria: 14,
    },
    {
        nombre: "Grupo 1",
        docente: "Montoya Burgos Yony Richard",
        idMateria: 15,
    },
    {
        nombre: "Grupo 1",
        docente: "Camacho Del Castillo Indira",
        idMateria: 16,
    },
    { nombre: "Grupo 1", docente: "Flores Villarroel Corina", idMateria: 17 },
    { nombre: "Grupo 2", docente: "Manzur Soria Carlos B.", idMateria: 17 },
    {
        nombre: "Grupo 5",
        docente: "Montoya Burgos Yony Richard",
        idMateria: 17,
    },
    {
        nombre: "Grupo 3",
        docente: "Delgadillo Cossio Daid Alfredo",
        idMateria: 18,
    },
    {
        nombre: "Grupo 4",
        docente: "Delgadillo Cossio David Alfredo",
        idMateria: 18,
    },
    {
        nombre: "Grupo 1",
        docente: "Montecinos Choque Marco Antonio",
        idMateria: 19,
    },
    {
        nombre: "Grupo 1",
        docente: "Por Designar",
        idMateria: 20,
    },
    {
        nombre: "Grupo 2",
        docente: "Calancha Navia Boris",
        idMateria: 20,
    },
    {
        nombre: "Grupo 1",
        docente: "Salazar Serrudo Carla",
        idMateria: 21,
    },
    {
        nombre: "Grupo 2",
        docente: "Salazar Serrudo Carla",
        idMateria: 21,
    },
    {
        nombre: "Grupo 1",
        docente: "Aparicio Yuja Tatiana",
        idMateria: 22,
    },
    { nombre: "Grupo 1", docente: "Leticia Blanco Coca", idMateria: 23 },
    { nombre: "Grupo 1", docente: "Aparicio Yuja Tatiana", idMateria: 24 },
    { nombre: "Grupo 2", docente: "Aparicio Yuja Tatiana", idMateria: 24 },
    {
        nombre: "Grupo 1",
        docente: "Orellana Araoz Jorge Walter",
        idMateria: 25,
    },
    {
        nombre: "Grupo 2",
        docente: "Orellana Araoz Jorge Walter",
        idMateria: 26,
    },

    { nombre: "Grupo 1", docente: "Flores Soliz Juan Marcelo", idMateria: 26 },
    { nombre: "Grupo 2", docente: "Jaldin Rosales K. Rolando", idMateria: 26 },
    {
        nombre: "Grupo 1",
        docente: "Montaño Quiroga Victor Hugo",
        idMateria: 27,
    },
    {
        nombre: "Grupo 1",
        docente: "Graficación por Computadora",
        idMateria: 28,
    },
    { nombre: "Grupo 1", docente: "Garcia Perez Carmen Rosa", idMateria: 29 },
    {
        nombre: "Grupo 2",
        docente: "Rodriguez Bilbao Erika Patricia",
        idMateria: 29,
    },
    {
        nombre: "Grupo 1",
        docente: "Camacho del Castillo Indira",
        idMateria: 30,
    },
    { nombre: "Grupo 2", docente: "Torrico Bascope Rosemary", idMateria: 30 },
    {
        nombre: "Grupo 1",
        docente: "Orellana Araoz Jorge Walter",
        idMateria: 31,
    },
    {
        nombre: "Grupo 2",
        docente: "Orellana Araoz Jorge Walter",
        idMateria: 31,
    },
    {
        nombre: "Grupo 1",
        docente: "Romero Rogriguez Erika Patricia",
        idMateria: 32,
    },
    { nombre: "Grupo 1", docente: "Calancha Navia Boris", idMateria: 33 },
    { nombre: "Grupo 2", docente: "Calancha Navia Boris", idMateria: 33 },
    { nombre: "Grupo 3", docente: "Flores Soliz Juan Marcelo", idMateria: 33 },
    { nombre: "Grupo 4", docente: "Calancha Navia Boris", idMateria: 33 },
    { nombre: "Grupo 2", docente: "Garcia Perez Carmen Rosa", idMateria: 34 },
    {
        nombre: "Grupo 1",
        docente: "Costas Jauregui Vladimir Abel",
        idMateria: 35,
    },
    { nombre: "Grupo 1", docente: "Flores Villarroel Corina", idMateria: 36 },
    { nombre: "Grupo 2", docente: "Blanco Coca Leticia", idMateria: 36 },
    { nombre: "Grupo 1", docente: "Por Designar", idMateria: 37 },
    { nombre: "Grupo 1", docente: "Flores Villarroel Corina", idMateria: 38 },
    {
        nombre: "Grupo 1",
        docente: "Montecinos Choque Marco Antonio",
        idMateria: 39,
    },
    { nombre: "Grupo 6", docente: "Flores Villarroel Corina", idMateria: 40 },
    { nombre: "Grupo 7", docente: "Romero Rodriguez Patricia", idMateria: 40 },
    { nombre: "Grupo 1", docente: "Romero Rodriguez Patricia", idMateria: 41 },
    { nombre: "Grupo 2", docente: "Villaroel Novillo Jimmy", idMateria: 41 },
    {
        nombre: "Grupo 2",
        docente: "Montaño Quiroga Victor Hugo",
        idMateria: 42,
    },
    { nombre: "Grupo 3", docente: "Garcia Perez Carmen Rosa", idMateria: 42 },
    { nombre: "Grupo 4", docente: "Romero Rodriguez Patricia", idMateria: 42 },
    {
        nombre: "Grupo 1",
        docente: "Montoya Burgos Yony Richard",
        idMateria: 43,
    },
    {
        nombre: "Grupo 1",
        docente: "Villaroel Tapia Henry Frank",
        idMateria: 44,
    },
    {
        nombre: "Grupo 1",
        docente: "Costas Jaurequi Vladimir Abel",
        idMateria: 45,
    },
    { nombre: "Grupo 1", docente: "Por Designar", idMateria: 46 },
    {
        nombre: "Grupo 1",
        docente: "Rodriguez Bilbao Erika Patricia",
        idMateria: 47,
    },
    { nombre: "Grupo 1", docente: "Garcia Perez Carmen Rosa", idMateria: 48 },
    { nombre: "Grupo 1", docente: "Fiorilo Lozada Américo", idMateria: 49 },
    { nombre: "Grupo 1", docente: "Antezana Camacho Marcelo", idMateria: 50 },
    { nombre: "Grupo 1", docente: "Por Designar", idMateria: 51 },
];

const clases = [
    {
        dia: "Martes",
        lugar: "693B",
        horaInicio: "08:15:00",
        horaFin: "09:45:00",
        idGrupo: 1,
        // Docente: CESPEDES GUIZADA MARIA BENITA
    },
    {
        dia: "Viernes",
        lugar: "691D",
        horaInicio: "08:15:00",
        horaFin: "09:45:00",
        idGrupo: 1,
        // Docente: CESPEDES GUIZADA MARIA BENITA
    },
    {
        dia: "Martes",
        lugar: "690D",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 2,
        // Docente: CESPEDES GUIZADA MARIA BENITA
    },
    {
        dia: "Viernes",
        lugar: "690D",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 2,
        // Docente: CESPEDES GUIZADA MARIA BENITA
    },
    {
        dia: "Lunes",
        lugar: "691B",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 3,
        // Docente: PEETERS ILONAA MAGDA LENA
    },
    {
        dia: "Miércoles",
        lugar: "692H",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 3,
        // Docente: PEETERS ILONAA MAGDA LENA
    },
    {
        dia: "Martes",
        lugar: "692G",
        horaInicio: "15:45:00",
        horaFin: "17:15:00",
        idGrupo: 4,
        // Docente: GRILO SALVATIERRA MARIA ESTELA
    },
    {
        dia: "Viernes",
        lugar: "692E",
        horaInicio: "14:15:00",
        horaFin: "15:45:00",
        idGrupo: 4,
        // Docente: GRILO SALVATIERRA MARIA ESTELA
    },
    {
        dia: "Jueves",
        lugar: "692F",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 5,
        // Docente: CESPEDES GUIZADA MARIA BENITA
    },
    {
        dia: "Viernes",
        lugar: "691B",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 5,
        // Docente: CESPEDES GUIZADA MARIA BENITA
    },
    {
        dia: "Martes",
        lugar: "612",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 6,
        // Docente: VALENZUELA MIRANDA ROBERTO
    },
    {
        dia: "Miércoles",
        lugar: "692C",
        horaInicio: "14:15:00",
        horaFin: "15:45:00",
        idGrupo: 6,
        // Docente: VALENZUELA MIRANDA ROBERTO
    },
    {
        dia: "Jueves",
        lugar: "621",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 7,
        // Docente: MOREIRA CALIZAYA RENE
    },
    {
        dia: "Lunes",
        lugar: "620",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 8,
        // Docente: RUIZ UCUMARI IVAN
    },
    {
        dia: "Jueves",
        lugar: "620",
        horaInicio: "12:45:00",
        horaFin: "14:15:00",
        idGrupo: 9,
        // Docente: ORDONEZ SALVATIERRA MIGUEL ANGEL
    },
    {
        dia: "Martes",
        lugar: "621",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 10,
        // Docente: RUIZ UCUMARI IVAN
    },
    {
        dia: "Miércoles",
        lugar: "620",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 11,
        // Docente: TERRAZAS VARGAS JUAN CARLOS
    },
    {
        dia: "Jueves",
        lugar: "620",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 12,
        // Docente: TERRAZAS VARGAS JUAN CARLOS
    },
    {
        dia: "Martes",
        lugar: "661",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 13,
        // Docente: RODRIGUEZ SEJAS JUAN ANTONIO
    },
    {
        dia: "Miércoles",
        lugar: "692E",
        horaInicio: "08:15:00",
        horaFin: "09:45:00",
        idGrupo: 13,
        // Docente: RODRIGUEZ SEJAS JUAN ANTONIO
    },
    {
        dia: "Viernes",
        lugar: "692F",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 13,
        // Docente: RODRIGUEZ SEJAS JUAN ANTONIO
    },
    {
        dia: "Lunes",
        lugar: "642",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 14,
        // Docente: CARRASCO CALVO ALVARO HERNANDO
    },
    {
        dia: "Martes",
        lugar: "617",
        horaInicio: "15:45:00",
        horaFin: "17:15:00",
        idGrupo: 14,
        // Docente: CARRASCO CALVO ALVARO HERNANDO
    },
    {
        dia: "Miércoles",
        lugar: "607",
        horaInicio: "14:15:00",
        horaFin: "15:45:00",
        idGrupo: 14,
        // Docente: CARRASCO CALVO ALVARO HERNANDO
    },
    {
        dia: "Miércoles",
        lugar: "691C",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 15,
        // Docente: LEON ROMERO GUALBERTO
    },
    {
        dia: "Jueves",
        lugar: "625D",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 15,
        // Docente: ARANIBAR ZAMBRANA AMMY SHALEM
    },
    {
        dia: "Viernes",
        lugar: "607",
        horaInicio: "12:45:00",
        horaFin: "14:15:00",
        idGrupo: 15,
        // Docente: LEON ROMERO GUALBERTO
    },
    {
        dia: "Miércoles",
        lugar: "642",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 16,
        // Docente: POR DESIGNAR
    },
    {
        dia: "Viernes",
        lugar: "693A",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 16,
        // Docente: POR DESIGNAR
    },
    {
        dia: "Sábado",
        lugar: "617C",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 16,
        // Docente: POR DESIGNAR
    },
    {
        dia: "Lunes",
        lugar: "622",
        horaInicio: "06:45:00",
        horaFin: "08:15:00",
        idGrupo: 17,
        // Docente: ROJAS ZURITA RAMIRO
    },
    {
        dia: "Martes",
        lugar: "690B",
        horaInicio: "08:15:00",
        horaFin: "09:45:00",
        idGrupo: 17,
        // Docente: ROJAS ZURITA RAMIRO
    },
    {
        dia: "Jueves",
        lugar: "692E",
        horaInicio: "08:15:00",
        horaFin: "09:45:00",
        idGrupo: 17,
        // Docente: ROJAS ZURITA RAMIRO
    },
    {
        dia: "Jueves",
        lugar: "691A",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 18,
        // Docente: SALAZAR SERRUDO CARLA
    },
    {
        dia: "Viernes",
        lugar: "691E",
        horaInicio: "11:15:00",
        horaFin: "12:45:00",
        idGrupo: 18,
        // Docente: SALAZAR SERRUDO CARLA
    },
    {
        dia: "Viernes",
        lugar: "623",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 18,
        // Docente: ANTEZANA SERRANO DILAN ALEJANDRO
    },
    {
        dia: "Martes",
        lugar: "693D",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 19,
        // Docente: COSTAS JAUREGUI VLADIMIR ABEL
    },
    {
        dia: "Jueves",
        lugar: "691A",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 19,
        // Docente: COSTAS JAUREGUI VLADIMIR ABEL
    },
    {
        dia: "Jueves",
        lugar: "691B",
        horaInicio: "14:15:00",
        horaFin: "15:45:00",
        idGrupo: 19,
        // Docente: AUXILIAR POR DESIGNAR
    },
    {
        dia: "Martes",
        lugar: "617",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 20,
        // Docente: BLANCO COCA LETICIA
    },
    {
        dia: "Miércoles",
        lugar: "691B",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 20,
        // Docente: VELIZ ESCOBAR JOSUE DEMETRIO
    },
    {
        dia: "Jueves",
        lugar: "624",
        horaInicio: "15:45:00",
        horaFin: "17:15:00",
        idGrupo: 20,
        // Docente: BLANCO COCA LETICIA
    },
    {
        dia: "Lunes",
        lugar: "607",
        horaInicio: "12:45:00",
        horaFin: "14:15:00",
        idGrupo: 21,
        // Docente: USTARIZ VARGAS HERNAN
    },
    {
        dia: "Miércoles",
        lugar: "612",
        horaInicio: "12:45:00",
        horaFin: "14:15:00",
        idGrupo: 21,
        // Docente: USTARIZ VARGAS HERNAN
    },
    {
        dia: "Viernes",
        lugar: "624",
        horaInicio: "12:45:00",
        horaFin: "14:15:00",
        idGrupo: 21,
        // Docente: CACERES MEDRANO ALAN JESUS
    },
    {
        dia: "Martes",
        lugar: "623",
        horaInicio: "15:45:00",
        horaFin: "17:15:00",
        idGrupo: 22,
        // Docente: VILLARROEL TAPIA HENRY FRANK
    },
    {
        dia: "Miércoles",
        lugar: "693C",
        horaInicio: "15:45:00",
        horaFin: "17:15:00",
        idGrupo: 22,
        // Docente: VILLARROEL TAPIA HENRY FRANK
    },
    {
        dia: "Viernes",
        lugar: "691E",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 22,
        // Docente: SALAZAR CHOQUE JORGE
    },
    {
        dia: "Miércoles",
        lugar: "690B",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 23,
        // Docente: MONTANO QUIROGA VICTOR HUGO
    },
    {
        dia: "Jueves",
        lugar: "623",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 23,
        // Docente: MONTANO QUIROGA VICTOR HUGO
    },
    {
        dia: "Sábado",
        lugar: "691C",
        horaInicio: "09:45:00",
        horaFin: "11:15:00",
        idGrupo: 23,
        // Docente: ANTEZANA SERRANO DILAN ALEJANDRO
    },
    {
        dia: "Miércoles",
        lugar: "692D",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 24,
        // Docente: SALAZAR SERRUDO CARLA
    },
    {
        dia: "Jueves",
        lugar: "691E",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 24,
        // Docente: SALAZAR SERRUDO CARLA
    },
    {
        dia: "Sábado",
        lugar: "661",
        horaInicio: "08:15:00",
        horaFin: "09:45:00",
        idGrupo: 24,
        // Docente: ANTEZANA SERRANO DILAN ALEJANDRO
    },
    {
        dia: "Martes",
        lugar: "690C",
        horaInicio: "12:45:00",
        horaFin: "14:15:00",
        idGrupo: 25,
        // Docente: ANTEZANA SERRANO DILAN ALEJANDRO
    },
    {
        dia: "Miércoles",
        lugar: "692E",
        horaInicio: "15:45:00",
        horaFin: "17:15:00",
        idGrupo: 25,
        // Docente: . POR DESIGNAR
    },
    {
        dia: "Jueves",
        lugar: "693B",
        horaInicio: "17:15:00",
        horaFin: "18:45:00",
        idGrupo: 25,
        // Docente: . POR DESIGNAR
    },
];

export async function seed() {
    const semestreExists = await Semestre.findOne();
    if (semestreExists) {
        console.log("Seed ya ejecutado anteriormente.");
        return;
    }

    await Semestre.sync({ force: true });
    await Materia.sync({ force: true });
    await Grupo.sync({ force: true });
    await Clase.sync({ force: true });
    await Usuario_Grupo.sync({ force: true });

    await Semestre.bulkCreate(semestres);
    await Materia.bulkCreate(materias);
    await Grupo.bulkCreate(grupos);
    await Clase.bulkCreate(clases);

    console.log("Seed ejecutado exitosamente.");
}

export const createAdmin = async () => {
    const admin = await Usuario.findOne({ where: [{rol: "admin"}] });
    if (!admin) {
        await Usuario.create({
            nombre: "admin",
            email: "admin@admin.com",
            password: "admin",
            rol: "admin",
        });
        console.log("Administrador creado con éxito");
    }
};
