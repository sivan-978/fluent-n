"use client";

import { createContext, useContext, useState} from "react";

const SidebarCtx = createContext(null);


export function SidebarProvider({ children,  defaultOpen= true }) {
    const [open, setOpen] = useState(defaultOpen);
    const toggle = () => setOpen(o => !o);

    return <SidebarCtx.Provider value={{open, toggle}}>{children}</SidebarCtx.Provider>;
}

export function useSidebar() {
    const ctx = useContext(SidebarCtx);
    if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
    return ctx;
}
