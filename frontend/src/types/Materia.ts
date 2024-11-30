import type { Estado } from "./Estado";

export interface Materia {
    id: number;
    nombre: string;
    esElectiva: boolean;
    idSemestre: number;
    urlImagen: string;
    Estados: Estado[];

}