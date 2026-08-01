import { APP_CONFIG } from "../config";

interface RoleTranslation {
    language: string;
    name: string;
}

interface RoleDto {
    id: number;
    roleCode: string;
    translations: RoleTranslation[];
}

export interface RoleListItem {
    id: number;
    nameBg: string;
    nameEn: string;
    roleCode: string;
}

export async function fetchRoles(): Promise<RoleListItem[]> {
    const response = await fetch(`${APP_CONFIG.apiBaseUrl}/role`);
    if (!response.ok) throw new Error("Failed to load roles");

    const json = await response.json();

    return json.data.map((r: RoleDto) => ({
        id: r.id,
        roleCode: r.roleCode,
        nameBg: r.translations.find((t: RoleTranslation) => t.language === "bg")?.name ?? "(без име)",
        nameEn: r.translations.find((t: RoleTranslation) => t.language === "en")?.name ?? "(no name)"
    }));
}