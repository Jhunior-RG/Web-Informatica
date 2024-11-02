import { motion } from "framer-motion";
export interface TargetClass {
    idGrupo: string;
    grupo: string;
    materia: string;
    docente: string;
    lugar: string;
    horaInicio: string;
    horaFin: string;
    length: number;
}

interface TargetClassProps {
    clase: TargetClass;
    removeGroup?: (idGrupo: string) => void;
    minimal?: boolean;
}

export const TargetClass: React.FC<TargetClassProps> = ({
    clase,
    removeGroup,
    minimal,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="w-full h-full justify-items-center shadow-lg hover:shadow-xl transition-shadow text-gray-700 text-sm flex flex-col justify-center items-center font-medium"
        >
            {minimal ? (
                <p className="text-xs text-indigo-700 font-bold">{clase.materia}</p>
            ) : (
                <>
                    <div className=" flex justify-between items-center w-full text-indigo-700 font-bold">
                        <div className="flex justify-around w-full">
                            <p>{clase.materia}</p>
                            <p>{clase.grupo}</p>
                        </div>
                        {removeGroup && (
                            <button
                                onClick={() => removeGroup(clase.idGrupo)}
                                className="rounded-full w-4 h-4 flex items-center justify-center"
                            >
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center gap-4">
                        <p>
                            <span className="font-semibold">Docente:</span>{" "}
                            {clase.docente}
                        </p>
                        <p>
                            <span className="font-semibold">Lugar:</span>{" "}
                            {clase.lugar}
                        </p>
                    </div>
                    <div className="flex justify-center gap-5 items-center">
                        <p>{clase.horaInicio}</p>
                        <span> — </span>
                        <p>{clase.horaFin}</p>
                    </div>
                </>
            )}
        </motion.div>
    );
};
export default TargetClass;
