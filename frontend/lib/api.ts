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



export async function createSet(title: string, description: string, sourceLanguage:string, targetLanguage: string, level?: string) {
  return apiRequest("/sets", {
    method: "POST",
    body: JSON.stringify({ title, description, source_language: sourceLanguage, target_language: targetLanguage, level: level || null,}),
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


//to get current logged in user info (username and email)
export async function currentUser(){
  return apiRequest("/users/me", {
    method: "GET"
  });
}


// get a single flashcard set with its cards
export async function getSet(id) {
  return apiRequest(`/sets/${id}`, {
    method: "GET",
  });
}

// update a flashcard set
export async function updateSet( id, title, description, sourceLanguage, targetLanguage, level) {
  return apiRequest(`/sets/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      source_language: sourceLanguage,
      target_language: targetLanguage,
      level: level || null,
    }),
  });
}


// update a flashcard
export async function updateCard( cardId, frontText, backText) {
  return apiRequest(`/cards/${cardId}`, {
    method: "PUT",
    body: JSON.stringify({
      front_text: frontText,
      back_text: backText,
    }),
  });
}


// delete a flashcard
export async function deleteCard(cardId) {
  return apiRequest(`/cards/${cardId}`, {
    method: "DELETE",
  });
}


//delete a flashcard set
export async function deleteSet(id: number) {
  return apiRequest(`/sets/${id}`, {
    method: "DELETE",
  });
}
