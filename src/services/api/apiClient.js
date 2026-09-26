import { tokenStorage } from "../auth/tokenStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const getAuthToken = () => {
  return tokenStorage.get();
};

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    tokenStorage.clear();

    window.location.href = "/auth";

    throw new Error("Your session has expired. Please sign in again.");
  }

  let data = null;

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || `Request failed with status ${response.status}`,
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
};

export const apiClient = {
  get(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "GET",
    });
  },

  post(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options = {}) {
    return request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options = {}) {
    return request(endpoint, {
      ...options,
      method: "DELETE",
    });
  },

  upload(endpoint, formData, options = {}) {
    const token = tokenStorage.get();

    const headers = {
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: formData,
    }).then(async (response) => {
      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok) {
        const error = new Error(
          data?.message || `Request failed with status ${response.status}`,
        );

        error.status = response.status;
        error.data = data;

        throw error;
      }

      return data;
    });
  },
};
