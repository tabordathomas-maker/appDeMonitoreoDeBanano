const API_URL = "http://127.0.0.1:8000";

export async function getDatos({
    limit = 100,
    desde = null,
    hasta = null,
    estado = null,
} = {}) {
    const params = new URLSearchParams();
    params.set("limit", String(Math.min(limit, 500)));

    if (desde) params.set("desde", desde);
    if (hasta) params.set("hasta", hasta);
    if (estado && estado !== "todos") params.set("estado", estado);

    const response = await fetch(`${API_URL}/api/datos?${params.toString()}`);

    if (!response.ok) {
        let detail = `Error HTTP: ${response.status}`;
        try {
            const body = await response.json();
            if (body?.detail) detail = body.detail;
        } catch {
            // Conservamos el mensaje HTTP si la respuesta no es JSON.
        }
        throw new Error(detail);
    }

    return await response.json();
}
