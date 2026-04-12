import { getToken } from "./token";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}



export async function createSet(title: string, description: string) {
  return apiRequest("/sets", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  })
}



export async function createCard(setId: number, front_text: string, back_text: string) {
  return apiRequest(`/sets/${setId}/cards`, {
    method: "POST",
    body: JSON.stringify({ front_text, back_text }),
  })
}


export async function getMySets() {
  return apiRequest("/sets", {
    method: "GET",
  })
}



export async function getCards(setId: number) {
  return apiRequest(`/sets/${setId}/cards`, {
    method: "GET",
  })
}

export async function getLanguages() {
  return apiRequest("/languages");
}