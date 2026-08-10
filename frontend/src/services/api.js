const API_URL = "http://127.0.0.1:8000";

export async function getDatos(limit = 100) {
    const response = await fetch(`${API_URL}/api/datos?limit=${limit}`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
}