export interface PermissionTreeDto {
    id: number;
    key: string;
    nameBg: string;
    nameEn: string;
    parentId: number | null;
    order: number;

    elementTypeId: number;
    elementTypeNameBg: string;
    elementTypeNameEn: string;

    stateId: number;
    stateNameBg: string;
    stateNameEn: string;

    descriptionBg: string;
    descriptionEn: string;

    parentCount: number;

    children: PermissionTreeDto[];
}