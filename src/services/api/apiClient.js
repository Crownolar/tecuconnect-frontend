import { tokenStorage } from "../auth/tokenStorage";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return null;
};

const createApiError = (response, data) => {
  const error = new Error(
    data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`
  );

  error.status = response.status;
  error.data = data;

  return error;
};

const request = async (endpoint, options = {}) => {
  const token = tokenStorage.get();

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

  const data = await parseResponse(response);

  if (response.status === 401) {
    tokenStorage.clear();

    const error = createApiError(response, data);

    error.message =
      data?.message ||
      data?.error ||
      "Your session has expired. Please sign in again.";

    throw error;
  }

  if (!response.ok) {
    throw createApiError(response, data);
  }

  return data;
};

const upload = async (endpoint, formData, options = {}) => {
  const token = tokenStorage.get();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    method: "POST",
    headers,
    body: formData,
  });

  const data = await parseResponse(response);

  if (response.status === 401) {
    tokenStorage.clear();

    const error = createApiError(response, data);

    error.message =
      data?.message ||
      data?.error ||
      "Your session has expired. Please sign in again.";

    throw error;
  }

  if (!response.ok) {
    throw createApiError(response, data);
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

  upload,
};