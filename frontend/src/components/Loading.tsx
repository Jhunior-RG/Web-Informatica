import { CircularProgress } from "@mui/material";
import React from "react";

interface Props {
    text?: string;
}
const Loading = ({ text }: Props) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-50">
            <React.Fragment>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient
                            id="my_gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress
                    sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
                />
            </React.Fragment>
            {text && (
                <p className="text-white text-lg font-medium mt-2">{text}</p>
            )}
        </div>
    );
};

export default Loading;
