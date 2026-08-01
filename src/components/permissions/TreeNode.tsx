import { useState } from "react";
import { PermissionTreeDto } from "../../types/PermissionTreeDto";
import { useLang } from "../../i18n/LanguageContext";

interface Props {
    node: PermissionTreeDto;
    level?: number;
    selectedId: number | null;
    rolePermissions: number[];
    onTogglePermission: (id: number) => void;
    defaultExpanded?: boolean;
    onSelect: (id: number) => void;
}

export function TreeNode({
        node,
        level = 0,
        selectedId,
        onSelect,
        rolePermissions,
        onTogglePermission
    }: Props) {
    const [expanded, setExpanded] = useState(true);
    const { lang } = useLang();
    const indent = { marginLeft: `${level * 20}px` };

    const toggleExpand = () => {
        if (node.children.length > 0) {
            setExpanded(!expanded);
        }
    };

    const isSelected = selectedId === node.id;

    return (
        <div>
            <div
                style={{
                    ...indent,
                    padding: "4px 6px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "#d0e7ff" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                }}
                onClick={() => onSelect(node.id)}
                onDoubleClick={toggleExpand}
            >
                <span>
                    {node.children.length > 0
                        ? expanded
                            ? "▼"
                            : "▶"
                        : "•"}
                </span>

                <input
                    type="checkbox"
                    checked={rolePermissions.includes(node.id)}
                    onChange={() => onTogglePermission(node.id)}
                />

                <span>
                    {node.children.length > 0 ? "📁" : "📄"}
                </span>

                <span>{lang === "bg" ? node.elementTypeNameBg + " " + node.nameBg : node.elementTypeNameEn +" " + node.nameEn}</span>
            </div>

            {expanded && node.children.length > 0 && (
                <div>
                    {node.children.map(child => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            rolePermissions={rolePermissions}
                            onTogglePermission={onTogglePermission}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}