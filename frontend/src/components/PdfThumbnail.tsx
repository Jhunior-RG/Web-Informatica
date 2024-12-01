"use client";
import { BACKEND_URL } from "@/constant/backend";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Pdf({ url }: { url: string }) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageWidth, setPageWidth] = useState<number>(0); 
    const containerRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    useEffect(() => {
        const resizeHandler = () => {
            if (containerRef.current) {
                setPageWidth(containerRef.current.offsetWidth); 
            }
        };

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    const encodedUrl = encodeURI(url);
    const proxyUrl = BACKEND_URL + `/api/proxy?url=${encodeURIComponent(encodedUrl)}`;

    return (
        <div
            ref={containerRef}
            className="w-full flex justify-center items-center" 
        >
            <Document file={proxyUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {numPages > 0 && (
                    <Page
                        pageNumber={1}
                        renderMode="svg"
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        width={pageWidth} 
                    />
                )}
            </Document>
        </div>
    );
}

export default Pdf;
