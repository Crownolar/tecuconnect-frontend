import { apiClient } from "../../services/api/apiClient";

export async function testBackendLogin(identifier, password) {
  try {
    const response = await apiClient.post("/auth/login", {
      identifier,
      password,
    });

    console.log("AUTH LOGIN RESPONSE:", response);

    return response;
  } catch (error) {
    console.error("AUTH LOGIN ERROR:", {
      message: error.message,
      status: error.status,
      data: error.data,
    });

    throw error;
  }
}