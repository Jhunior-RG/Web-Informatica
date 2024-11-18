"use client";
import React, { useEffect, useState } from "react";
import { SessionContext } from "./useSession";
import { BACKEND_URL } from "@/constant/backend";
import { Profile } from "@/types/Profile";

const SessionProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = useState<Profile | null>(null);
    const fetchUser = async () => {
        const response = await fetch(BACKEND_URL + "/api/perfil", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const { data } = await response.json();
        setUser(data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <SessionContext.Provider value={{ user }}>
                {children}
            </SessionContext.Provider>
        </div>
    );
};

export default SessionProvider;
