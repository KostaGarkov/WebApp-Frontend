import { useEffect, useState } from "react";
import { fetchPermissionTree } from "../../api/permissions";
import { PermissionTreeDto } from "../../types/PermissionTreeDto";
import { TreeNode } from "./TreeNode";
import { useLang } from "../../i18n/LanguageContext";

interface Props {
    rolePermissions: number[];
    onTogglePermission: (id: number) => void;
}

export default function PermissionTree({ rolePermissions, onTogglePermission }: Props) {
    const [tree, setTree] = useState<PermissionTreeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLang();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const onSelect = (id: number) => setSelectedId(id);

    useEffect(() => {
        fetchPermissionTree()
            .then(data => {
                setTree(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(t("failedLoadPermissions"), err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>{t("loading")}...</div>;
    }

    return (
      <div style={{maxHeight: "70vh", overflowY: "auto", paddingRight: "10px"}}>
          {tree.map(root => (
              <TreeNode
                key={root.id}
                node={root}
                level={0}
                selectedId={selectedId}
                onSelect={onSelect}
                rolePermissions={rolePermissions}
                onTogglePermission={onTogglePermission}
                defaultExpanded={true}
            />
          ))}
      </div>
  );
}