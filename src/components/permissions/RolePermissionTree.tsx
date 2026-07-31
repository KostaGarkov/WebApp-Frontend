import { useEffect, useState } from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { Checkbox } from "@mui/material";
import { APP_CONFIG } from "../../config";

interface PermissionTreeDto {
  id: number;
  key: string;
  nameBg: string;
  nameEn: string;
  parentId: number | null;
  order: number;
  children: PermissionTreeDto[];
}

interface Props {
  roleId: number;
}

export default function RolePermissionTree({ roleId }: Props) {
  const [tree, setTree] = useState<PermissionTreeDto[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  // Load permission tree
  useEffect(() => {
    fetch(`${APP_CONFIG.apiBaseUrl}/permissions/tree`)
      .then((res) => res.json())
      .then((data) => setTree(data));
  }, []);

  // Load selected permissions
  useEffect(() => {
    fetch(`${APP_CONFIG.apiBaseUrl}/roles/${roleId}/permissions`)
      .then((res) => res.json())
      .then((data) => setSelected(data));
  }, [roleId]);

  // Flatten tree
  const flatten = (nodes: PermissionTreeDto[]): any[] => {
    const result: any[] = [];

    const walk = (node: PermissionTreeDto, parentId: string | null) => {
      result.push({
        id: node.id.toString(),
        label: node.nameBg, // string only!
        parentId,
      });

      node.children?.forEach((child) => walk(child, node.id.toString()));
    };

    nodes.forEach((n) => walk(n, null));
    return result;
  };

  const toggle = (id: number) => {
    const updated = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];

    setSelected(updated);

    fetch(`${APP_CONFIG.apiBaseUrl}/roles/${roleId}/permissions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roleId,
        permissionIds: updated,
      }),
    });
  };

  return (
    <RichTreeView
      items={flatten(tree)}
      slots={{
        item: (props) => {
          const { itemId, label } = props;

          return (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox
                size="small"
                checked={selected.includes(Number(itemId))}
                onChange={() => toggle(Number(itemId))}
              />
              {label}
            </div>
          );
        },
      }}
    />
  );
}
