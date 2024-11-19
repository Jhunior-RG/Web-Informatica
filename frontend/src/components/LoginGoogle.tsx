import { BACKEND_URL } from "@/constant/backend";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginGoogle = () => {
        
    const router = useRouter();

    const onSuccess = async (codeResponse: TokenResponse) => {
        try {
            const response = await fetch(BACKEND_URL + "/api/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: codeResponse.access_token }),
            });
            const data = await response.json();
            if (response.ok){
                localStorage.setItem("token",data.token)
                router.push("/");
               // console.log("Login exitoso:", data);
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
        }
    };
    const login = useGoogleLogin({
        onSuccess,
        flow: "implicit",
    });

    return (
        <>
            <button
                onClick={() => {
                    login();
                }}
                className="w-full group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400  active:bg-blue-100"
            >
                <div className="relative flex items-center space-x-4 justify-center">
                    <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        width={20}
                        height={20}
                        className="absolute left-0 w-5"
                        alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Continue with Google
                    </span>
                </div>
            </button>
        </>
    );
};

export default LoginGoogle;
