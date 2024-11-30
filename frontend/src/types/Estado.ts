
export type EstadoKey = "Aprobado" | "En Curso" | "Pendiente";
export interface Estado {
    id: number;
    estado: EstadoKey;
    idMateria: string;
    idUsuario: string;
}