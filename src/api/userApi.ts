import http from "./http";

export interface User {
    id: number;
    name: string;
    email: string;
}

export const userApi = {
    getAll: async () => {
        const res = await http.get<User[]>("/user");
        return res.data;
    },

    getById: async (id: number) => {
        const res = await http.get<User>(`/user/${id}`);
        return res.data;
    },

    create: async (user: Omit<User, "id">) => {
        const res = await http.post<User>("/user", user);
        return res.data;
    },

    update: async (id: number, user: User) => {
        const res = await http.put<User>(`/user/${id}`, user);
        return res.data;
    },

    delete: async (id: number) => {
        await http.delete(`/user/${id}`);
    }
};