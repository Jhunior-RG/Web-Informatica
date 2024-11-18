// Session del usuario o perfil
"use client";
import type { Profile } from "@/types/Profile";
import { createContext, useContext } from "react";

interface Session{
    user: Profile | null;
}

export const SessionContext = createContext<Session>({user:null});

export const useSession = () => {
    const session = useContext(SessionContext);
    return session;
};
