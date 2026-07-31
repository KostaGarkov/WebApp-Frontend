import { useEffect, useState } from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

interface PermissionTreeDto {
  id: number;
  key: string;
  nameBg: string;
  nameEn: string;
  parentId: number | null;
  order: number;
  children: PermissionTreeDto[];
}

export default function PermissionTree() {
  const [tree, setTree] = useState<PermissionTreeDto[]>([]);

  useEffect(() => {
    fetch("/api/permissions/tree")
      .then((res) => res.json())
      .then((data) => setTree(data));
  }, []);

  const flatten = (nodes: PermissionTreeDto[]): any[] => {
    const result: any[] = [];

    const walk = (node: PermissionTreeDto, parentId: string | null) => {
      result.push({
        id: node.id.toString(),
        label: node.nameBg,
        parentId: parentId,
      });

      node.children?.forEach((child) => walk(child, node.id.toString()));
    };

    nodes.forEach((n) => walk(n, null));
    return result;
  };

  return (
    <RichTreeView
      items={flatten(tree)}
      defaultExpandedItems={["3", "4", "8"]} // пример
    />
  );
}