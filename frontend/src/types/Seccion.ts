import type { Material } from "./Material";

export interface Seccion{
    id: number;
    nombre: string;
    Materials: Material[];
}