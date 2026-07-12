import { APP_CONFIG } from "../config";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${APP_CONFIG.apiBaseUrl}${endpoint}`, {
    ...options,
    headers, // тук подаваме нашия обект headers
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API error: ${response.status} – ${message}`);
  }

  return response.json();
}
