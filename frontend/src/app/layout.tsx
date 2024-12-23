import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./fonts/fonts";
import {silkscreen} from './fonts/fonts';
import SessionProvider from "@/hooks/sessionProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const metadata: Metadata = {
    title: "Informatica Web",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`h-full ${montserrat.className} ${silkscreen.variable} antialiased bg-gray-900`}
            >
             <SessionProvider>
             <GoogleOAuthProvider clientId="620020049330-mp3lctqo46f6q3vtr25ff9mtsvbigg2i.apps.googleusercontent.com">
                    {children}
                </GoogleOAuthProvider>
             </SessionProvider>
            </body>
        </html>
    );
}
