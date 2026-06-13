import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (document.cookie.includes("admin_session")) {
            router.push("/dashboard");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center mt-20 mx-2">

            <div className="w-full max-w-md bg-white p-4 lg:p-8 rounded-xl shadow-md">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Username
                        </label>

                        <input
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition cursor-pointer"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}