import { POST } from "./connection";

export async function chat(data) {
    try {
        const response = await POST('/chat', data);
        return response.data;
    } catch (error) {
        return { "code": 500, "error": "No se pudo conectar con el servidor." };
    }
}
