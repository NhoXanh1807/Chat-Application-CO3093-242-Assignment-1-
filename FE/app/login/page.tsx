"use client";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invisible, setInvisible] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Đăng nhập thất bại");

            // Thêm invisible vào user object
            localStorage.setItem('user', JSON.stringify({ ...data, invisible }));
            window.location.href = '/';
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định");
        }
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center bg-[#dddddd]">
            <div className="Loginform text-white border-box w-[20%] h-[35%]">
                <div className="Name text-3xl p-4 bg-[#6D34AF] rounded-t-[8px]">
                    Login
                </div>
                <div className="details bg-[#2B2D31] text-white p-4 text-xl flex flex-col gap-[5px] rounded-b-[8px]">
                    <div className="ip flex flex-col gap-[5px]">
                        Username:
                        <input 
                            type="text" 
                            className="bg-[#8E8787] rounded-[8px]" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="password flex flex-col gap-[5px]">
                        Password:
                        <input 
                            type="password" 
                            className="bg-[#8E8787] rounded-[8px]" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <label className="text-sm mt-2">
                        <input 
                            type="checkbox" 
                            checked={invisible}
                            onChange={() => setInvisible(!invisible)} 
                        /> Invisible Mode
                    </label>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button 
                        className="mt-4 bg-[#6D34AF] py-2 rounded-[8px]"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Login;
