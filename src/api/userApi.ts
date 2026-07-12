import { apiClient } from "./apiClient";

export interface User {
  id: number;
  userName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  firstNameCyr: string;
  firstNameLat: string;
  isActive: boolean;
  lastNameCyr: string;
  lastNameLat: string;
  phone: string;
}

export const userApi = {
  async getAll(): Promise<User[]> {
    return apiClient<User[]>("/user");
  },

  async getById(id: number): Promise<User> {
    return apiClient<User>(`/User/${id}`);
  },

  async create(user: Partial<User>): Promise<User> {
    return apiClient<User>("/User", {
      method: "POST",
      body: JSON.stringify(user),
    });
  },

  async update(id: number, user: Partial<User>): Promise<User> {
    return apiClient<User>(`/User/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
  },

  async delete(id: number): Promise<void> {
    await apiClient<void>(`/User/${id}`, {
      method: "DELETE",
    });
  },
};