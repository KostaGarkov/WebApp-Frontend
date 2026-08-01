import { PermissionTreeDto } from "../types/PermissionTreeDto";
import { APP_CONFIG } from "../config";

export async function fetchPermissionTree(): Promise<PermissionTreeDto[]> {
    const response = await fetch(`${APP_CONFIG.apiBaseUrl}/permissions/tree`);

    if (!response.ok) {
        throw new Error("Failed to load permission tree");
    }

    return await response.json();
}

export async function fetchRolePermissions(roleId: number): Promise<number[]> {
    const response = await fetch(`${APP_CONFIG.apiBaseUrl}/roles/${roleId}/permissions`);

    if (!response.ok) {
        throw new Error("Failed to load role permissions");
    }

    const json = await response.json();
    return json; // backend already returns a list of numbers
}