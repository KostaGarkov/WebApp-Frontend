import { apiClient } from "./apiClient";

export interface Role {
  id: number;
  nameDisplay: string;
  translations: Array<{
    language: string;
    name: string;
  }>;
}

export const roleApi = {
  getAll: () => apiClient<Role[]>(`/role`),

  getById: (id: number) => apiClient<Role>(`/role/${id}`),

  create: (data: any) =>
    apiClient(`/role`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),

  update: (id: number, data: any) =>
    apiClient(`/role/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),

  delete: (id: number) =>
    apiClient(`/role/${id}`, {
      method: "DELETE",
    }),
};