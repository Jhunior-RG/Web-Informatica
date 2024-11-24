"use client";
import { BACKEND_URL } from "@/constant/backend";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configura el worker (ajustado a la versión instalada)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Pdf({ url }: { url: string }) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(0); // Ancho dinámico
    const containerRef = useRef<HTMLDivElement>(null);

    // Función que se ejecuta cuando se carga el documento
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    // Ajusta el ancho del PDF al tamaño del contenedor
    useEffect(() => {
        const resizeHandler = () => {
            if (containerRef.current) {
                setPageWidth(containerRef.current.offsetWidth); // Actualiza el ancho
            }
        };

        // Ajustar inicialmente y al cambiar el tamaño de la ventana
        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    const encodedUrl = encodeURI(url);
    const proxyUrl = BACKEND_URL + `/proxy?url=${encodeURIComponent(encodedUrl)}`;

    return (
        <div
            ref={containerRef}
            className="w-full flex justify-center items-center" // El contenedor ocupa todo el ancho
        >
            <Document file={proxyUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {/* Muestra solo la primera página, ajustada dinámicamente */}
                {numPages > 0 && (
                    <Page
                        pageNumber={1}
                        renderMode="svg"
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        width={pageWidth} // Ajusta el ancho según el contenedor
                    />
                )}
            </Document>
        </div>
    );
}

export default Pdf;
