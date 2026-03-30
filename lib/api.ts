const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

//header
export async function logout() {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        next: { revalidate: 60 },
        method: "POST",
        credentials: "include",
    });
    console.log(res, 'logog');
    return res.json();

}
export async function userVerify(accessToken: string | undefined) {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
        next: { revalidate: 60 },
        method: "GET",
        headers: {
            "Cookie": `access_token=${accessToken}`,
        },
        credentials: "include",
    });
    return res.json();
}