export const loginAdmin = async (username, password) => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error(data.message || "خطا در ورود");
    }

    return data;
};

export const logoutAdmin = async () => {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error(data.message || "خطا در خروج");
    }

    return data;
};
