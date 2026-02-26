import AuthBackground from "./AuthBackground";

export default function AuthLayout({ children }){
    return(
        <div className="min-h-screen bg-[#fff5e6] flex items-center justify-center relative overflow-hidden font-sans">
            
            <AuthBackground />

            {children}
        </div>
    )
}