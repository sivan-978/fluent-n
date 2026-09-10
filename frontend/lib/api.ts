import { getToken, getRefreshToken, saveToken, removeToken } from "./token";

const API_BASE_URL = "http://127.0.0.1:8000";

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    removeToken();
    throw new Error("Session expired");
  }

  const data = await response.json();

  saveToken(data.access_token);

  return data.access_token;
}


export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {

  const makeRequest = async (token: string | null) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  };

  // first request
  let token = getToken();

  let response = await makeRequest(token);

  // access token expired
  if (response.status === 401 && endpoint !== "/auth/refresh") {
    try {
      // if multiple requests expire at the same time
      // they all use the same refresh request
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      token = await refreshPromise;

      // retry original request with new access token
      response = await makeRequest(token);
    } catch (error) {
      removeToken();
      throw error;
    }
  }

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



export async function createCard(setId: number, term: string, definition: string) {
  return apiRequest(`/sets/${setId}/cards`, {
    method: "POST",
    body: JSON.stringify({ term, definition }),
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
export async function updateCard( cardId, term, definition) {
  return apiRequest(`/cards/${cardId}`, {
    method: "PUT",
    body: JSON.stringify({
      term: term,
      definition: definition,
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
