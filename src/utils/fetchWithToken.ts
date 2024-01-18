import { cookies } from "next/headers";

export default async function fetchWithToken(
    input: RequestInfo,
    init?: RequestInit | undefined,
) {
    const cookieJar = cookies();
    const accessTokenCookie = cookieJar.get("accessToken");
    const accessToken = accessTokenCookie ? accessTokenCookie.value : "";
    const authorizationHeader = `Bearer ${accessToken}`;
    const existingHeaders = init?.headers || {};
    const mergedHeaders = {
        ...existingHeaders,
        Authorization: authorizationHeader,
    };
    const updatedInit: RequestInit = {
        ...init,
        headers: mergedHeaders,
    };
    const response = await fetch(input, updatedInit);
    return response;
}